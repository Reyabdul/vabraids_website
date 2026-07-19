/**
 * Singleton document for all Home page copy: the stylist/about section,
 * the menu section heading + intro text + section labels, the gallery
 * preview section, and the Instagram section.
 */
export default {
  name: 'homeContent',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'stylist', title: 'Stylist Section' },
    { name: 'menu', title: 'Menu Section' },
    { name: 'galleryPreview', title: 'Gallery Preview' },
    { name: 'instagram', title: 'Instagram Section' },
  ],
  fields: [
    // --- Stylist / About ---
    {
      name: 'stylistPortrait',
      title: 'Stylist Portrait',
      type: 'image',
      options: { hotspot: true },
      group: 'stylist',
    },
    {
      name: 'stylistSectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'e.g. "The Stylist"',
      group: 'stylist',
    },
    {
      name: 'stylistHeadline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Hands that hold the tradition."',
      group: 'stylist',
    },
    {
      name: 'stylistBio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text, one block per paragraph.',
      group: 'stylist',
    },

    // --- Menu Section ---
    {
      name: 'menuHeading',
      title: 'Menu Heading',
      type: 'string',
      description: 'e.g. "The Menu"',
      initialValue: 'The Menu',
      group: 'menu',
    },
    {
      name: 'menuIntroText',
      title: 'Menu Intro Text',
      type: 'string',
      description:
        'e.g. "Prices reflect studio rates. Select services also bookable at The Re-Up Hub. A deposit secures your appointment."',
      group: 'menu',
    },
    {
      name: 'menuSectionLabels',
      title: 'Menu Section Labels',
      type: 'object',
      description:
        'Display label for each menu section. Keys correspond to the menuSection values on the Service schema.',
      group: 'menu',
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
    {
      name: 'hairDisclaimerNote',
      title: 'Hair Disclaimer Prefix Label',
      type: 'string',
      description:
        'Optional short label shown before the global hair disclaimer text on this page, e.g. "Please note:"',
      group: 'menu',
    },

    // --- Gallery Preview ---
    {
      name: 'galleryPreviewHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'e.g. "Gallery"',
      initialValue: 'Gallery',
      group: 'galleryPreview',
    },
    {
      name: 'galleryPreviewCtaLabel',
      title: 'View Full Gallery Button Label',
      type: 'string',
      initialValue: 'View Full Gallery',
      group: 'galleryPreview',
    },

    // --- Instagram Section ---
    {
      name: 'instagramHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'e.g. "Follow Along"',
      group: 'instagram',
    },
    {
      name: 'instagramCtaLabel',
      title: 'Follow Button Label',
      type: 'string',
      description: 'e.g. "Follow on Instagram"',
      group: 'instagram',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
};
