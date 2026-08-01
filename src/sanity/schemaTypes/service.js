/**
 * A single line item on the VA Braids menu.
 * Pricing can be flat, tiered by size (S/M/L), or "upon request" —
 * only fill in the fields that apply to a given service.
 * @returns {{ _id: string, name: string, menuSection: string,
 *   priceType: string, price: number, priceTiers: Array<{label: string, price: number}>,
 *   priceNote: string, addOnNote: string, status: string, order: number }}
 */
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Single Braids (Natural)", "4 Braids", "Sleek Ponytail w/ Extension"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menuSection',
      title: 'Menu Section',
      type: 'string',
      options: {
        list: [
          { title: 'Wash & Prep', value: 'wash-prep' },
          { title: 'Braids', value: 'braids' },
          { title: 'Single Braids & Twists', value: 'single-braids-twists' },
          { title: 'Ponytails', value: 'ponytails' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      options: {
        list: [
          { title: 'Flat price', value: 'flat' },
          { title: 'Sized tiers (S/M/L)', value: 'tiered' },
          { title: 'Upon request / custom quote', value: 'request' },
        ],
        layout: 'radio',
      },
      initialValue: 'flat',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Base price in USD. Only used when Price Type is "Flat price".',
      hidden: ({ parent }) => parent?.priceType !== 'flat',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.priceType === 'flat' && (value === undefined || value === null)) {
            return 'Required when Price Type is "Flat price"';
          }
          return true;
        }),
    },
    {
      name: 'priceTiers',
      title: 'Price Tiers',
      type: 'array',
      description: 'e.g. S $140, M $120, L $95. Only used when Price Type is "Sized tiers".',
      hidden: ({ parent }) => parent?.priceType !== 'tiered',
      of: [
        {
          type: 'object',
          name: 'priceTier',
          fields: [
            { name: 'label', title: 'Label', type: 'string', description: 'e.g. "S", "M", "L"' },
            { name: 'price', title: 'Price', type: 'number' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'price' },
            prepare({ title, subtitle }) {
              return { title: `${title} — $${subtitle}` };
            },
          },
        },
      ],
    },
    {
      name: 'priceNote',
      title: 'Price Note / Override',
      type: 'string',
      description:
        'Free-text override shown instead of a number, e.g. "Upon request", "from $95", "hair not incl."',
    },
    {
      name: 'addOnNote',
      title: 'Add-on Note',
      type: 'string',
      description: 'Optional extra cost note shown next to the name, e.g. "+ ext $65", "+ bang $15"',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Coming Soon', value: 'comingSoon' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first within a menu section.',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Menu Section, then Order',
      name: 'sectionOrder',
      by: [
        { field: 'menuSection', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'menuSection', status: 'status' },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: status === 'comingSoon' ? `${subtitle} — Coming Soon` : subtitle,
      };
    },
  },
};