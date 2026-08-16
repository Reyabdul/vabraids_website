import { useSanityQuery } from './useSanityQuery';
import { featuredGalleryImagesQuery } from '@/sanity/lib/queries';

/**
 * Fetch gallery images flagged `featured`, for the Home page gallery
 * preview grid.
 * @returns {import('@tanstack/react-query').UseQueryResult<Array<{
 *   _id: string, image: object, alt: string, label: string,
 *   category: string, order: number
 * }>>}
 */
export function useFeaturedGalleryImages() {
  return useSanityQuery('featuredGalleryImages', featuredGalleryImagesQuery);
}
