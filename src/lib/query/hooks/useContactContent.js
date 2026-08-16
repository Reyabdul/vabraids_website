import { useSanityQuery } from './useSanityQuery';
import { contactContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Contact section copy — intro, inquiry form field labels,
 * and success-state copy.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, headline: string, introText: string,
 *   nameFieldPlaceholder: string, emailFieldPlaceholder: string,
 *   phoneFieldPlaceholder: string, serviceFieldPlaceholder: string,
 *   messageFieldPlaceholder: string, submitButtonLabel: string,
 *   successHeadline: string, successMessage: string
 * }>}
 */
export function useContactContent() {
  return useSanityQuery('contactContent', contactContentQuery);
}
