import PropTypes from 'prop-types';
import { PortableText } from '@portabletext/react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SanityImage } from '@/components/ui/SanityImage';

/**
 * About/Stylist section — portrait, bio, and the Re-Up partnership credit.
 */
export function AboutSection({ content }) {
  return (
    <section
      id="about"
      className="snap-start min-h-screen flex items-center px-6 md:px-10 py-24 md:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-10 md:gap-18 items-center max-w-[1180px] mx-auto w-full">
        <div className="relative w-full aspect-[3/4]">
          <SanityImage image={content?.portrait} alt="Portrait of Vanessa" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div>
          <Eyebrow className="mb-6">{content?.eyebrow}</Eyebrow>
          <SectionHeading className="mb-7 whitespace-pre-line">{content?.headline}</SectionHeading>
          {Array.isArray(content?.bio) && (
            <div className="text-base leading-[1.85] text-body font-light max-w-[46ch] [&_p]:mb-5">
              <PortableText value={content.bio} />
            </div>
          )}
          <div className="flex items-center gap-3.5 text-xs tracking-[.2em] uppercase text-muted mt-8">
            <span>{content?.partnershipLabel}</span>
            <span className="text-ink border border-ink/30 px-3.5 py-2">{content?.partnershipName}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

AboutSection.propTypes = {
  content: PropTypes.shape({
    portrait: PropTypes.object,
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    bio: PropTypes.array,
    partnershipLabel: PropTypes.string,
    partnershipName: PropTypes.string,
  }),
};
