import { useSanityQuery } from './useSanityQuery';
import { voicesContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Voices/testimonials section heading. Quotes themselves
 * come from useTestimonials().
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string
 * }>}
 */
export function useVoicesContent() {
  return useSanityQuery('voicesContent', voicesContentQuery);
}
