import { useSanityQuery } from './useSanityQuery';
import { siteSettingsQuery } from '@/sanity/lib/queries';

/**
 * Fetch global site settings — nav labels, booking URL, hair disclaimer,
 * footer copy. Shared across header, hero, and contact.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, businessName: string, tagline: string, instagramHandle: string,
 *   navStudioLabel: string, navServicesLabel: string, navGalleryLabel: string,
 *   navInstagramLabel: string, navContactLabel: string, bookingCtaLabel: string,
 *   footerCopyrightText: string, studioAddress: string, bookingPlatformName: string,
 *   bookingUrl: string, contactEmail: string, hairDisclaimer: string
 * }>}
 */
export function useSiteSettings() {
  return useSanityQuery('siteSettings', siteSettingsQuery);
}
