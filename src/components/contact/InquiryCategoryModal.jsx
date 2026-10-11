'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';

// Fixed set of reasons someone might be reaching out. Selecting one or more
// determines which questions the conversational flow asks afterward (see
// buildSteps in InquiryForm) — e.g. picking "Leave a testimonial" trims the
// flow down to just name/email/message.
const CATEGORY_KEYS = [
  { id: 'booking', labelKey: 'categoryBookingLabel' },
  { id: 'service', labelKey: 'categoryServiceLabel' },
  { id: 'testimonial', labelKey: 'categoryTestimonialLabel' },
  { id: 'other', labelKey: 'categoryOtherLabel' },
];

const ERROR_ID = 'inquiry-category-error';

/**
 * Centered modal for picking one or more reasons for the inquiry. Same
 * toggle-chip chrome as the service/time-slot modals — clicking a chip
 * flips it in/out of `selectedIds` immediately. At least one reason is
 * required (it's effectively the subject line of the message): Done with
 * nothing picked shows `requiredError` and keeps the modal open. The
 * ×/backdrop/Escape still dismiss it via `onClose` — the parent decides
 * what an empty-handed dismissal means.
 */
export function InquiryCategoryModal({
  heading,
  doneLabel,
  clearLabel,
  requiredError,
  content,
  selectedIds,
  onToggle,
  onClear,
  onConfirm,
  onClose,
}) {
  const [triedEmpty, setTriedEmpty] = useState(false);
  const showError = triedEmpty && selectedIds.length === 0;

  function handleDone() {
    if (selectedIds.length === 0) {
      setTriedEmpty(true);
      return;
    }
    onConfirm();
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-ink/80 flex items-center justify-center px-6 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        aria-describedby={showError ? ERROR_ID : undefined}
        onClick={(e) => e.stopPropagation()}
        className="bg-ink border border-paper/20 max-w-[420px] w-full max-h-[80vh] overflow-y-auto p-8 md:p-10"
      >
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="font-display font-light text-2xl text-paper">{heading}</div>
          <button
            type="button"
            onClick={onClose}
            aria-label={doneLabel}
            className="text-paper/60 hover:text-paper text-2xl leading-none cursor-pointer bg-transparent border-0 p-0"
          >
            ×
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {CATEGORY_KEYS.map(({ id, labelKey }) => {
            const active = selectedIds.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle(id)}
                className={`text-[13px] px-4 py-2 border cursor-pointer transition-colors ${
                  active
                    ? 'bg-paper text-ink border-paper'
                    : 'bg-transparent text-paper border-paper/28 hover:border-paper/60'
                }`}
              >
                {content?.[labelKey]}
              </button>
            );
          })}
        </div>

        {showError && (
          <p id={ERROR_ID} role="alert" className="mt-5 mb-0 text-[13px] leading-[1.5] text-[#e0a39a]">
            {requiredError}
          </p>
        )}

        <div className="flex items-center gap-6 mt-8">
          <CtaLink type="button" variant="outline" tone="dark" onClick={handleDone}>
            {doneLabel}
          </CtaLink>
          {selectedIds.length > 0 && (
            <CtaLink type="button" variant="text" tone="dark" onClick={onClear}>
              {clearLabel}
            </CtaLink>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

InquiryCategoryModal.propTypes = {
  heading: PropTypes.string,
  doneLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  requiredError: PropTypes.string,
  content: PropTypes.shape({
    categoryBookingLabel: PropTypes.string,
    categoryServiceLabel: PropTypes.string,
    categoryTestimonialLabel: PropTypes.string,
    categoryOtherLabel: PropTypes.string,
  }),
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
