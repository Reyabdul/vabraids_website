/**
 * Singleton document for the Services/Menu section copy.
 * Actual menu items live in the `service` collection type —
 * this doc only holds the section chrome text.
 */
export default {
  name: 'servicesContent',
  title: 'Services / Menu Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Services & Pricing"',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "The Menu"',
      initialValue: 'The Menu',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'string',
      description:
        'e.g. "Prices reflect studio rates. Select services are also bookable at The Re-Up Hub. A deposit secures your appointment."',
    },
    {
      name: 'menuSectionLabels',
      title: 'Menu Section Labels',
      type: 'object',
      description:
        'Display label for each menu section. Keys correspond to menuSection values on the Service schema.',
      fields: [
        { name: 'washPrep', title: 'Wash & Prep Label', type: 'string', initialValue: 'Wash & Prep' },
        { name: 'braids', title: 'Braids Label', type: 'string', initialValue: 'Braids' },
        {
          name: 'singleBraidsTwists',
          title: 'Single Braids & Twists Label',
          type: 'string',
          initialValue: 'Single Braids & Twists',
        },
        { name: 'ponytails', title: 'Ponytails Label', type: 'string', initialValue: 'Ponytails' },
        { name: 'comingSoon', title: 'Coming Soon Label', type: 'string', initialValue: 'Coming Soon' },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Services / Menu Section' };
    },
  },
};