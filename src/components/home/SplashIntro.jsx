'use client';

import { motion, useIsPresent, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Full-screen intro overlay shown on load — click, scroll or swipe to
 * enter. Mounted/unmounted by the parent inside an <AnimatePresence>.
 *
 * It leaves as a curtain rather than a fade: the paper-coloured surface
 * is split along the hero's text/video line (--hero-video-w, see
 * globals.css). The part over the video retracts to that line, uncovering
 * the video, while the part over the text column — sitting on an
 * identically coloured hero panel — just fades, so the splash appears to
 * narrow into the hero's text half. Below lg the video column is the
 * whole screen, so the same curtain sweeps all the way across.
 */
export function SplashIntro({ businessName, tagline, scrollPromptLabel, onEnter }) {
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();

  return (
    <div
      onClick={onEnter}
      onWheel={onEnter}
      onTouchMove={onEnter}
      // Once it's leaving, stop intercepting clicks meant for the hero.
      className={`absolute inset-0 z-[60] cursor-pointer ${isPresent ? '' : 'pointer-events-none'}`}
    >
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
        className="absolute inset-y-0 left-0 right-[var(--hero-video-w)] bg-paper"
      />
      <motion.div
        exit={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        className="absolute inset-y-0 right-0 w-[var(--hero-video-w)] origin-left bg-paper"
      />

      <motion.div
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: '-10vw', y: '-8vh', scale: 0.88 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
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
          transition={{ duration: 1.5, delay: 0.1, ease: EASE }}
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
    </div>
  );
}

SplashIntro.propTypes = {
  businessName: PropTypes.string,
  tagline: PropTypes.string,
  scrollPromptLabel: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};
