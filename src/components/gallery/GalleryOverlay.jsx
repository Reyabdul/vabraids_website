'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SanityImage } from '@/components/ui/SanityImage';

const CATEGORY_ORDER = ['all', 'braids', 'twists', 'ponytails'];

/**
 * Full-screen gallery overlay — category filter tabs over a masonry
 * grid of every gallery image. Mounted/unmounted by the parent inside
 * an <AnimatePresence>.
 */
export function GalleryOverlay({ content, images = [], instagramHandle, onClose }) {
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
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-9 text-[13px] tracking-[.2em] uppercase cursor-pointer bg-transparent border-0 text-paper p-0"
      >
        {content?.closeLabel}
      </button>

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
                    active ? 'bg-paper text-ink border-paper' : 'bg-transparent text-paper border-paper/28'
                  }`}
                >
                  {content?.filterLabels?.[key]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {filtered.map((img) => {
            const { width, height } = img.image?.dimensions || {};
            return (
              <div
                key={img._id}
                className="break-inside-avoid mb-4 relative w-full"
                style={{ aspectRatio: width && height ? `${width} / ${height}` : '3 / 4' }}
              >
                <SanityImage
                  image={img.image}
                  alt={img.alt}
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
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
      category: PropTypes.string,
    })
  ),
  instagramHandle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
