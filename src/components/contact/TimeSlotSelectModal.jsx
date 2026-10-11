'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';
import { Calendar } from '@/components/ui/Calendar';
import { generateTimeOptions, formatSlot } from '@/lib/timeSlots';

/**
 * Centered modal for editing a single day+time preference on the inquiry
 * form. Each of the up to 3 time-slot chips on the main form opens this
 * scoped to just that one slot (via `slot`/`slotNumber`) — so picking
 * "Option 1" never also shows Option 2/3, and the remove control here
 * only ever deletes the one slot the modal was opened for.
 */
export function TimeSlotSelectModal({
  heading,
  doneLabel,
  clearLabel,
  slot,
  slotNumber,
  canRemove,
  hasAnySelection,
  startHour,
  endHour,
  onSelectDate,
  onSelectTime,
  onRemove,
  onClear,
  onClose,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const timeOptions = generateTimeOptions(startHour, endHour);

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
        onClick={(e) => e.stopPropagation()}
        className="bg-ink border border-paper/20 max-w-[420px] w-full max-h-[80vh] overflow-y-auto p-8 md:p-10"
      >
        <div className="flex items-start justify-between gap-6 mb-7">
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

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] tracking-[.2em] uppercase text-paper/50">Option {slotNumber}</div>
            {canRemove && (
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove option ${slotNumber}`}
                className="text-paper/50 hover:text-paper text-base leading-none cursor-pointer bg-transparent border-0 p-0"
              >
                ×
              </button>
            )}
          </div>

          <Calendar selected={slot.date} onSelect={onSelectDate} />

          {slot.date && (
            <div className="flex flex-wrap gap-2 mt-4">
              {timeOptions.map((opt) => {
                const active = slot.time === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectTime(opt.value)}
                    className={`text-[12px] px-3 py-1.5 border cursor-pointer transition-colors ${
                      active
                        ? 'bg-paper text-ink border-paper'
                        : 'bg-transparent text-paper border-paper/28 hover:border-paper/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {slot.date && slot.time && (
            <div className="text-[13px] text-paper/60 mt-3">{formatSlot(slot.date, slot.time)}</div>
          )}
        </div>

        <div className="flex items-center gap-6 mt-8">
          <CtaLink type="button" variant="outline" tone="dark" onClick={onClose}>
            {doneLabel}
          </CtaLink>
          {hasAnySelection && (
            <CtaLink type="button" variant="text" tone="dark" onClick={onClear}>
              {clearLabel}
            </CtaLink>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

TimeSlotSelectModal.propTypes = {
  heading: PropTypes.string,
  doneLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  slot: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    time: PropTypes.string,
  }).isRequired,
  slotNumber: PropTypes.number.isRequired,
  canRemove: PropTypes.bool,
  hasAnySelection: PropTypes.bool,
  startHour: PropTypes.number,
  endHour: PropTypes.number,
  onSelectDate: PropTypes.func.isRequired,
  onSelectTime: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
