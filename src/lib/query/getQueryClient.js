import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

/**
 * Per-request QueryClient for Server Components. `cache()` dedupes this
 * to one instance per request so multiple prefetches in the same render
 * share a cache — separate from the browser QueryClient in provider.jsx.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
);
