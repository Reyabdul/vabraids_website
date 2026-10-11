'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaLink } from '@/components/ui/CtaLink';
import { InquiryCategoryModal } from './InquiryCategoryModal';
import { ServiceSelectModal } from './ServiceSelectModal';
import { TimeSlotSelectModal } from './TimeSlotSelectModal';
import { formatSlot } from '@/lib/timeSlots';

const fieldClasses =
  'bg-transparent border-0 border-b border-paper/30 text-paper text-[15px] px-0.5 py-3 placeholder:text-paper/50 focus:border-paper';

// The category choice collapses into one of these — same underline as a
// live field, just muted, so it reads as part of the stack of lines rather
// than plain floating text.
const answeredFieldClasses =
  'block w-full text-left text-[13px] text-paper/50 hover:text-paper/80 transition-colors bg-transparent border-0 border-b border-paper/15 py-2.5 px-0.5';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Used until the Contact Section document in Studio has its own copy for
// the two "required" errors.
const SERVICE_REQUIRED_FALLBACK = "Please choose at least one service — you can't continue until one is selected.";
const CATEGORY_REQUIRED_FALLBACK = "Please choose at least one option — you can't continue until one is selected.";

const SERVICE_ERROR_ID = 'inquiry-service-error';

function joinWithInterpunct(items) {
  return items.filter(Boolean).join(' · ');
}

function emptySlot() {
  return { id: crypto.randomUUID(), date: null, time: null };
}

// Which reason(s) were picked in the category modal decide which
// questions get asked, in order. The line a reason is *about* comes first,
// so it's on screen the moment the picker closes: the service line for
// "Service Inquiry", the date/time line for "Booking". "Other" could be
// about anything, so it gets every line. Email+phone are revealed together
// (phone stays optional even so). A testimonial is a fundamentally
// different kind of message — no phone/service/time — so it
// short-circuits everything else even if picked alongside other reasons.
function buildSteps(categories) {
  if (categories.includes('testimonial')) return [['name'], ['email'], ['message']];
  const everything = categories.includes('other');
  const steps = [];
  if (everything || categories.includes('service')) steps.push(['service']);
  if (everything || categories.includes('booking')) steps.push(['time']);
  steps.push(['name'], ['email', 'phone'], ['message']);
  return steps;
}

/**
 * Progressive inquiry form — secondary to the Re-Up booking CTA. A small
 * "Inquiry" heading and the start prompt (e.g. "Hey! What can I help you
 * with?") stay on screen once the flow begins; picking reason(s) in the
 * category modal it opens decides which fields get asked (see buildSteps).
 * At least one reason is required, so every inquiry arrives with a subject.
 * The line the reason is about leads — the service line for "Service
 * Inquiry", the date/time line for "Booking" — and the rest then appear
 * one by one: each new line fades in as soon as the one above it is filled
 * in, and every line stays on screen and editable. "Other" skips the
 * one-by-one reveal and shows every line at once. Name, email and message
 * are required, and so is the service line for a "Service Inquiry" —
 * nothing below it appears until at least one service is picked, and
 * closing the picker empty-handed shows an error saying so. Phone and
 * time slots stay optional, as does the service line under "Other". "Start over" clears
 * everything while filling things in; once every required field is valid
 * it's replaced by Send/Cancel. Submission isn't wired to a backend yet
 * (open item in CLAUDE.md) — this only reproduces the front-end "sent"
 * state swap.
 */
export function InquiryForm({ content, services = [], servicesContent }) {
  const [sent, setSent] = useState(false);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [started, setStarted] = useState(false);
  // How many steps have been uncovered so far. Only ever grows while
  // filling the form in, so clearing an earlier field doesn't yank the
  // lines below it back off the screen.
  const [revealedCount, setRevealedCount] = useState(1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]); // [{ id, name }]
  // The "pick a service" error only shows once the visitor has had a go at
  // the service line (opened the picker and closed it, or tried to send).
  const [serviceTouched, setServiceTouched] = useState(false);

  const [editingTimeSlotId, setEditingTimeSlotId] = useState(null);
  const [timeSlots, setTimeSlots] = useState(() => [emptySlot()]);

  const firstFieldRef = useRef(null);
  const steps = buildSteps(categories);

  // Only jump the cursor into the name field when it's the first line —
  // if a service/date line leads the flow, focusing past it would make it
  // easy to miss.
  const startsWithName = steps[0][0] === 'name';
  useEffect(() => {
    if (started && startsWithName) firstFieldRef.current?.focus();
  }, [started, startsWithName]);

  function toggleCategory(id) {
    setCategories((current) => (current.includes(id) ? current.filter((c) => c !== id) : [...current, id]));
  }

  // The picked reasons can change which steps exist, so the reveal count
  // restarts — already-filled fields uncover themselves again right away.
  function confirmCategories() {
    setCategoryModalOpen(false);
    setStarted(true);
    setRevealedCount(1);
    setServiceTouched(false);
  }

  // ×/backdrop/Escape. A reason is required — it's the subject of the
  // message — so backing out with none picked returns to the start prompt
  // rather than opening a subject-less form. Anything typed so far is kept.
  function dismissCategoryModal() {
    if (categories.length > 0) {
      confirmCategories();
      return;
    }
    setCategoryModalOpen(false);
    setStarted(false);
  }

  // Clears every field and returns to the single start-prompt line.
  function handleReset() {
    setStarted(false);
    setRevealedCount(1);
    setCategories([]);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSelectedServices([]);
    setServiceTouched(false);
    setTimeSlots([emptySlot()]);
  }

  function toggleService(id, name) {
    setSelectedServices((current) =>
      current.some((s) => s.id === id) ? current.filter((s) => s.id !== id) : [...current, { id, name }]
    );
  }

  function closeServiceModal() {
    setServiceModalOpen(false);
    setServiceTouched(true);
  }

  function selectSlotDate(id, date) {
    setTimeSlots((current) => current.map((s) => (s.id === id ? { ...s, date } : s)));
  }

  function selectSlotTime(id, time) {
    setTimeSlots((current) => current.map((s) => (s.id === id ? { ...s, time } : s)));
  }

  function removeTimeSlot(id) {
    setTimeSlots((current) => {
      const next = current.filter((s) => s.id !== id);
      return next.length > 0 ? next : [emptySlot()];
    });
    setEditingTimeSlotId(null);
  }

  function clearTimeSlots() {
    setTimeSlots([emptySlot()]);
    setEditingTimeSlotId(null);
  }

  function addTimeSlotAndOpen() {
    if (timeSlots.length >= 3) return;
    const next = emptySlot();
    setTimeSlots((current) => [...current, next]);
    setEditingTimeSlotId(next.id);
  }

  const selectedServiceNames = selectedServices.map((s) => s.name).join(', ');
  const selectedTimeSlotSummary = timeSlots
    .filter((s) => s.date && s.time)
    .map((s) => formatSlot(s.date, s.time))
    .join('; ');
  const lastTimeSlot = timeSlots[timeSlots.length - 1];
  const canAddTimeSlot = timeSlots.length < 3 && lastTimeSlot?.date && lastTimeSlot?.time;
  const editingTimeSlot = timeSlots.find((s) => s.id === editingTimeSlotId) || null;
  const categoryNames = joinWithInterpunct(
    categories.map((id) => content?.[`category${id.charAt(0).toUpperCase()}${id.slice(1)}Label`])
  );

  function isFieldValid(field) {
    switch (field) {
      case 'name':
        return Boolean(name.trim());
      case 'email':
        return EMAIL_RE.test(email.trim());
      case 'service':
        return !requiresService || selectedServices.length > 0;
      case 'message':
        return Boolean(message.trim());
      default:
        return true; // phone/time are optional
    }
  }

  const isTestimonial = categories.includes('testimonial');
  // Picking a service is only mandatory for a "Service Inquiry" — under
  // "Other" the service line is offered but can be left empty.
  const requiresService = !isTestimonial && categories.includes('service');
  // "Other" lays every line out at once instead of one by one.
  const showAllSteps = !isTestimonial && categories.includes('other');

  function isStepValid(step) {
    return step.every(isFieldValid);
  }

  const formComplete = steps.every(isStepValid);
  const showServiceError = requiresService && serviceTouched && selectedServices.length === 0;
  const serviceErrorMessage = content?.serviceRequiredError || SERVICE_REQUIRED_FALLBACK;

  // Steps are uncovered up to (and including) the first one that still
  // needs an answer. Optional steps count as answered, so e.g. the time
  // slot line brings the message line in with it.
  const firstUnansweredIndex = steps.findIndex((step) => !isStepValid(step));
  const reachableCount = firstUnansweredIndex === -1 ? steps.length : firstUnansweredIndex + 1;
  if (reachableCount > revealedCount) setRevealedCount(reachableCount);
  const visibleSteps = showAllSteps ? steps : steps.slice(0, Math.max(revealedCount, reachableCount));

  function handleSubmit(e) {
    e?.preventDefault();
    if (!formComplete) {
      setServiceTouched(true);
      return;
    }
    setSent(true);
  }

  // Enter in a single-line field moves on to the next line (if it's been
  // uncovered yet) instead of submitting the half-filled form.
  function focusNextFieldOnEnter(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const fields = Array.from(e.currentTarget.form.querySelectorAll('[data-inquiry-field]'));
    fields[fields.indexOf(e.currentTarget) + 1]?.focus();
  }

  function renderField(field) {
    switch (field) {
      case 'name':
        return (
          <input
            ref={firstFieldRef}
            data-inquiry-field
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={focusNextFieldOnEnter}
            placeholder={content?.nameFieldPlaceholder}
            className={`${fieldClasses} w-full`}
          />
        );
      case 'email':
        return (
          <input
            data-inquiry-field
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={focusNextFieldOnEnter}
            placeholder={content?.emailFieldPlaceholder}
            className={`${fieldClasses} w-full`}
          />
        );
      case 'phone':
        return (
          <input
            data-inquiry-field
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={focusNextFieldOnEnter}
            placeholder={content?.phoneFieldPlaceholder ? `${content.phoneFieldPlaceholder} (optional)` : ''}
            className={`${fieldClasses} w-full`}
          />
        );
      case 'service':
        return (
          <div>
            <button
              type="button"
              data-inquiry-field
              onClick={() => setServiceModalOpen(true)}
              aria-invalid={showServiceError}
              aria-describedby={showServiceError ? SERVICE_ERROR_ID : undefined}
              className={`${fieldClasses} w-full text-left cursor-pointer ${
                selectedServiceNames ? 'text-paper' : 'text-paper/50'
              } ${showServiceError ? 'border-[#e0a39a]!' : ''}`}
            >
              {selectedServiceNames || content?.serviceFieldPlaceholder}
            </button>
            {showServiceError && (
              <p id={SERVICE_ERROR_ID} role="alert" className="mt-2.5 mb-0 px-0.5 text-[13px] leading-[1.5] text-[#e0a39a]">
                {serviceErrorMessage}
              </p>
            )}
          </div>
        );
      case 'time':
        return (
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-paper/30">
            {timeSlots.map((slot) => {
              const label = slot.date && slot.time ? formatSlot(slot.date, slot.time) : content?.timeSlotFieldPlaceholder;
              const filled = Boolean(slot.date && slot.time);
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setEditingTimeSlotId(slot.id)}
                  className={`text-[13px] px-3 py-1.5 border cursor-pointer transition-colors ${
                    filled
                      ? 'border-paper/40 text-paper hover:border-paper/70'
                      : 'border-paper/25 text-paper/50 hover:border-paper/50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            {canAddTimeSlot && (
              <button
                type="button"
                onClick={addTimeSlotAndOpen}
                aria-label={content?.timeSlotAddLabel}
                className="shrink-0 w-[22px] h-[22px] flex items-center justify-center rounded border border-paper bg-paper text-ink text-sm leading-none cursor-pointer hover:opacity-80 transition-opacity"
              >
                +
              </button>
            )}
          </div>
        );
      case 'message':
        return (
          <textarea
            data-inquiry-field
            required
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={content?.messageFieldPlaceholder}
            className={`${fieldClasses} resize-none w-full`}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border border-paper/25 px-10 py-12 text-center"
          >
            <div className="font-display text-[34px] font-light mb-3.5">{content?.successHeadline}</div>
            <div className="text-sm text-paper/70 leading-[1.7]">{content?.successMessage}</div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Eyebrow tone="inverted" className="mb-4">
              {content?.formHeading}
            </Eyebrow>

            {!started ? (
              <button
                type="button"
                onClick={() => setCategoryModalOpen(true)}
                // Hover: the underline brightens and the prompt nudges right,
                // so the line reads as something to click, not a caption.
                className={`${fieldClasses} w-full text-left text-paper cursor-pointer transition-[border-color,padding] duration-300 hover:border-paper hover:pl-2.5`}
              >
                {content?.startPrompt}
              </button>
            ) : (
              <>
                <div className={`${fieldClasses} text-paper`}>{content?.startPrompt}</div>

                <div className="flex flex-col gap-5 mt-5">
                  <button type="button" onClick={() => setCategoryModalOpen(true)} className={answeredFieldClasses}>
                    {categoryNames}
                  </button>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    {visibleSteps.map((step) => (
                      // Each step mounts when it's uncovered, so this fade
                      // plays once as the line appears.
                      <motion.div
                        key={step.join('-')}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="flex flex-col gap-5"
                      >
                        {step.map((field) => (
                          <div key={field}>{renderField(field)}</div>
                        ))}
                      </motion.div>
                    ))}

                    <input type="hidden" name="categories" value={categoryNames} />
                    <input type="hidden" name="service" value={selectedServiceNames} />
                    <input type="hidden" name="preferredTimes" value={selectedTimeSlotSummary} />

                    <div className="flex items-center gap-6">
                      {formComplete ? (
                        <>
                          <CtaLink type="submit" variant="outline" tone="dark">
                            {content?.submitButtonLabel}
                          </CtaLink>
                          <CtaLink type="button" variant="text" tone="dark" onClick={handleReset}>
                            {content?.cancelLabel}
                          </CtaLink>
                        </>
                      ) : (
                        <CtaLink type="button" variant="text" tone="dark" onClick={handleReset}>
                          {content?.resetLabel}
                        </CtaLink>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {categoryModalOpen && (
          <InquiryCategoryModal
            key="category-modal"
            heading={content?.startPrompt}
            doneLabel={content?.categoryModalDoneLabel}
            clearLabel={content?.categoryModalClearLabel}
            content={content}
            selectedIds={categories}
            onToggle={toggleCategory}
            requiredError={content?.categoryRequiredError || CATEGORY_REQUIRED_FALLBACK}
            onClear={() => setCategories([])}
            onConfirm={confirmCategories}
            onClose={dismissCategoryModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {serviceModalOpen && (
          <ServiceSelectModal
            key="service-modal"
            heading={content?.serviceFieldPlaceholder}
            doneLabel={content?.serviceModalDoneLabel}
            clearLabel={content?.serviceModalClearLabel}
            services={services}
            servicesContent={servicesContent}
            selectedIds={selectedServices.map((s) => s.id)}
            onToggle={toggleService}
            onClear={() => setSelectedServices([])}
            onClose={closeServiceModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingTimeSlot && (
          <TimeSlotSelectModal
            key="time-slot-modal"
            heading={content?.timeSlotFieldPlaceholder}
            doneLabel={content?.timeSlotModalDoneLabel}
            clearLabel={content?.timeSlotModalClearLabel}
            slot={editingTimeSlot}
            slotNumber={timeSlots.findIndex((s) => s.id === editingTimeSlotId) + 1}
            canRemove={timeSlots.length > 1 || Boolean(editingTimeSlot.date || editingTimeSlot.time)}
            hasAnySelection={timeSlots.some((s) => s.date || s.time)}
            startHour={content?.timeSlotStartHour}
            endHour={content?.timeSlotEndHour}
            onSelectDate={(date) => selectSlotDate(editingTimeSlot.id, date)}
            onSelectTime={(time) => selectSlotTime(editingTimeSlot.id, time)}
            onRemove={() => removeTimeSlot(editingTimeSlot.id)}
            onClear={clearTimeSlots}
            onClose={() => setEditingTimeSlotId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

InquiryForm.propTypes = {
  content: PropTypes.shape({
    formHeading: PropTypes.string,
    startPrompt: PropTypes.string,
    resetLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    categoryModalDoneLabel: PropTypes.string,
    categoryModalClearLabel: PropTypes.string,
    categoryRequiredError: PropTypes.string,
    categoryBookingLabel: PropTypes.string,
    categoryServiceLabel: PropTypes.string,
    categoryTestimonialLabel: PropTypes.string,
    categoryOtherLabel: PropTypes.string,
    nameFieldPlaceholder: PropTypes.string,
    emailFieldPlaceholder: PropTypes.string,
    phoneFieldPlaceholder: PropTypes.string,
    serviceFieldPlaceholder: PropTypes.string,
    serviceRequiredError: PropTypes.string,
    serviceModalDoneLabel: PropTypes.string,
    serviceModalClearLabel: PropTypes.string,
    timeSlotFieldPlaceholder: PropTypes.string,
    timeSlotAddLabel: PropTypes.string,
    timeSlotModalDoneLabel: PropTypes.string,
    timeSlotModalClearLabel: PropTypes.string,
    timeSlotStartHour: PropTypes.number,
    timeSlotEndHour: PropTypes.number,
    messageFieldPlaceholder: PropTypes.string,
    submitButtonLabel: PropTypes.string,
    successHeadline: PropTypes.string,
    successMessage: PropTypes.string,
  }),
  services: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string, menuSection: PropTypes.string })
  ),
  servicesContent: PropTypes.shape({ menuSectionLabels: PropTypes.object }),
};
