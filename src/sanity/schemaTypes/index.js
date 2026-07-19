// Reference version of src/sanity/schemaTypes/index.ts
// Merge the imports and `types` array below into your existing file —
// keep whatever export shape (`schema` object) your file already uses.

import siteSettings from './siteSettings'
import splashContent from './splashContent'
import homeContent from './homeContent'
import galleryContent from './galleryContent'
import contactContent from './contactContent'
import service from './service'
import galleryImage from './galleryImage'
import faq from './faq'

export const schema = {
  types: [
    siteSettings,
    splashContent,
    homeContent,
    galleryContent,
    contactContent,
    service,
    galleryImage,
    faq,
  ],
}
