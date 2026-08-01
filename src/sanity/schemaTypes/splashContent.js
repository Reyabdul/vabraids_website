/**
 * Singleton document for the intro splash overlay (click/scroll to enter).
 */
export default {
  name: 'splashContent',
  title: 'Splash / Intro',
  type: 'document',
  fields: [
    {
      name: 'scrollPromptLabel',
      title: 'Scroll Prompt Label',
      type: 'string',
      description: 'e.g. "Scroll to enter"',
      initialValue: 'Scroll to enter',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return { title: 'Splash / Intro' };
    },
  },
};