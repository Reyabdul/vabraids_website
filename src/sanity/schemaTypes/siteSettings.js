/**
 * Singleton document for global, cross-section copy — the fixed header
 * nav, fixed footer, and anything reused in more than one section
 * (booking CTA label appears in header, hero, and contact).
 */
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'navigation', title: 'Header Nav' },
    { name: 'footer', title: 'Footer' },
    { name: 'booking', title: 'Booking & Contact' },
    { name: 'legal', title: 'Disclosures' },
  ],
  fields: [
    // --- Brand ---
    {
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'VA Braids',
      group: 'brand',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Est. Toronto"',
      group: 'brand',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol, used across nav/instagram/footer.',
      validation: (Rule) => Rule.required(),
      group: 'brand',
    },

    // --- Header Nav ---
    {
      name: 'navStudioLabel',
      title: '"Studio" (About) Link Label',
      type: 'string',
      initialValue: 'Studio',
      group: 'navigation',
    },
    {
      name: 'navServicesLabel',
      title: 'Services Link Label',
      type: 'string',
      initialValue: 'Services',
      group: 'navigation',
    },
    {
      name: 'navGalleryLabel',
      title: 'Gallery Link Label',
      type: 'string',
      initialValue: 'Gallery',
      group: 'navigation',
    },
    {
      name: 'navInstagramLabel',
      title: 'Instagram Link Label',
      type: 'string',
      initialValue: 'Instagram',
      group: 'navigation',
    },
    {
      name: 'navContactLabel',
      title: 'Contact Link Label',
      type: 'string',
      initialValue: 'Contact',
      group: 'navigation',
    },
    {
      name: 'bookingCtaLabel',
      title: 'Booking Button Label',
      type: 'string',
      description: 'Reused in header, hero, and contact section, e.g. "Book on Re-Up ↗"',
      initialValue: 'Book on Re-Up ↗',
      group: 'navigation',
    },

    // --- Footer ---
    {
      name: 'footerCopyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g. "VA Braids © 2026"',
      group: 'footer',
    },
    {
      name: 'studioAddress',
      title: 'Studio Address',
      type: 'string',
      description: 'e.g. "The Re-Up Hub · North York, Toronto"',
      group: 'footer',
    },

    // --- Booking & Contact ---
    {
      name: 'bookingPlatformName',
      title: 'Booking Platform Name',
      type: 'string',
      description: 'e.g. "The Re-Up Hub"',
      group: 'booking',
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'External booking flow (Squire), used by every "Book on Re-Up" CTA.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      group: 'booking',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Destination for the inquiry form.',
      validation: (Rule) => Rule.required().email(),
      group: 'booking',
    },

    // --- Disclosures ---
    {
      name: 'hairDisclaimer',
      title: 'Hair Disclaimer',
      type: 'text',
      rows: 3,
      description:
        'Required copy stating VA Braids does not supply/add hair by default.',
      validation: (Rule) => Rule.required(),
      group: 'legal',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};