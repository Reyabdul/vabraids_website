import { useSanityQuery } from './useSanityQuery';
import { instagramContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Instagram section copy. The handle itself lives on
 * useSiteSettings() and is reused here.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, followCtaLabel: string
 * }>}
 */
export function useInstagramContent() {
  return useSanityQuery('instagramContent', instagramContentQuery);
}
