'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { GalleryPhoto } from './GalleryPhoto';
import { Reveal } from '@/components/ui/Reveal';

const CATEGORY_ORDER = ['all', 'braids', 'twists', 'ponytails'];

/**
 * Full-screen gallery overlay — category filter tabs over a masonry
 * grid of every gallery image. Tiles are black and white until hovered;
 * clicking one opens it in the lightbox via `onSelectImage`.
 * Mounted/unmounted by the parent inside an <AnimatePresence>.
 */
export function GalleryOverlay({ content, images = [], instagramHandle, onClose, onSelectImage }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] bg-ink text-paper overflow-y-auto px-6 md:px-10 pt-20 pb-16"
    >
      <CtaLink
        onClick={onClose}
        variant="outline"
        tone="dark"
        size="sm"
        className="absolute top-5 right-6 md:right-10"
      >
        {content?.closeLabel}
      </CtaLink>

      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <SectionHeading>{content?.overlayHeading}</SectionHeading>
          <div className="flex gap-2.5 flex-wrap">
            {CATEGORY_ORDER.map((key) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`text-[11px] tracking-[.18em] uppercase px-4 py-[9px] cursor-pointer transition-colors border ${
                    active ? 'bg-paper text-ink border-paper' : 'bg-transparent text-paper border-paper/28 hover:border-paper/70'
                  }`}
                >
                  {content?.filterLabels?.[key]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {filtered.map((img, i) => {
            const { width, height } = img.image?.dimensions || {};
            return (
              <Reveal
                key={img._id}
                delay={0.05 * (i % 6)}
                className="break-inside-avoid mb-4 relative w-full hover:z-10 focus-within:z-10"
                style={{ aspectRatio: width && height ? `${width} / ${height}` : '3 / 4' }}
              >
                <GalleryPhoto
                  photo={img}
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  onSelect={onSelectImage}
                />
              </Reveal>
            );
          })}
        </div>

        {instagramHandle && (
          <div className="flex items-center justify-between mt-9 border-t border-paper/16 pt-6 flex-wrap gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper text-xs tracking-[.2em] uppercase"
            >
              @{instagramHandle}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

GalleryOverlay.propTypes = {
  content: PropTypes.shape({
    overlayHeading: PropTypes.string,
    closeLabel: PropTypes.string,
    filterLabels: PropTypes.object,
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      image: PropTypes.object,
      alt: PropTypes.string,
      label: PropTypes.string,
      category: PropTypes.string,
    })
  ),
  instagramHandle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
