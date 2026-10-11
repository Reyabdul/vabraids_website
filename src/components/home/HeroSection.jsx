'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';

const EASE = [0.16, 1, 0.3, 1];

/**
 * First full-screen panel after the splash — headline, the primary
 * booking CTA / secondary "view services" scroll link, and the portrait
 * hero video.
 *
 * The video is portrait, so the layout depends on the viewport: on wide
 * landscape screens (the `split:` variant, see globals.css) it's a
 * right-hand column, --hero-video-w wide, with the text on the page
 * background beside it; everywhere else — phones, and tablets held
 * upright — it fills the whole section and the text sits on top of it
 * over a dark gradient.
 *
 * `revealed` flips once the splash starts opening — the entrance
 * animations wait for it so they aren't spent behind the splash.
 */
export function HeroSection({ content, bookingUrl, bookingLabel, onViewServices, revealed = true }) {
  const rise = revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 };

  return (
    // dvh rather than vh so the CTAs clear a phone browser's toolbar; the
    // rem floor keeps the text from colliding with the header on very
    // short viewports (a small phone held sideways) — the section scrolls
    // a little instead.
    <section id="hero" className="relative min-h-[max(100dvh,22.5rem)] w-full overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[var(--hero-video-w)] overflow-hidden bg-ink">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: revealed ? 1 : 1.08 }}
          transition={{ duration: 2.6, ease: EASE }}
          // grayscale covers the poster too, so there's no flash of colour
          // before the video's first frame.
          className="absolute inset-0 overflow-hidden grayscale"
        >
          <BackgroundVideo
            src={content?.videoUrl}
            poster={content?.backgroundImage}
            sizes="(min-width: 1024px) and (min-aspect-ratio: 1/1) 50vw, 100vw"
          />
        </motion.div>
        {/* Legibility scrim — only needed while the text overlaps the video. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75 pointer-events-none split:hidden" />
        {/* In the split layout only the header overlaps the video. Its nav
            is paper coloured there, so darken the top strip — the footage
            can be bright at the top and would otherwise wash the nav out. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/70 via-black/35 to-transparent pointer-events-none hidden split:block" />
      </div>

      <div className="absolute left-6 md:left-10 right-6 md:right-10 split:right-[calc(var(--hero-video-w)+2.5rem)] bottom-12 md:bottom-16 pointer-events-none text-paper split:text-ink">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-5"
        >
          <Eyebrow tone="paper" className="tracking-[.34em] split:text-muted">
            {content?.eyebrow}
          </Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={rise}
          transition={{ duration: 1.3, delay: 0.6, ease: EASE }}
        >
          {/* On short viewports (a phone held sideways) let the headline
              run wide instead of stacking, so the CTAs stay on screen. */}
          <SectionHeading
            as="h1"
            variant="hero"
            className="max-w-[15ch] [@media(max-height:480px)]:max-w-none whitespace-pre-line"
          >
            {content?.headline}
          </SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={rise}
          transition={{ duration: 1.3, delay: 0.9, ease: EASE }}
          className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-8 pointer-events-auto"
        >
          {/* CtaLink's defaults are paper-on-dark (right over the video);
              in the split layout the CTAs sit on the light panel, so flip
              to ink — hover states included (forced with `!` so they win
              over CtaLink's own paper-toned hover). */}
          {bookingUrl && (
            <CtaLink
              href={bookingUrl}
              variant="filled"
              size="md"
              raised
              className="split:bg-ink split:text-paper split:border-ink split:hover:bg-transparent! split:hover:text-ink! split:active:bg-ink/20!"
            >
              {bookingLabel}
            </CtaLink>
          )}
          <CtaLink
            onClick={onViewServices}
            variant="text"
            tone="dark"
            className="split:text-ink split:border-ink/50 split:hover:text-ink/60! split:hover:border-ink!"
          >
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
    videoUrl: PropTypes.string,
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    viewServicesLabel: PropTypes.string,
  }),
  bookingUrl: PropTypes.string,
  bookingLabel: PropTypes.string,
  onViewServices: PropTypes.func.isRequired,
  revealed: PropTypes.bool,
};
