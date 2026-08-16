'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';

const fieldClasses =
  'bg-transparent border-0 border-b border-paper/30 text-paper text-[15px] px-0.5 py-3 placeholder:text-paper/50 focus:border-paper';

/**
 * After-hours inquiry form — secondary to the Re-Up booking CTA.
 * Submission isn't wired to a backend yet (open item in CLAUDE.md); this
 * only reproduces the front-end "sent" state swap from the design.
 */
export function InquiryForm({ content }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
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
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input required placeholder={content?.nameFieldPlaceholder} className={fieldClasses} />
          <input
            required
            type="email"
            placeholder={content?.emailFieldPlaceholder}
            className={fieldClasses}
          />
          <input placeholder={content?.phoneFieldPlaceholder} className={fieldClasses} />
          <input placeholder={content?.serviceFieldPlaceholder} className={fieldClasses} />
          <textarea
            rows={3}
            placeholder={content?.messageFieldPlaceholder}
            className={`${fieldClasses} resize-none`}
          />
          <CtaLink type="submit" variant="outline" tone="dark" className="mt-3 self-start">
            {content?.submitButtonLabel}
          </CtaLink>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

InquiryForm.propTypes = {
  content: PropTypes.shape({
    nameFieldPlaceholder: PropTypes.string,
    emailFieldPlaceholder: PropTypes.string,
    phoneFieldPlaceholder: PropTypes.string,
    serviceFieldPlaceholder: PropTypes.string,
    messageFieldPlaceholder: PropTypes.string,
    submitButtonLabel: PropTypes.string,
    successHeadline: PropTypes.string,
    successMessage: PropTypes.string,
  }),
};
