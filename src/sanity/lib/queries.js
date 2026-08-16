// GROQ queries, one per Sanity content type (see src/sanity/schemaTypes).
// Singleton section docs are fetched with `[0]`; collections are fetched
// as ordered arrays. Keep names aligned with the hooks in
// src/lib/query/hooks that consume them.

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]`;

export const splashContentQuery = /* groq */ `*[_type == "splashContent"][0]`;

export const heroContentQuery = /* groq */ `*[_type == "heroContent"][0]{
  ...,
  backgroundImage
}`;

export const aboutContentQuery = /* groq */ `*[_type == "aboutContent"][0]{
  ...,
  portrait
}`;

export const servicesContentQuery = /* groq */ `*[_type == "servicesContent"][0]`;

export const servicesQuery = /* groq */ `*[_type == "service"] | order(menuSection asc, order asc)`;

export const galleryContentQuery = /* groq */ `*[_type == "galleryContent"][0]`;

export const galleryImagesQuery = /* groq */ `*[_type == "galleryImage"] | order(order asc){
  ...,
  image{
    ...,
    "dimensions": asset->metadata.dimensions
  }
}`;

export const featuredGalleryImagesQuery = /* groq */ `*[_type == "galleryImage" && featured == true] | order(order asc){
  ...,
  image
}`;

export const instagramContentQuery = /* groq */ `*[_type == "instagramContent"][0]`;

export const voicesContentQuery = /* groq */ `*[_type == "voicesContent"][0]`;

export const testimonialsQuery = /* groq */ `*[_type == "testimonial"] | order(order asc)`;

export const faqContentQuery = /* groq */ `*[_type == "faqContent"][0]`;

export const faqsQuery = /* groq */ `*[_type == "faq"] | order(order asc)`;

export const contactContentQuery = /* groq */ `*[_type == "contactContent"][0]`;
