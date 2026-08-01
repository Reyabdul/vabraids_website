/**
 * Singleton document for the Voices/testimonials section heading.
 * The rotating quotes themselves live in the `testimonial` collection.
 */
export default {
  name: 'voicesContent',
  title: 'Voices Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Voices"',
      initialValue: 'Voices',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Voices Section' };
    },
  },
};