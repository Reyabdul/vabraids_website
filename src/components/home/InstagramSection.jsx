import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmbedHtml } from '@/components/ui/EmbedHtml';
import { Reveal } from '@/components/ui/Reveal';

const PLACEHOLDER_SLOTS = Array.from({ length: 6 });

/**
 * Instagram teaser strip. Shows the client's live Reels via a third-party
 * widget snippet (`content.embedCode`, pasted into Sanity from a provider
 * like EmbedSocial/Tagembed) so newly posted Reels show up with no code
 * changes. Falls back to neutral placeholder squares until that field is
 * filled in.
 */
export function InstagramSection({ content, instagramHandle }) {
  return (
    <section
      id="instagram"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 py-24"
    >
      <div className="max-w-[1180px] mx-auto w-full">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
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
        </Reveal>
        {content?.embedCode ? (
          <Reveal delay={0.15}>
            <EmbedHtml html={content.embedCode} />
          </Reveal>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PLACEHOLDER_SLOTS.map((_, i) => (
              <Reveal key={i} delay={0.08 * i} className="shrink-0 relative w-[220px] h-[220px] bg-paper-dusk" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

InstagramSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    followCtaLabel: PropTypes.string,
    embedCode: PropTypes.string,
  }),
  instagramHandle: PropTypes.string,
};
