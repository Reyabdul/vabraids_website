import { useSanityQuery } from './useSanityQuery';
import { faqContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the FAQ section heading. Questions themselves come from useFaqs().
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, heading: string
 * }>}
 */
export function useFaqContent() {
  return useSanityQuery('faqContent', faqContentQuery);
}
