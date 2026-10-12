'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { SanityImage } from '@/components/ui/SanityImage';

/**
 * Fills its (positioned, sized) parent with a silent looping video laid
 * over a poster image. The poster stays visible until the first frame
 * paints, and is all that renders when there's no video or the visitor
 * has asked their OS to reduce motion.
 * @param {{ src?: string, poster?: object, sizes?: string }} props
 *   `poster` is a Sanity image (see <SanityImage>).
 */
export function BackgroundVideo({ src, poster, sizes = '100vw' }) {
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const showVideo = Boolean(src) && !reduceMotion;

  // React doesn't reliably emit the `muted` attribute, and browsers block
  // autoplay on any video they don't consider muted — so set it on the
  // element itself and start playback by hand.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay refused (e.g. low-power mode) — the poster stays in view.
    });
  }, [showVideo, src]);

  return (
    <>
      <SanityImage image={poster} alt="" sizes={sizes} priority />
      {showVideo && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}

BackgroundVideo.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.object,
  sizes: PropTypes.string,
};
