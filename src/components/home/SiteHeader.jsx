'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';

const NAV_ITEMS = [
  { id: 'about', labelKey: 'navStudioLabel' },
  { id: 'services', labelKey: 'navServicesLabel' },
  { id: 'gallery', labelKey: 'navGalleryLabel' },
  { id: 'faq', labelKey: 'navFaqLabel' },
  { id: 'contact', labelKey: 'navContactLabel' },
];

const BAR_CLASS = 'fixed top-0 inset-x-0 h-[68px] flex items-center justify-between px-6 md:px-10';

// 'ghost' keeps every control in place and clickable but paints nothing —
// see the split-tone layering in SiteHeader below.
const TEXT_CLASS = { light: 'text-ink', dark: 'text-paper', ghost: 'text-transparent' };

// Nav link hover: a hairline that draws in under the label. It's
// currentColor, so it follows the tone with no color transition of its own.
const NAV_UNDERLINE_CLASS =
  'relative after:absolute after:left-0 after:right-[.2em] after:-bottom-1.5 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-300';

/**
 * Wordmark, section nav and booking CTA, painted in a single tone.
 * Nav hover is driven by `hoveredId` rather than CSS :hover, because in
 * the split-tone header the copy under the cursor is transparent and the
 * copies you can see are inert — the real one reports hover via `onHover`
 * and every copy paints the underline for that link.
 */
function HeaderContent({ siteSettings, onNavigate, tone, hoveredId, onHover }) {
  const textClass = TEXT_CLASS[tone];
  const isGhost = tone === 'ghost';

  return (
    <>
      <button
        type="button"
        onClick={() => onNavigate('hero')}
        className={`font-display font-medium text-xl sm:text-2xl whitespace-nowrap tracking-[.02em] cursor-pointer bg-transparent border-0 p-0 ${textClass}`}
      >
        {siteSettings?.businessName}
      </button>

      <nav className="flex items-center gap-9">
        {NAV_ITEMS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            onMouseEnter={onHover ? () => onHover(id) : undefined}
            onMouseLeave={onHover ? () => onHover(null) : undefined}
            className={`hidden lg:block text-xs tracking-[.2em] uppercase cursor-pointer bg-transparent border-0 p-0 ${NAV_UNDERLINE_CLASS} ${
              hoveredId === id ? 'after:scale-x-100' : 'after:scale-x-0'
            } ${textClass}`}
          >
            {siteSettings?.[labelKey]}
          </button>
        ))}
        {/* Hover inverts the CTA (CtaLink's outline hover) and, being
            `raised`, lifts it; pressing sinks it. Only the lift/shadow
            are animated — no color transition here: the tone swaps as the
            page scrolls, and animating that is what used to leave the CTA
            stuck mid-swap.
            The ghost copy is invisible until hovered, then paints the
            inverted dark-tone pill over the visual copy beneath — in the
            split header the CTA always sits on the video side. */}
        {siteSettings?.bookingUrl && (
          <CtaLink
            href={siteSettings.bookingUrl}
            variant="outline"
            tone={isGhost ? 'dark' : tone}
            size="sm"
            raised
            className={`transition-[translate,scale,box-shadow]! ${isGhost ? 'not-hover:text-transparent! not-hover:border-transparent!' : ''}`}
          >
            {siteSettings.bookingCtaLabel}
          </CtaLink>
        )}
      </nav>
    </>
  );
}

HeaderContent.propTypes = {
  siteSettings: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  tone: PropTypes.oneOf(['light', 'dark', 'ghost']).isRequired,
  hoveredId: PropTypes.string,
  onHover: PropTypes.func,
};

/**
 * Fixed transparent header — wordmark, section nav, and the Re-Up
 * booking CTA. Nav labels/CTA copy come from siteSettings. `tone`
 * reflects the background directly behind the header (set by the
 * parent as the visitor scrolls) so nav text stays readable over both
 * light sections and dark ones like Gallery/Contact.
 *
 * `split` is for the hero, where the header straddles a light text panel
 * and the video. No single tone reads on both, so the bar is painted
 * twice — an ink copy clipped to the panel side and a paper copy clipped
 * to the video side, meeting on the hero's own split line
 * (--hero-video-w, see globals.css). clip-path also clips clicks, so
 * those two copies are purely visual (hidden from assistive tech and
 * inert) and one unclipped, transparent copy on top is the real,
 * focusable header. Below lg the video is full-width, which makes the
 * paper copy cover the whole bar — the same result as `dark`.
 *
 * The real <header> is the same element in every tone (only the two
 * visual copies come and go), so it isn't remounted when the tone flips
 * mid-scroll — a remount under the cursor would drop the mouseleave and
 * leave a nav link looking hovered.
 */
export function SiteHeader({ siteSettings, onNavigate, tone = 'light' }) {
  // Which nav link the cursor is over, shared by every painted copy.
  const [hoveredId, setHoveredId] = useState(null);
  const split = tone === 'split';

  return (
    <>
      {split && (
        <div
          aria-hidden="true"
          inert
          className={`${BAR_CLASS} z-40`}
          style={{ clipPath: 'inset(0 var(--hero-video-w) 0 0)' }}
        >
          <HeaderContent siteSettings={siteSettings} onNavigate={onNavigate} tone="light" hoveredId={hoveredId} />
        </div>
      )}
      {split && (
        <div
          aria-hidden="true"
          inert
          className={`${BAR_CLASS} z-40`}
          style={{ clipPath: 'inset(0 0 0 calc(100% - var(--hero-video-w)))' }}
        >
          <HeaderContent siteSettings={siteSettings} onNavigate={onNavigate} tone="dark" hoveredId={hoveredId} />
        </div>
      )}
      <header className={`${BAR_CLASS} ${split ? 'z-[41]' : 'z-40'}`}>
        <HeaderContent
          siteSettings={siteSettings}
          onNavigate={onNavigate}
          tone={split ? 'ghost' : tone}
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </header>
    </>
  );
}

SiteHeader.propTypes = {
  siteSettings: PropTypes.shape({
    businessName: PropTypes.string,
    navStudioLabel: PropTypes.string,
    navServicesLabel: PropTypes.string,
    navGalleryLabel: PropTypes.string,
    navFaqLabel: PropTypes.string,
    navContactLabel: PropTypes.string,
    bookingCtaLabel: PropTypes.string,
    bookingUrl: PropTypes.string,
  }),
  onNavigate: PropTypes.func.isRequired,
  tone: PropTypes.oneOf(['light', 'dark', 'split']),
};
