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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
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