import { useSanityQuery } from './useSanityQuery';
import { galleryContentQuery } from '@/sanity/lib/queries';

/**
 * Fetch the Gallery preview section and full-gallery overlay copy.
 * @returns {import('@tanstack/react-query').UseQueryResult<{
 *   _id: string, eyebrow: string, heading: string, viewFullGalleryLabel: string,
 *   overlayHeading: string, closeLabel: string,
 *   filterLabels: { all: string, braids: string, twists: string, ponytails: string }
 * }>}
 */
export function useGalleryContent() {
  return useSanityQuery('galleryContent', galleryContentQuery);
}
