import { useSanityQuery } from './useSanityQuery';
import { heroContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Hero section — the first full-screen panel after the splash.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, backgroundImage: object, eyebrow: string,
 *   headline: string, viewServicesLabel: string
 * }>}
 */
export function useHeroContent() {
  return useSanityQuery('heroContent', heroContentQuery);
}
