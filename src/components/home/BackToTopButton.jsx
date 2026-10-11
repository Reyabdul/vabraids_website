'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';

// Same outline treatment as the header's booking CTA (CtaLink "outline"),
// so the two fixed controls read as a pair.
const TONE_CLASSES = {
  light: 'border-ink text-ink',
  dark: 'border-paper/40 text-paper',
};

/**
 * Fixed circular "back to top" control in the bottom-right corner.
 * Mounted/unmounted by the parent inside an <AnimatePresence>. `tone`
 * reflects the section directly behind the button (set by the parent as
 * the visitor scrolls); `raised` lifts it clear of the fixed footer while
 * that is showing.
 */
export function BackToTopButton({ tone = 'light', raised = false, onClick, label = 'Back to top' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      initial={{ opacity: 0, y: 12 }}
      // -44px = the footer's height (h-11)
      animate={{ opacity: 1, y: raised ? -44 : 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute right-6 md:right-10 bottom-6 md:bottom-8 z-40 flex size-11 items-center justify-center rounded-full border bg-transparent backdrop-blur-sm cursor-pointer p-0 group ${TONE_CLASSES[tone]}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        // Hover dims the arrow rather than the button: the button's own
        // opacity is driven by its enter/exit animation.
        className="size-4 transition-opacity duration-300 group-hover:opacity-55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </motion.button>
  );
}

BackToTopButton.propTypes = {
  tone: PropTypes.oneOf(['light', 'dark']),
  raised: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};
