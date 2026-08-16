import { useSanityQuery } from './useSanityQuery';
import { servicesQuery } from '@/sanity/lib/queries';

/**
 * Fetch all menu services, ordered by menu section then display order.
 * @returns {import('@tanstack/react-query').UseQueryResult<Array<{
 *   _id: string, name: string, menuSection: string, priceType: string,
 *   price: number, priceTiers: Array<{ label: string, price: number }>,
 *   priceNote: string, addOnNote: string, status: string, order: number
 * }>>}
 */
export function useServices() {
  return useSanityQuery('services', servicesQuery);
}
