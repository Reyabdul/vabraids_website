/**
 * Singleton document for the FAQ section heading.
 * The actual questions live in the `faq` collection type.
 */
export default {
  name: 'faqContent',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Good to Know"',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Questions"',
      initialValue: 'Questions',
    },
  ],
  preview: {
    prepare() {
      return { title: 'FAQ Section' };
    },
  },
};