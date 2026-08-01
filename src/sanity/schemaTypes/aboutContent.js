/**
 * Singleton document for the About/Stylist section.
 */
export default {
  name: 'aboutContent',
  title: 'About / Stylist Section',
  type: 'document',
  fields: [
    {
      name: 'portrait',
      title: 'Stylist Portrait',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "The Stylist"',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Hands that hold the tradition."',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text, one block per paragraph.',
    },
    {
      name: 'partnershipLabel',
      title: 'Partnership Label',
      type: 'string',
      description: 'e.g. "In partnership with"',
    },
    {
      name: 'partnershipName',
      title: 'Partnership Name',
      type: 'string',
      description: 'e.g. "The Re-Up Hub"',
    },
  ],
  preview: {
    prepare() {
      return { title: 'About / Stylist Section' };
    },
  },
};