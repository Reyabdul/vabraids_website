/**
 * Singleton document for the Instagram section.
 * The handle itself lives in siteSettings and is reused here.
 */
export default {
  name: 'instagramContent',
  title: 'Instagram Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Latest Posts"',
    },
    {
      name: 'followCtaLabel',
      title: 'Follow Button Label',
      type: 'string',
      description: 'e.g. "Follow on Instagram →"',
      initialValue: 'Follow on Instagram →',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Instagram Section' };
    },
  },
};