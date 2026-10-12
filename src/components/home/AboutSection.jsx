import PropTypes from 'prop-types';
import { PortableText } from '@portabletext/react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SanityImage } from '@/components/ui/SanityImage';
import { Reveal } from '@/components/ui/Reveal';

// Used until "Partnership Link" is filled in on the About document in Studio.
const DEFAULT_PARTNERSHIP_URL = 'https://www.thereuphub.com/';

// Used until "Alt Text" is filled in on the portrait in Studio.
const DEFAULT_PORTRAIT_ALT = 'Portrait of Vanessa';

/**
 * About/Stylist section — portrait, bio, and the Re-Up partnership credit
 * (the partner name links out to their site).
 */
export function AboutSection({ content }) {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 md:px-10 py-24 md:py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-10 md:gap-18 items-center max-w-[1180px] mx-auto w-full">
        <Reveal className="relative w-full aspect-[3/4]">
          <SanityImage image={content?.portrait} alt={content?.portrait?.alt || DEFAULT_PORTRAIT_ALT} sizes="(min-width: 768px) 40vw, 100vw" />
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow className="mb-6">{content?.eyebrow}</Eyebrow>
          <SectionHeading className="mb-7 whitespace-pre-line">{content?.headline}</SectionHeading>
          {Array.isArray(content?.bio) && (
            <div className="text-base leading-[1.85] text-body font-light max-w-[46ch] [&_p]:mb-5">
              <PortableText value={content.bio} />
            </div>
          )}
          <div className="flex items-center gap-3.5 text-xs tracking-[.2em] uppercase text-muted mt-8">
            <span>{content?.partnershipLabel}</span>
            <a
              href={content?.partnershipUrl || DEFAULT_PARTNERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              // hover:opacity-100 cancels the global `a:hover` fade — this
              // chip inverts instead.
              className="text-ink border border-ink/30 px-3.5 py-2 transition-colors duration-300 hover:opacity-100 hover:bg-ink hover:text-paper hover:border-ink"
            >
              {content?.partnershipName}
            </a>
          </div>
        </Reveal>
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
    partnershipUrl: PropTypes.string,
  }),
};
