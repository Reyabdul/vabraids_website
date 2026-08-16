import { useQuery } from '@tanstack/react-query';
import { client } from '@/sanity/lib/client';

/**
 * Thin wrapper around TanStack Query's useQuery for GROQ-backed content.
 * Every content-type hook in this folder (useServices, useSiteSettings, etc.)
 * calls this instead of repeating the client.fetch/queryKey boilerplate.
 * @param {string} queryKey - Unique TanStack Query cache key for this content type.
 * @param {string} groqQuery - GROQ query string, from src/sanity/lib/queries.js.
 * @param {object} [options] - Additional TanStack Query options (e.g. { enabled }).
 */
export function useSanityQuery(queryKey, groqQuery, options = {}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => client.fetch(groqQuery),
    ...options,
  });
}
