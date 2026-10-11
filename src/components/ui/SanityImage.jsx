import Image from 'next/image';
import PropTypes from 'prop-types';
import { urlFor } from '@/sanity/lib/image';

/**
 * Fills its (positioned, sized) parent with a Sanity image, or a neutral
 * placeholder box when the field hasn't been filled in yet in Studio.
 * Also accepts a local `{ src }` image (see src/lib/localGalleryImages.js),
 * the stand-in used for content that isn't in Sanity yet.
 * @param {{ image: object, alt: string, sizes?: string, className?: string }} props
 */
export function SanityImage({ image, alt, sizes = '100vw', className = '' }) {
  if (image?.src) {
    return (
      <Image src={image.src} alt={alt || ''} fill sizes={sizes} className={`object-cover ${className}`} />
    );
  }

  if (!image?.asset) {
    return <div className={`absolute inset-0 bg-paper-warm ${className}`} />;
  }

  return (
    <Image
      src={urlFor(image).auto('format').fit('max').url()}
      alt={alt || ''}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}

SanityImage.propTypes = {
  image: PropTypes.object,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
};
