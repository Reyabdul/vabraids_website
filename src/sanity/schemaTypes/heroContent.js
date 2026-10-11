/**
 * Singleton document for the Hero section (first full-screen panel
 * after the splash intro).
 */
export default {
  name: 'heroContent',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'backgroundVideo',
      title: 'Hero Video',
      type: 'file',
      description:
        'Portrait (9:16) MP4, H.264, no sound, ideally under 8 MB. Plays silently on a loop beside the headline (full-screen on phones).',
      options: { accept: 'video/mp4' },
    },
    {
      name: 'backgroundImage',
      title: 'Poster / Fallback Image',
      type: 'image',
      description:
        'Shown while the video loads, and instead of it for visitors who have reduced motion turned on. A still frame from the video works best.',
      options: { hotspot: true },
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Protective styling · Toronto"',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Braiding, elevated."',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'viewServicesLabel',
      title: 'Secondary Link Label',
      type: 'string',
      description: 'e.g. "View services"',
      initialValue: 'View services',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Hero Section' };
    },
  },
};