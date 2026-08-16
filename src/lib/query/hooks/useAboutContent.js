import { useSanityQuery } from './useSanityQuery';
import { aboutContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the About/Stylist section — portrait, bio, and Re-Up partnership copy.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, portrait: object, eyebrow: string, headline: string,
 *   bio: Array<object>, partnershipLabel: string, partnershipName: string
 * }>}
 */
export function useAboutContent() {
  return useSanityQuery('aboutContent', aboutContentQuery);
}
