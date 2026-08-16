import { useSanityQuery } from './useSanityQuery';
import { splashContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the splash/intro overlay copy.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, scrollPromptLabel: string
 * }>}
 */
export function useSplashContent() {
  return useSanityQuery('splashContent', splashContentQuery);
}
