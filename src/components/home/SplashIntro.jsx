'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Full-screen intro overlay shown on load — click or scroll to enter.
 * Mounted/unmounted by the parent inside an <AnimatePresence>.
 */
export function SplashIntro({ businessName, tagline, scrollPromptLabel, onEnter }) {
  return (
    <motion.div
      onClick={onEnter}
      onWheel={onEnter}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
      className="absolute inset-0 z-[60] bg-paper flex flex-col items-center justify-center cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="mb-9"
      >
        <Eyebrow tone="muted" className="tracking-[.42em]">
          {tagline}
        </Eyebrow>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-light text-[clamp(60px,11vw,168px)] leading-[.9] tracking-[.01em] text-center"
      >
        {businessName}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.5 }}
        className="w-[52px] h-px bg-ink my-9"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.7 }}
      >
        <Eyebrow tone="muted" className="tracking-[.34em]">
          {scrollPromptLabel}
        </Eyebrow>
      </motion.div>
    </motion.div>
  );
}

SplashIntro.propTypes = {
  businessName: PropTypes.string,
  tagline: PropTypes.string,
  scrollPromptLabel: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
