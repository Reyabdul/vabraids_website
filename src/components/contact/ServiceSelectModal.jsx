'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';
import { BOOKABLE_MENU_SECTION_ORDER } from '@/lib/menuSections';

/**
 * Centered modal for picking one or more services on the inquiry form.
 * Each service is a toggle chip — clicking it flips the id in/out of
 * `selectedIds` (owned by the parent form) and highlights immediately,
 * so there's no separate "apply" step; Done/backdrop/Escape all just
 * close the modal.
 */
export function ServiceSelectModal({
  heading,
  doneLabel,
  clearLabel,
  services,
  servicesContent,
  selectedIds,
  onToggle,
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

  const groups = BOOKABLE_MENU_SECTION_ORDER.map(({ value, labelKey }) => ({
    value,
    label: servicesContent?.menuSectionLabels?.[labelKey],
    services: services.filter((s) => s.menuSection === value),
  })).filter((g) => g.services.length > 0);

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
        className="bg-ink border border-paper/20 max-w-[560px] w-full max-h-[80vh] overflow-y-auto p-8 md:p-10"
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

        {groups.map((group) => (
          <div key={group.value} className="mb-7 last:mb-0">
            <div className="text-[11px] tracking-[.2em] uppercase text-paper/50 mb-3">{group.label}</div>
            <div className="flex flex-wrap gap-2.5">
              {group.services.map((service) => {
                const active = selectedIds.includes(service._id);
                return (
                  <button
                    key={service._id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(service._id, service.name.trim())}
                    className={`text-[13px] px-4 py-2 border cursor-pointer transition-colors ${
                      active
                        ? 'bg-paper text-ink border-paper'
                        : 'bg-transparent text-paper border-paper/28 hover:border-paper/60'
                    }`}
                  >
                    {service.name.trim()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-6 mt-3">
          <CtaLink type="button" variant="outline" tone="dark" onClick={onClose}>
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

ServiceSelectModal.propTypes = {
  heading: PropTypes.string,
  doneLabel: PropTypes.string,
  clearLabel: PropTypes.string,
  services: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string, menuSection: PropTypes.string })
  ),
  servicesContent: PropTypes.shape({ menuSectionLabels: PropTypes.object }),
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
