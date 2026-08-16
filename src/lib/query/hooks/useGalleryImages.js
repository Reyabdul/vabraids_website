import { useSanityQuery } from './useSanityQuery';
import { galleryImagesQuery } from '@/sanity/lib/queries';

/**
 * Fetch all gallery images, ordered by display order, for the full
 * gallery overlay (filterable by category).
 * @returns {import('@tanstack/react-query').UseQueryResult<Array<{
 *   _id: string, image: object, alt: string, label: string,
 *   category: string, featured: boolean, order: number
 * }>>}
 */
export function useGalleryImages() {
  return useSanityQuery('galleryImages', galleryImagesQuery);
}
