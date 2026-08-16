import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { SanityImage } from '@/components/ui/SanityImage';

/**
 * Gallery preview grid (featured images) with a link into the full
 * gallery overlay.
 */
export function GallerySection({ content, images = [], onOpenFullGallery }) {
  return (
    <section id="gallery" className="snap-start min-h-screen px-6 md:px-10 py-26 md:py-24 bg-ink text-paper">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <Eyebrow tone="inverted" className="mb-5">
              {content?.eyebrow}
            </Eyebrow>
            <SectionHeading>{content?.heading}</SectionHeading>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 8).map((image) => (
            <div key={image._id} className="relative w-full h-[160px] md:h-[220px]">
              <SanityImage image={image.image} alt={image.alt} sizes="(min-width: 768px) 25vw, 50vw" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-9">
          <CtaLink onClick={onOpenFullGallery} variant="outline" tone="dark">
            {content?.viewFullGalleryLabel}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

GallerySection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    heading: PropTypes.string,
    viewFullGalleryLabel: PropTypes.string,
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      image: PropTypes.object,
      alt: PropTypes.string,
    })
  ),
  onOpenFullGallery: PropTypes.func.isRequired,
};
