/**
 * Singleton document for the Gallery preview section and the
 * full-gallery overlay it opens into.
 */
export default {
  name: 'galleryContent',
  title: 'Gallery Section',
  type: 'document',
  groups: [
    { name: 'preview', title: 'Preview Section' },
    { name: 'overlay', title: 'Full Gallery Overlay' },
  ],
  fields: [
    // --- Preview section ---
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "The Work"',
      group: 'preview',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Gallery"',
      initialValue: 'Gallery',
      group: 'preview',
    },
    {
      name: 'viewFullGalleryLabel',
      title: '"Full Gallery" Button Label',
      type: 'string',
      initialValue: 'Full Gallery →',
      group: 'preview',
    },

    // --- Full gallery overlay ---
    {
      name: 'overlayHeading',
      title: 'Overlay Heading',
      type: 'string',
      description: 'e.g. "Full Gallery"',
      initialValue: 'Full Gallery',
      group: 'overlay',
    },
    {
      name: 'closeLabel',
      title: 'Close Button Label',
      type: 'string',
      initialValue: 'Close ✕',
      group: 'overlay',
    },
    {
      name: 'filterLabels',
      title: 'Category Filter Labels',
      type: 'object',
      description: 'Display labels for the gallery filter tabs.',
      group: 'overlay',
      fields: [
        { name: 'all', title: 'All Label', type: 'string', initialValue: 'All' },
        { name: 'braids', title: 'Braids Label', type: 'string', initialValue: 'Braids' },
        { name: 'twists', title: 'Twists Label', type: 'string', initialValue: 'Twists' },
        { name: 'ponytails', title: 'Ponytails Label', type: 'string', initialValue: 'Ponytails' },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Gallery Section' };
    },
  },
};