import Image from 'next/image';
import PropTypes from 'prop-types';
import { urlFor } from '@/sanity/lib/image';

/**
 * Fills its (positioned, sized) parent with a Sanity image, or a neutral
 * placeholder box when the field hasn't been filled in yet in Studio.
 * `priority` loads the image eagerly instead of lazily — only for the one
 * image visible as soon as the page opens (the hero poster).
 * @param {{ image: object, alt: string, sizes?: string, className?: string, priority?: boolean }} props
 */
export function SanityImage({ image, alt, sizes = '100vw', className = '', priority = false }) {
  if (!image?.asset) {
    return <div className={`absolute inset-0 bg-paper-warm ${className}`} />;
  }

  return (
    <Image
      src={urlFor(image).auto('format').fit('max').url()}
      alt={alt || ''}
      fill
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`object-cover ${className}`}
    />
  );
}

SanityImage.propTypes = {
  image: PropTypes.object,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
  priority: PropTypes.bool,
};
