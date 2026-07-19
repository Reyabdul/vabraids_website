/**
 * A single gallery photo, tagged by style (required) and client type
 * (optional) to power the Gallery page filter.
 * @returns {{ _id: string, image: object, alt: string,
 *   style: string, clientType: string, featured: boolean }}
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
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'Matches the gallery filter tiles on the design.',
      options: {
        list: [
          { title: 'Knotless Braids', value: 'knotless-braids' },
          { title: 'Rope Twists', value: 'rope-twists' },
          { title: 'Custom Braids', value: 'custom-braids' },
          { title: 'Sleek Ponytail', value: 'sleek-ponytail' },
          { title: 'Feed-in Box Braids', value: 'feed-in-box-braids' },
          { title: 'Passion Twists', value: 'passion-twists' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
      description: 'Optional — used only if/when the gallery adds a client-type filter.',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Kids', value: 'kids' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured on Home',
      type: 'boolean',
      description: 'Include this image in the Home page mini gallery preview.',
      initialValue: false,
    },
    {
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'uploadedDesc',
      by: [{ field: 'uploadedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'style', subtitle: 'clientType', media: 'image' },
  },
};
