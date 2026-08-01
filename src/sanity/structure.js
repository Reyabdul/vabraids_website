// https://www.sanity.io/docs/structure-builder-cheat-sheet

const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings' },
  { id: 'splashContent', title: 'Splash / Intro' },
  { id: 'heroContent', title: 'Hero Section' },
  { id: 'aboutContent', title: 'About / Stylist Section' },
  { id: 'servicesContent', title: 'Services / Menu Section' },
  { id: 'galleryContent', title: 'Gallery Section' },
  { id: 'instagramContent', title: 'Instagram Section' },
  { id: 'voicesContent', title: 'Voices Section' },
  { id: 'faqContent', title: 'FAQ Section' },
  { id: 'contactContent', title: 'Contact Section' },
]

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Section content — always the same one document per type,
      // no "create new" / duplicate. Ordered to match page scroll order.
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      // Collections: Service, Gallery Image, FAQ, Testimonial
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.some((s) => s.id === item.getId())
      ),
    ])