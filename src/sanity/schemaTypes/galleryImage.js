/**
 * A single gallery photo. `category` powers the filter tabs
 * (All / Braids / Twists / Ponytails). `label` is the specific
 * style name shown as a caption/placeholder (e.g. "Knotless braids").
 * @returns {{ _id: string, image: object, alt: string,
 *   label: string, category: string, featured: boolean, order: number }}
 */
export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description:
        'Describe the hairstyle shown (e.g. "Men\'s medium box braids with fade") — not just "photo".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Style Label',
      type: 'string',
      description: 'Specific style name, e.g. "Knotless braids", "Passion twists", "Sleek ponytail".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Matches the gallery filter tabs.',
      options: {
        list: [
          { title: 'Braids', value: 'braids' },
          { title: 'Twists', value: 'twists' },
          { title: 'Ponytails', value: 'ponytails' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured in Preview',
      type: 'boolean',
      description: 'Include in the Gallery section preview grid (first 8 shown).',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'category', media: 'image' },
  },
};