import PropTypes from 'prop-types';
import { SanityImage } from '@/components/ui/SanityImage';

/**
 * One clickable gallery tile, filling its (positioned, sized) parent.
 * The photo sits in black and white so the grid reads as one calm block
 * against the neutral palette, and returns to colour on hover/keyboard
 * focus. The whole tile also grows slightly, overlapping its neighbours
 * rather than pushing them (it's a transform, so layout doesn't move) —
 * the parent needs `hover:z-10 focus-within:z-10` so the grown tile sits
 * on top of the tiles after it instead of underneath. Clicking hands the whole gallery image back to the parent, which
 * opens it in <GalleryLightbox>.
 * @param {{ photo: { image: object, alt: string, label?: string }, sizes?: string,
 *   onSelect: (photo: object) => void }} props
 */
export function GalleryPhoto({ photo, sizes, onSelect }) {
  return (
    // No aria-label: the button's accessible name is the image's alt text.
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onSelect(photo)}
      className="group absolute inset-0 block w-full h-full p-0 border-0 bg-transparent cursor-pointer transition-[scale] duration-500 ease-out hover:scale-105 focus-visible:scale-105"
    >
      <SanityImage
        image={photo.image}
        alt={photo.alt}
        sizes={sizes}
        className="grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-visible:grayscale-0"
      />
    </button>
  );
}

GalleryPhoto.propTypes = {
  photo: PropTypes.shape({
    image: PropTypes.object,
    alt: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  sizes: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
