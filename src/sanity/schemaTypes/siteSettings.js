/**
 * Singleton document for global, cross-section copy — the fixed header
 * nav, fixed footer, and anything reused in more than one section
 * (booking CTA label appears in header, hero, and contact).
 *
 * Tabs are grouped by where a field shows up on the page, and every
 * description says where that is, so an editor can find a piece of text
 * by looking at the site.
 */
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Business Name & Tagline' },
    { name: 'navigation', title: 'Header Menu' },
    { name: 'booking', title: 'Booking Button' },
    { name: 'instagram', title: 'Instagram' },
    { name: 'footer', title: 'Footer' },
    { name: 'legal', title: 'Hair Disclaimer' },
    { name: 'inquiryEmail', title: 'Inquiry Form Email' },
    { name: 'seo', title: 'SEO & Sharing' },
  ],
  fields: [
    // --- Business Name & Tagline ---
    {
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      description:
        'Shown as the logo text at the top left of every screen, and large on the intro screen visitors see first.',
      initialValue: 'VA Braids',
      group: 'brand',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small line shown with the business name on the intro screen only, e.g. "Est. Toronto".',
      group: 'brand',
    },

    // --- Header Menu ---
    // The menu links only show on wide screens (laptops/desktops); phones
    // and tablets show just the business name and the booking button.
    {
      name: 'navStudioLabel',
      title: 'About Link Label',
      type: 'string',
      description:
        'Top menu link that scrolls to the About / Stylist section. Menu links show on laptop and desktop screens only.',
      initialValue: 'Studio',
      group: 'navigation',
    },
    {
      name: 'navServicesLabel',
      title: 'Services Link Label',
      type: 'string',
      description: 'Top menu link that scrolls to the Services / Menu section.',
      initialValue: 'Services',
      group: 'navigation',
    },
    {
      name: 'navGalleryLabel',
      title: 'Gallery Link Label',
      type: 'string',
      description: 'Top menu link that scrolls to the Gallery section.',
      initialValue: 'Gallery',
      group: 'navigation',
    },
    {
      name: 'navFaqLabel',
      title: 'FAQ Link Label',
      type: 'string',
      description: 'Top menu link that scrolls to the FAQ section.',
      initialValue: 'FAQ',
      group: 'navigation',
    },
    {
      name: 'navContactLabel',
      title: 'Contact Link Label',
      type: 'string',
      description: 'Top menu link that scrolls to the Contact section.',
      initialValue: 'Contact',
      group: 'navigation',
    },

    // --- Booking Button ---
    {
      name: 'bookingCtaLabel',
      title: 'Booking Button Label',
      type: 'string',
      description:
        'Text on the booking button, e.g. "Book on Re-Up ↗". The same button appears in three places: the top right of the header, the hero (first screen), and the Contact section.',
      initialValue: 'Book on Re-Up ↗',
      group: 'booking',
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description:
        'Where the booking button goes (the Squire booking page). Used by all three booking buttons — if this is empty, the buttons disappear.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      group: 'booking',
    },
    {
      name: 'bookingPlatformName',
      title: 'Booking Platform Name',
      type: 'string',
      description: 'Not shown anywhere on the site.',
      // Kept (hidden) rather than deleted so the value already saved on the
      // document doesn't show up in Studio as an unknown field.
      hidden: true,
      group: 'booking',
    },

    // --- Instagram ---
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description:
        'Account name without the @ symbol, e.g. "va.braidedit". Shown as the big heading of the Instagram section, in the footer bar, and at the bottom of the Full Gallery. It also sets where every Instagram link on the site goes.',
      validation: (Rule) => Rule.required(),
      group: 'instagram',
    },

    // --- Footer ---
    {
      name: 'footerCopyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Left side of the thin bar that slides up at the bottom of the page, e.g. "VA Braids © 2026".',
      group: 'footer',
    },
    {
      name: 'studioAddress',
      title: 'Studio Address',
      type: 'string',
      description:
        'Middle of the footer bar, e.g. "The Re-Up Hub · North York, Toronto". Hidden on phones to save space.',
      group: 'footer',
    },

    // --- Hair Disclaimer ---
    {
      name: 'hairDisclaimer',
      title: 'Hair Disclaimer',
      type: 'text',
      rows: 3,
      description:
        'Required note about whether hair/extensions are supplied. Shown in two places: under the price list in the Services / Menu section, and in the Contact section.',
      validation: (Rule) => Rule.required(),
      group: 'legal',
    },

    // --- Inquiry Form Email ---
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description:
        'Inquiries from the contact form will be sent to this address. Not active yet — the form does not send email until delivery is set up. Not shown on the page.',
      validation: (Rule) => Rule.required().email(),
      group: 'inquiryEmail',
    },

    // --- SEO & Sharing ---
    {
      name: 'seoTitle',
      title: 'Page Title',
      type: 'string',
      description:
        'Shown in the browser tab, in Google results, and as the title of link previews. Aim for under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Longer titles get cut off in Google results.'),
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      description:
        'The short summary under the title in Google results and link previews. Aim for under 160 characters.',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions get cut off in Google results.'),
      group: 'seo',
    },
    {
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      description:
        'The picture shown when the site link is shared (iMessage, WhatsApp, Instagram DMs). Landscape works best — it is cropped to 1200 × 630.',
      options: { hotspot: true },
      group: 'seo',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};