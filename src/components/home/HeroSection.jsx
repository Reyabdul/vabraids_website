'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { SanityImage } from '@/components/ui/SanityImage';

/**
 * First full-screen panel after the splash — background photo, headline,
 * and the primary booking CTA / secondary "view services" scroll link.
 */
export function HeroSection({ content, bookingUrl, bookingLabel, onViewServices }) {
  return (
    <section
      id="hero"
      className="snap-start relative min-h-screen w-full overflow-hidden bg-paper-deep"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 overflow-hidden"
      >
        <SanityImage image={content?.backgroundImage} alt="" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/5 to-black/55 pointer-events-none" />

      <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-12 md:bottom-16 pointer-events-none text-paper">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-5"
        >
          <Eyebrow tone="paper" className="tracking-[.34em]">
            {content?.eyebrow}
          </Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading as="h1" variant="hero" className="max-w-[15ch] whitespace-pre-line">
            {content?.headline}
          </SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6 mt-8 pointer-events-auto"
        >
          {bookingUrl && (
            <CtaLink href={bookingUrl} variant="filled" size="md">
              {bookingLabel}
            </CtaLink>
          )}
          <CtaLink onClick={onViewServices} variant="text" tone="dark">
            {content?.viewServicesLabel}
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  content: PropTypes.shape({
    backgroundImage: PropTypes.object,
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    viewServicesLabel: PropTypes.string,
  }),
  bookingUrl: PropTypes.string,
  bookingLabel: PropTypes.string,
  onViewServices: PropTypes.func.isRequired,
};
