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
    { name: 'flow', title: 'Conversational Flow' },
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

    // --- Conversational Flow ---
    // The form starts as a single line; clicking it opens a "what do you
    // need?" picker, and the answers picked there decide which of the
    // fields below actually get asked (see buildSteps in InquiryForm.jsx).
    // Those fields then appear one by one as each is filled in.
    {
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      description: 'Small label above the inquiry form itself, so it\'s clear what the box is for.',
      initialValue: 'Inquiry',
      group: 'flow',
    },
    {
      name: 'startPrompt',
      title: 'Start Prompt',
      type: 'string',
      description:
        'The single line shown before any inquiry fields — keep it warm and conversational, ' +
        'e.g. "Hey! What can I help you with?" rather than clipped/formal. ' +
        'Clicking it opens the category picker — also used as that modal\'s heading.',
      initialValue: 'Hey! What can I help you with?',
      group: 'flow',
    },
    {
      name: 'resetLabel',
      title: 'Reset / Start Over Link Label',
      type: 'string',
      description:
        'Shown below the fields while the required ones (name/email/message) aren\'t all filled ' +
        'in yet, to clear everything and begin again.',
      initialValue: 'Start over',
      group: 'flow',
    },
    {
      name: 'cancelLabel',
      title: 'Cancel Button Label',
      type: 'string',
      description:
        'Replaces the Start Over link once every required field is filled in — shown next to ' +
        'the Send button. Clicking it clears everything, same as Start Over.',
      initialValue: 'Cancel',
      group: 'flow',
    },
    {
      name: 'continueLabel',
      title: 'Step "Continue" Link Label',
      type: 'string',
      description: 'No longer used — fields now appear on their own as each one is filled in.',
      initialValue: 'Continue →',
      // Kept (hidden) rather than deleted so the value already saved on the
      // document doesn't show up in Studio as an unknown field.
      hidden: true,
      group: 'flow',
    },
    {
      name: 'categoryModalDoneLabel',
      title: 'Category Modal "Done" Button Label',
      type: 'string',
      initialValue: 'Done',
      group: 'flow',
    },
    {
      name: 'categoryModalClearLabel',
      title: 'Category Modal "Clear" Button Label',
      type: 'string',
      initialValue: 'Clear',
      group: 'flow',
    },
    {
      name: 'categoryRequiredError',
      title: 'Category Required — Error Message',
      type: 'string',
      description:
        'Shown in the category picker when "Done" is pressed with nothing selected. ' +
        'At least one reason is required so every inquiry arrives with a subject.',
      initialValue: "Please choose at least one option — you can't continue until one is selected.",
      group: 'flow',
    },
    {
      name: 'categoryBookingLabel',
      title: 'Category — "Booking" Label',
      type: 'string',
      initialValue: 'Booking',
      group: 'flow',
    },
    {
      name: 'categoryServiceLabel',
      title: 'Category — "Service Inquiry" Label',
      type: 'string',
      initialValue: 'Service Inquiry',
      group: 'flow',
    },
    {
      name: 'categoryTestimonialLabel',
      title: 'Category — "Leave a Testimonial" Label',
      type: 'string',
      initialValue: 'Leave a Testimonial',
      group: 'flow',
    },
    {
      name: 'categoryOtherLabel',
      title: 'Category — "Other" Label',
      type: 'string',
      initialValue: 'Other',
      group: 'flow',
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
      description: 'Also used as the heading of the service-select modal this field opens.',
      initialValue: "Service you're interested in",
      group: 'form',
    },
    {
      name: 'serviceRequiredError',
      title: 'Service Required — Error Message',
      type: 'string',
      description:
        'Shown under the service field when the picker is closed (or Send is attempted) with nothing ' +
        'selected. The rest of the form stays locked until at least one service is picked.',
      initialValue: "Please choose at least one service — you can't continue until one is selected.",
      group: 'form',
    },
    {
      name: 'serviceModalDoneLabel',
      title: 'Service Modal "Done" Button Label',
      type: 'string',
      initialValue: 'Done',
      group: 'form',
    },
    {
      name: 'serviceModalClearLabel',
      title: 'Service Modal "Clear" Button Label',
      type: 'string',
      initialValue: 'Clear',
      group: 'form',
    },
    {
      name: 'timeSlotFieldPlaceholder',
      title: 'Time Slot Field Placeholder',
      type: 'string',
      description:
        'Keep it short — also used as the heading of the time-slot modal this field opens. ' +
        'Should hint at the 3-slot cap, e.g. "Time slot (max. 3)".',
      initialValue: 'Time slot (max. 3)',
      group: 'form',
    },
    {
      name: 'timeSlotAddLabel',
      title: '"+" Button Accessible Label',
      type: 'string',
      description:
        'Not shown as text — the button next to the time-slot field only shows a "+". ' +
        'This is its screen-reader label.',
      initialValue: 'Add another time slot',
      group: 'form',
    },
    {
      name: 'timeSlotModalDoneLabel',
      title: 'Time Slot Modal "Done" Button Label',
      type: 'string',
      initialValue: 'Done',
      group: 'form',
    },
    {
      name: 'timeSlotModalClearLabel',
      title: 'Time Slot Modal "Clear" Button Label',
      type: 'string',
      initialValue: 'Clear',
      group: 'form',
    },
    {
      name: 'timeSlotStartHour',
      title: 'Time Slot Range — Start Hour',
      type: 'number',
      description: '24h clock, e.g. 9 for 9:00 AM. Controls the earliest time option shown in the time-slot picker.',
      initialValue: 9,
      validation: (Rule) => Rule.min(0).max(23),
      group: 'form',
    },
    {
      name: 'timeSlotEndHour',
      title: 'Time Slot Range — End Hour',
      type: 'number',
      description: '24h clock, e.g. 18 for 6:00 PM. Controls the latest time option shown in the time-slot picker.',
      initialValue: 18,
      validation: (Rule) => Rule.min(1).max(24),
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