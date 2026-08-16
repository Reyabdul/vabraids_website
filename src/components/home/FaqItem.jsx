'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';

/**
 * Single accordion row — click the question to expand/collapse the answer.
 */
export function FaqItem({ question, answer, open, onToggle }) {
  return (
    <div className="border-b border-ink/16">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-5 py-6 px-1 cursor-pointer bg-transparent border-0 text-left"
      >
        <span className="text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl leading-none text-muted"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.4 } }}
        className="overflow-hidden"
      >
        <p className="text-base leading-[1.8] text-body font-light m-0 px-1 pb-7 max-w-[64ch]">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};
