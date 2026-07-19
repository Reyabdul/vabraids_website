/**
 * Singleton document for the Contact page: the primary Re-Up booking CTA,
 * the secondary email inquiry form (all field labels), and the FAQ
 * section heading. Booking flow priority: Re-Up first, email form second —
 * keep this doc's field grouping/order reflecting that on the frontend.
 */
export default {
  name: 'contactContent',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Page Intro' },
    { name: 'primaryCta', title: 'Primary CTA (Re-Up)' },
    { name: 'form', title: 'Inquiry Form' },
    { name: 'faq', title: 'FAQ Section' },
  ],
  fields: [
    // --- Page Intro ---
    {
      name: 'pageHeading',
      title: 'Page Heading',
      type: 'string',
      description: 'e.g. "Book & Inquire"',
      initialValue: 'Book & Inquire',
      group: 'intro',
    },
    {
      name: 'pageIntroText',
      title: 'Page Intro Text',
      type: 'string',
      group: 'intro',
    },
    {
      name: 'hairDisclaimerNote',
      title: 'Hair Disclaimer Prefix Label',
      type: 'string',
      description:
        'Optional short label shown before the global hair disclaimer text on this page, e.g. "Please note:"',
      group: 'intro',
    },

    // --- Primary CTA ---
    {
      name: 'bookingCtaLabel',
      title: 'Booking Button Label',
      type: 'string',
      description: 'e.g. "Book Now"',
      initialValue: 'Book Now',
      group: 'primaryCta',
    },
    {
      name: 'bookingCtaSubtext',
      title: 'Booking Button Subtext',
      type: 'string',
      description: 'Optional small line under the button, e.g. "via Squire"',
      group: 'primaryCta',
    },

    // --- Inquiry Form ---
    {
      name: 'inquiryHeading',
      title: 'Inquiry Section Heading',
      type: 'string',
      description: 'e.g. "Can\'t find your date? Send an inquiry"',
      group: 'form',
    },
    {
      name: 'nameFieldLabel',
      title: 'Name Field Label',
      type: 'string',
      initialValue: 'Name',
      group: 'form',
    },
    {
      name: 'emailFieldLabel',
      title: 'Email Field Label',
      type: 'string',
      initialValue: 'Email',
      group: 'form',
    },
    {
      name: 'phoneFieldLabel',
      title: 'Phone Field Label',
      type: 'string',
      initialValue: 'Phone',
      group: 'form',
    },
    {
      name: 'serviceFieldLabel',
      title: 'Service Checkboxes Label',
      type: 'string',
      description: 'Label above the service-interest checkbox group.',
      initialValue: 'Which service(s) are you interested in?',
      group: 'form',
    },
    {
      name: 'messageFieldLabel',
      title: 'Message Field Label',
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
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: "Thanks — we'll get back to you soon.",
      group: 'form',
    },
    {
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      initialValue: 'Something went wrong. Please try again.',
      group: 'form',
    },

    // --- FAQ Section ---
    {
      name: 'faqHeading',
      title: 'FAQ Section Heading',
      type: 'string',
      description: 'e.g. "Questions"',
      initialValue: 'Questions',
      group: 'faq',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' };
    },
  },
};
