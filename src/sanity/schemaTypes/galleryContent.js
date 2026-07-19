/**
 * Singleton document for the full Gallery page copy.
 */
export default {
  name: 'galleryContent',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    {
      name: 'pageHeading',
      title: 'Page Heading',
      type: 'string',
      initialValue: 'Gallery',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageIntroText',
      title: 'Page Intro Text',
      type: 'string',
      description: 'Optional short line under the heading.',
    },
    {
      name: 'filterAllLabel',
      title: '"Show All" Filter Label',
      type: 'string',
      initialValue: 'All',
    },
    {
      name: 'emptyStateText',
      title: 'Empty State Text',
      type: 'string',
      description: 'Shown when a filter returns no images.',
      initialValue: 'No photos found for this filter yet.',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Gallery Page' };
    },
  },
};
