import { useSanityQuery } from './useSanityQuery';
import { servicesContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Services/Menu section chrome copy (heading, intro, section
 * labels). Actual line items come from useServices().
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, heading: string, introText: string,
 *   menuSectionLabels: { washPrep: string, braids: string,
 *     singleBraidsTwists: string, ponytails: string, comingSoon: string }
 * }>}
 */
export function useServicesContent() {
  return useSanityQuery('servicesContent', servicesContentQuery);
}
