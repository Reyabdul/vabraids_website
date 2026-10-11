'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { SanityImage } from '@/components/ui/SanityImage';

// Space kept clear above + below the photo (matches the py-16 backdrop
// padding), so the photo never runs under the close button.
const VERTICAL_GUTTER = '8rem';

/**
 * Modal showing one gallery photo in full colour, uncropped, with its
 * style name (the `label` field, e.g. "Stitch braids") in the bottom-left
 * corner. Backdrop click, the close button and Escape all close it.
 * Mounted/unmounted by the parent inside an <AnimatePresence>.
 * @param {{ photo: { image: object, alt: string, label?: string },
 *   closeLabel?: string, onClose: () => void }} props
 */
export function GalleryLightbox({ photo, closeLabel, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // The frame takes the photo's own aspect ratio and is as wide as it can
  // be while still fitting the viewport height, so the whole picture shows
  // (the grid tiles crop; this doesn't).
  const { width, height } = photo.image?.dimensions || {};
  const ratio = width && height ? width / height : 3 / 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-ink/90 flex items-center justify-center px-6 py-16"
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-5 right-6 md:right-9 text-paper/70 hover:text-paper text-3xl leading-none cursor-pointer bg-transparent border-0 p-0"
      >
        ×
      </button>

      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={photo.label || photo.alt}
        onClick={(e) => e.stopPropagation()}
        className="relative m-0 overflow-hidden"
        style={{
          aspectRatio: ratio,
          width: `min(100%, calc((100dvh - ${VERTICAL_GUTTER}) * ${ratio}))`,
        }}
      >
        <SanityImage image={photo.image} alt={photo.alt} sizes="(min-width: 768px) 80vw, 100vw" />

        {photo.label && (
          // Gradient behind the caption keeps it legible over light photos.
          <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-5 pt-14 pb-4 text-left text-paper text-[11px] md:text-xs tracking-[.2em] uppercase pointer-events-none">
            {photo.label}
          </figcaption>
        )}
      </motion.figure>
    </motion.div>
  );
}

GalleryLightbox.propTypes = {
  photo: PropTypes.shape({
    image: PropTypes.object,
    alt: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  closeLabel: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
