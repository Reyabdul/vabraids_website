import { useSanityQuery } from './useSanityQuery';
import { faqsQuery } from '@/sanity/lib/queries';

/**
 * Fetch all FAQ question/answer pairs, ordered by display order.
 * @returns {import('@tanstack/react-query').UseQueryResult<Array<{
 *   _id: string, question: string, answer: string, order: number
 * }>>}
 */
export function useFaqs() {
  return useSanityQuery('faqs', faqsQuery);
}
