'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ROTATE_INTERVAL_MS = 6500;

/**
 * Rotating client testimonial with manual dot navigation.
 */
export function VoicesSection({ content, testimonials = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <section
      id="voices"
      className="snap-start min-h-screen flex items-center px-6 md:px-10 py-24 bg-paper-dusk"
    >
      <div className="max-w-[860px] mx-auto text-center">
        <Eyebrow className="mb-10">{content?.eyebrow}</Eyebrow>

        {current && (
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="m-0"
            >
              <SectionHeading as="p" variant="quote" className="mb-8">
                &ldquo;{current.quote}&rdquo;
              </SectionHeading>
              <div className="text-xs tracking-[.22em] uppercase text-muted-2">
                {current.clientName}
              </div>
            </motion.blockquote>
          </AnimatePresence>
        )}

        {testimonials.length > 1 && (
          <div className="flex gap-2.5 justify-center mt-11">
            {testimonials.map((t, i) => (
              <button
                key={t._id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${t.clientName}`}
                className={`h-2 rounded-full cursor-pointer transition-all bg-ink border-0 p-0 ${
                  i === index ? 'w-[22px] opacity-100' : 'w-2 opacity-30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

VoicesSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
  }),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      quote: PropTypes.string,
      clientName: PropTypes.string,
    })
  ),
};
