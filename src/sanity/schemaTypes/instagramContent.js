/**
 * Singleton document for the Instagram section.
 * The handle itself lives in siteSettings and is reused here.
 */
export default {
  name: 'instagramContent',
  title: 'Instagram Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Latest Posts"',
    },
    {
      name: 'followCtaLabel',
      title: 'Follow Button Label',
      type: 'string',
      description: 'e.g. "Follow on Instagram →"',
      initialValue: 'Follow on Instagram →',
    },
    {
      name: 'embedCode',
      title: 'Reels Embed Code',
      type: 'text',
      rows: 6,
      description:
        'Paste the full embed snippet (script + div) from a Reels widget provider ' +
        '(e.g. EmbedSocial, Tagembed) connected to the client’s Instagram account, so new ' +
        'Reels she posts show up here automatically. Leave empty to show placeholder squares.',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Instagram Section' };
    },
  },
};