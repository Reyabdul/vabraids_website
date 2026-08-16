import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query/getQueryClient';
import { client } from '@/sanity/lib/client';
import * as queries from '@/sanity/lib/queries';
import { HomeExperience } from '@/components/home/HomeExperience';

// Maps each TanStack Query cache key (see src/lib/query/hooks) to the
// GROQ query that fills it, so the server can prefetch everything the
// client will ask for on mount.
const PREFETCH_MAP = {
  siteSettings: queries.siteSettingsQuery,
  splashContent: queries.splashContentQuery,
  heroContent: queries.heroContentQuery,
  aboutContent: queries.aboutContentQuery,
  servicesContent: queries.servicesContentQuery,
  services: queries.servicesQuery,
  galleryContent: queries.galleryContentQuery,
  galleryImages: queries.galleryImagesQuery,
  featuredGalleryImages: queries.featuredGalleryImagesQuery,
  instagramContent: queries.instagramContentQuery,
  voicesContent: queries.voicesContentQuery,
  testimonials: queries.testimonialsQuery,
  faqContent: queries.faqContentQuery,
  faqs: queries.faqsQuery,
  contactContent: queries.contactContentQuery,
};

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all(
    Object.entries(PREFETCH_MAP).map(([queryKey, groqQuery]) =>
      queryClient.prefetchQuery({
        queryKey: [queryKey],
        queryFn: () => client.fetch(groqQuery),
      })
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeExperience />
    </HydrationBoundary>
  );
}
