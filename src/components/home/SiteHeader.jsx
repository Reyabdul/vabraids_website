'use client';

import PropTypes from 'prop-types';
import { CtaLink } from '@/components/ui/CtaLink';

const NAV_ITEMS = [
  { id: 'about', labelKey: 'navStudioLabel' },
  { id: 'services', labelKey: 'navServicesLabel' },
  { id: 'gallery', labelKey: 'navGalleryLabel' },
  { id: 'instagram', labelKey: 'navInstagramLabel' },
  { id: 'contact', labelKey: 'navContactLabel' },
];

/**
 * Fixed transparent header — wordmark, section nav, and the Re-Up
 * booking CTA. Nav labels/CTA copy come from siteSettings. `tone`
 * reflects the background directly behind the header (set by the
 * parent as the visitor scrolls) so nav text stays readable over both
 * light sections and dark ones like Gallery/Contact.
 */
export function SiteHeader({ siteSettings, onNavigate, tone = 'light' }) {
  const textClass = tone === 'dark' ? 'text-paper' : 'text-ink';

  return (
    <header className="fixed top-0 inset-x-0 h-[68px] z-40 flex items-center justify-between px-6 md:px-10">
      <button
        type="button"
        onClick={() => onNavigate('hero')}
        className={`font-display font-medium text-2xl tracking-[.02em] cursor-pointer bg-transparent border-0 p-0 transition-colors duration-300 ${textClass}`}
      >
        {siteSettings?.businessName}
      </button>

      <nav className="flex items-center gap-9">
        {NAV_ITEMS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={`hidden lg:block text-xs tracking-[.2em] uppercase cursor-pointer bg-transparent border-0 p-0 transition-colors duration-300 ${textClass}`}
          >
            {siteSettings?.[labelKey]}
          </button>
        ))}
        {siteSettings?.bookingUrl && (
          <CtaLink href={siteSettings.bookingUrl} variant="outline" tone={tone} size="sm">
            {siteSettings.bookingCtaLabel}
          </CtaLink>
        )}
      </nav>
    </header>
  );
}

SiteHeader.propTypes = {
  siteSettings: PropTypes.shape({
    businessName: PropTypes.string,
    navStudioLabel: PropTypes.string,
    navServicesLabel: PropTypes.string,
    navGalleryLabel: PropTypes.string,
    navInstagramLabel: PropTypes.string,
    navContactLabel: PropTypes.string,
    bookingCtaLabel: PropTypes.string,
    bookingUrl: PropTypes.string,
  }),
  onNavigate: PropTypes.func.isRequired,
  tone: PropTypes.oneOf(['light', 'dark']),
};
