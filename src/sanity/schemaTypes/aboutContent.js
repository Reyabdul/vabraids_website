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
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describes the photo for screen readers and search engines, e.g. "Vanessa braiding a client\'s hair in the studio". Defaults to "Portrait of Vanessa" if left empty.',
        },
      ],
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
    {
      name: 'partnershipUrl',
      title: 'Partnership Link',
      type: 'url',
      description: 'Where the partnership name links to. Defaults to https://www.thereuphub.com/ if left empty.',
      initialValue: 'https://www.thereuphub.com/',
    },
  ],
  preview: {
    prepare() {
      return { title: 'About / Stylist Section' };
    },
  },
};