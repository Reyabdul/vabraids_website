import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaLink } from '@/components/ui/CtaLink';
import { GalleryPhoto } from '@/components/gallery/GalleryPhoto';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Gallery preview grid (featured images) with a link into the full
 * gallery overlay. Tiles are black and white until hovered; clicking one
 * opens it in the lightbox via `onSelectImage`.
 */
export function GallerySection({ content, images = [], onOpenFullGallery, onSelectImage }) {
  return (
    <section id="gallery" className="min-h-screen px-6 md:px-10 py-26 md:py-24 text-paper">
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <Eyebrow tone="inverted" className="mb-5">
              {content?.eyebrow}
            </Eyebrow>
            <SectionHeading>{content?.heading}</SectionHeading>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 8).map((image, i) => (
            <Reveal key={image._id} delay={0.06 * i} className="relative w-full h-[160px] md:h-[220px] hover:z-10 focus-within:z-10">
              <GalleryPhoto photo={image} sizes="(min-width: 768px) 25vw, 50vw" onSelect={onSelectImage} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="flex items-center justify-center mt-9">
          <CtaLink onClick={onOpenFullGallery} variant="outline" tone="dark">
            {content?.viewFullGalleryLabel}
          </CtaLink>
        </Reveal>
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
      label: PropTypes.string,
    })
  ),
  onOpenFullGallery: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
