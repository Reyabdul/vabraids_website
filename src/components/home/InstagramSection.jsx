import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PLACEHOLDER_SLOTS = Array.from({ length: 6 });

/**
 * Instagram teaser strip. `instagramContent` only holds the section's
 * chrome copy — there's no Sanity field yet for individual post
 * thumbnails/links, so the slots render as neutral placeholders until
 * that's added.
 */
export function InstagramSection({ content, instagramHandle }) {
  return (
    <section
      id="instagram"
      className="snap-start min-h-screen flex flex-col justify-center px-6 md:px-10 py-24"
    >
      <div className="max-w-[1180px] mx-auto w-full">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <Eyebrow className="mb-5">{content?.eyebrow}</Eyebrow>
            <SectionHeading>{instagramHandle ? `@${instagramHandle}` : ''}</SectionHeading>
          </div>
          <a
            href={instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : 'https://www.instagram.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[.2em] uppercase border-b border-ink/50 pb-[3px]"
          >
            {content?.followCtaLabel}
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {PLACEHOLDER_SLOTS.map((_, i) => (
            <div key={i} className="shrink-0 relative w-[220px] h-[220px] bg-paper-dusk" />
          ))}
        </div>
      </div>
    </section>
  );
}

InstagramSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    followCtaLabel: PropTypes.string,
  }),
  instagramHandle: PropTypes.string,
};
