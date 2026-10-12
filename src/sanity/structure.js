// https://www.sanity.io/docs/structure-builder-cheat-sheet

// The menu follows the page from top to bottom: one entry per
// section. `content` is the section's singleton document (headings, labels);
// `collection` is the list of items shown in that section, if it has one.
const SECTIONS = [
  { title: 'Intro Screen', content: 'splashContent' },
  { title: 'Hero', content: 'heroContent' },
  { title: 'About', content: 'aboutContent' },
  {
    title: 'Services',
    content: 'servicesContent',
    contentTitle: 'Heading & intro text',
    collection: 'service',
    collectionTitle: 'Menu items & prices',
  },
  {
    title: 'Gallery',
    content: 'galleryContent',
    contentTitle: 'Heading & button text',
    collection: 'galleryImage',
    collectionTitle: 'Photos',
  },
  { title: 'Instagram', content: 'instagramContent' },
  {
    title: 'Testimonials',
    content: 'voicesContent',
    contentTitle: 'Heading',
    collection: 'testimonial',
    collectionTitle: 'Client quotes',
  },
  {
    title: 'FAQ',
    content: 'faqContent',
    contentTitle: 'Heading',
    collection: 'faq',
    collectionTitle: 'Questions & answers',
  },
  { title: 'Contact', content: 'contactContent' },
]

// Singletons — always the same one document per type, no "create new" /
// duplicate.
const singleton = (S, id, title) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(S.document().schemaType(id).documentId(id).title(title))

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Header, Footer & Site Settings'),
      S.divider(),
      ...SECTIONS.map(({ title, content, contentTitle, collection, collectionTitle }) =>
        collection
          ? S.listItem()
              .id(content)
              .title(title)
              .child(
                S.list()
                  .title(title)
                  .items([
                    singleton(S, content, contentTitle),
                    S.documentTypeListItem(collection).title(collectionTitle),
                  ])
              )
          : singleton(S, content, title)
      ),
    ])
