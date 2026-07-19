/**
 * Singleton document for the Splash/Intro screen — the first thing
 * visitors see before entering the Home page.
 */
export default {
  name: 'splashContent',
  title: 'Splash / Intro Page',
  type: 'document',
  fields: [
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'string',
      description: 'Small eyebrow/intro line above the wordmark, if any.',
    },
    {
      name: 'enterButtonLabel',
      title: 'Enter Button Label',
      type: 'string',
      description: 'e.g. "Enter Site", "View Site"',
      initialValue: 'Enter Site',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return { title: 'Splash / Intro Page' };
    },
  },
};
