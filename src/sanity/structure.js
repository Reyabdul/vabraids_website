// https://www.sanity.io/docs/structure-builder-cheat-sheet

const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings' },
  { id: 'splashContent', title: 'Splash / Intro Page' },
  { id: 'homeContent', title: 'Home Page' },
  { id: 'galleryContent', title: 'Gallery Page' },
  { id: 'contactContent', title: 'Contact Page' },
]

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Page/site content — always the same one document per type,
      // no "create new" / duplicate.
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      // Default list items for every other (collection) schema type
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.some((s) => s.id === item.getId())
      ),
    ])
