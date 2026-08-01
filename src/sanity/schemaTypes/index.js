// Reference version of src/sanity/schemaTypes/index.ts
// Merge the imports and `types` array below into your existing file —
// keep whatever export shape (`schema` object) your file already uses.

import siteSettings from './siteSettings'
import splashContent from './splashContent'
import heroContent from './heroContent'
import aboutContent from './aboutContent'
import servicesContent from './servicesContent'
import galleryContent from './galleryContent'
import instagramContent from './instagramContent'
import voicesContent from './voicesContent'
import faqContent from './faqContent'
import contactContent from './contactContent'
import service from './service'
import galleryImage from './galleryImage'
import faq from './faq'
import testimonial from './testimonial'

export const schema = {
  types: [
    // Section content singletons
    siteSettings,
    splashContent,
    heroContent,
    aboutContent,
    servicesContent,
    galleryContent,
    instagramContent,
    voicesContent,
    faqContent,
    contactContent,
    // Collections
    service,
    galleryImage,
    faq,
    testimonial,
  ],
}