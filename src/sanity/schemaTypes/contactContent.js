/**
 * Singleton document for the Contact section: intro copy plus every
 * inquiry form field label and the post-submit "sent" state copy.
 */
export default {
  name: 'contactContent',
  title: 'Contact Section',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Intro' },
    { name: 'form', title: 'Inquiry Form' },
    { name: 'success', title: 'Success State' },
  ],
  fields: [
    // --- Intro ---
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Book & Inquire"',
      group: 'intro',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Ready when you are."',
      group: 'intro',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      description:
        'e.g. "Appointments are booked through The Re-Up Hub on Squire. For custom work, availability, or anything else — send an inquiry and I\'ll reply personally."',
      group: 'intro',
    },

    // --- Inquiry Form ---
    {
      name: 'nameFieldPlaceholder',
      title: 'Name Field Placeholder',
      type: 'string',
      initialValue: 'Name',
      group: 'form',
    },
    {
      name: 'emailFieldPlaceholder',
      title: 'Email Field Placeholder',
      type: 'string',
      initialValue: 'Email',
      group: 'form',
    },
    {
      name: 'phoneFieldPlaceholder',
      title: 'Phone Field Placeholder',
      type: 'string',
      initialValue: 'Phone',
      group: 'form',
    },
    {
      name: 'serviceFieldPlaceholder',
      title: 'Service Field Placeholder',
      type: 'string',
      initialValue: "Service you're interested in",
      group: 'form',
    },
    {
      name: 'messageFieldPlaceholder',
      title: 'Message Field Placeholder',
      type: 'string',
      initialValue: 'Message',
      group: 'form',
    },
    {
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send Inquiry',
      group: 'form',
    },

    // --- Success State ---
    {
      name: 'successHeadline',
      title: 'Success Headline',
      type: 'string',
      initialValue: 'Thank you.',
      group: 'success',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: "Your inquiry is in. I'll be in touch shortly.",
      group: 'success',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Contact Section' };
    },
  },
};