import { useSanityQuery } from './useSanityQuery';
import { testimonialsQuery } from '@/sanity/lib/queries';

/**
 * Fetch all client testimonials, ordered by display order.
 * @returns {import('@tanstack/react-query').UseQueryResult<Array<{
 *   _id: string, quote: string, clientName: string, order: number
 * }>>}
 */
export function useTestimonials() {
  return useSanityQuery('testimonials', testimonialsQuery);
}
