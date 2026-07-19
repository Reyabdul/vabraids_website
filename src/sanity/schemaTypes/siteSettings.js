/**
 * Singleton document holding global, cross-page copy and links —
 * anything that appears in more than one page (nav, footer, disclosures).
 * Page-specific copy lives in splashContent / homeContent / galleryContent /
 * contactContent instead, so this doc doesn't become a dumping ground.
 */
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'navigation', title: 'Navigation' },
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Protective Styling & Braiding Studio · Toronto"',
      group: 'brand',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
      validation: (Rule) => Rule.required(),
      group: 'brand',
    },

    // --- Navigation ---
    {
      name: 'navHomeLabel',
      title: 'Home Link Label',
      type: 'string',
      initialValue: 'Home',
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
      name: 'navContactLabel',
      title: 'Contact Link Label',
      type: 'string',
      initialValue: 'Contact',
      group: 'navigation',
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Optional small copyright/footer line.',
      group: 'navigation',
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
      description: 'Primary CTA link — external booking flow (e.g. Squire).',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      group: 'booking',
    },
    {
      name: 'studioAddress',
      title: 'Studio Address',
      type: 'string',
      description: 'e.g. "The Re-Up Hub · North York, Toronto"',
      group: 'booking',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Destination for the after-hours email inquiry form.',
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
        'Required copy stating VA Braids does not supply/add hair by default. Rendered on Home (services section) and Contact page.',
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
