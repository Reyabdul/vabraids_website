/**
 * Photos shipped with the repo in /public/assets, used as a stand-in until
 * the same content exists in Sanity. HomeExperience only falls back to
 * these when the matching Sanity query comes back empty, so anything
 * Vanessa adds in Studio automatically takes over — Sanity stays the
 * source of truth.
 *
 * Each entry mirrors the `galleryImage` document shape (see
 * src/sanity/schemaTypes/galleryImage.js) so the gallery components don't
 * need to know which source they were handed. The one difference is
 * `image`: a local `{ src, dimensions }` instead of a Sanity asset ref,
 * which <SanityImage> knows how to render.
 */

/**
 * @returns {{ _id: string, image: { src: string, dimensions: { width: number, height: number } },
 *   alt: string, label: string, category: string, featured: boolean }}
 */
function photo(file, width, height, category, label, alt, featured = false) {
  return {
    _id: `local-${file}`,
    image: { src: `/assets/${file}`, dimensions: { width, height } },
    alt,
    label,
    category,
    featured,
  };
}

/**
 * Hero poster stand-in — shown behind the hero video until its first
 * frame paints, and instead of it for visitors with reduced motion on.
 * It's a landscape photo cropped into a portrait column, so swap it for
 * a frame grabbed from the video once one has been exported.
 */
export const LOCAL_HERO_IMAGE = {
  src: '/assets/0D5A77C6-8187-45AD-96B9-08134C412247-4965-00000112F0536708_photo.JPG',
  dimensions: { width: 1388, height: 1042 },
};

/** Hero video stand-in (portrait), used until one is uploaded in Studio. */
export const LOCAL_HERO_VIDEO = '/assets/main_vid.MP4';

// Array order is display order. The eight `featured` entries (first in
// the list) fill the Home page preview grid; the overlay shows everything.
export const LOCAL_GALLERY_IMAGES = [
  // --- Featured in the preview grid ---
  photo('218745E9-2FA5-4460-8532-7BC31504AE5A.JPG', 1440, 1509, 'braids', 'Spiral cornrows',
    'Top-down view of cornrows braided in a spiral around the crown', true),
  photo('DA9CB639-B384-41F4-AA55-20BCE8FD697B.JPG', 801, 1068, 'braids', 'Two feed-in braids',
    'Two long feed-in braids with blonde highlights and small accent cornrows at the side', true),
  photo('1644F45F-3CA4-47AC-B56D-003C23060E72.JPEG', 480, 640, 'ponytails', 'Sleek braided ponytail',
    'Profile of a woman with a sleek low ponytail finished in one long thick braid', true),
  photo('3B7E2061-9F93-4CD1-A11C-C8CD3E036AA8.JPG', 1440, 1918, 'braids', 'Wave-part cornrows',
    'Side view of stitch cornrows with curved wave partings', true),
  photo('IMG_2296.jpeg', 480, 640, 'twists', 'Two-strand twists',
    'Top view of short two-strand twists with clean square partings', true),
  photo('77CEFD6B-CC80-4017-83DB-366815927277.JPG', 480, 640, 'braids', 'Long feed-in braids',
    'Back view of waist-length feed-in braids over a green sweater', true),
  photo('7FEA411F-925A-405B-A655-7E46EB8D4A86.JPG', 480, 640, 'braids', 'Stitch braids',
    'Front view of four thick stitch braids going straight back', true),
  photo('IMG_3980.jpeg', 374, 640, 'ponytails', 'Braided high ponytail',
    'Back view of long braids gathered into a high ponytail over a denim jacket', true),

  // --- Braids ---
  photo('0D5A77C6-8187-45AD-96B9-08134C412247-4965-00000112F0536708_photo.JPG', 1388, 1042, 'braids',
    'Freestyle cornrows', 'Close-up of freestyle cornrows in alternating thick and thin braids'),
  photo('25FA7D28-C122-48FF-B904-4594D7D0613C.JPG', 1440, 1918, 'braids', 'Wave-part cornrows',
    'Back view of stitch cornrows with curved wave partings'),
  photo('0E0B236C-6A9A-44A0-A9BA-239B62F6ADC3.JPG', 480, 640, 'braids', 'Freestyle cornrows',
    'Back view of freestyle cornrows braided in looping, crossing curves'),
  photo('FB73CA84-5985-4F49-AE0B-BB58E40B6F0A.JPG', 480, 640, 'braids', 'Swirl cornrows',
    'Back view of freestyle cornrows with swirl designs and star-shaped partings'),
  photo('5480C9C4-F296-4A87-9E27-CDD550442086 (1).JPG', 480, 640, 'braids', 'Swirl cornrows',
    'Top-down view of cornrows with four swirl designs around a centre part'),
  photo('F7617601-0EF4-4407-A0FA-4EE5AC95CBC0.JPG', 480, 640, 'braids', 'Jumbo feed-in braids',
    'Back view of jumbo feed-in braids with smaller braids between them'),
  photo('IMG_2528.jpg', 583, 702, 'braids', 'Straight-back braids',
    'Back view of six thick straight-back braids'),
  photo('IMG_3818.jpg', 1179, 1975, 'braids', 'Straight-back cornrows',
    'Back view of straight-back cornrows over a tapered neckline'),
  photo('IMG_3183.jpeg', 640, 480, 'braids', 'Curved cornrows',
    'Top view of thick cornrows braided in an S-curve pattern'),
  photo('IMG_2630.jpeg', 480, 640, 'braids', 'Two braids',
    'Side view of a man with two long braids and a centre part'),
  photo('IMG_1985.jpeg', 480, 640, 'braids', 'Two braids',
    'Side view of two thick braids with a clean centre part'),
  photo('IMG_1988.jpeg', 480, 640, 'braids', 'Two braids',
    'Top view of two braids showing a straight centre part'),
  photo('IMG_2779.jpeg', 480, 640, 'braids', 'Geometric cornrows',
    'Top-down view of cornrows in a geometric pattern around a centre braid'),
  photo('IMG_2782.jpeg', 480, 640, 'braids', 'Geometric cornrows',
    'Close top-down view of cornrows in a geometric pattern around a centre braid'),
  photo('71131D28-0DA5-4C5A-A533-363197EE75FE-4965-00000111A810D496_photo.JPG', 360, 640, 'braids',
    'Criss-cross cornrows', 'Top view of thick cornrows crossing over each other'),
  photo('5DB2130F-E5F0-4717-8612-8595CCC9FC42-4965-0000010FC608A48B_photo.JPG', 640, 480, 'braids',
    'Curved cornrows', 'Side view of cornrows in sweeping curved lines'),
  photo('IMG_2455.jpeg', 480, 640, 'braids', 'Arched cornrows',
    'Back view of cornrows braided in nested arches'),
  photo('IMG_2458.jpeg', 480, 640, 'braids', 'Zig-zag cornrows',
    'Top view of side-to-side cornrows with zig-zag partings'),
  photo('IMG_0434.jpeg', 360, 640, 'braids', 'Side cornrows with curls',
    'Small cornrows braided back at the side with the rest of the curly hair left out'),
  photo('IMG_3874.jpeg', 480, 640, 'braids', 'Half-up cornrows with cuffs',
    'Child with front cornrows decorated with gold cuffs and curls left out'),
  photo('IMG_2437.jpeg', 480, 640, 'braids', 'Heart cornrows',
    'Child with a heart-shaped cornrow design at the front and curled hair left out'),
  photo('IMG_2442.jpeg', 480, 640, 'braids', 'Heart cornrows',
    'Child seated in a salon chair with a heart-shaped cornrow design and curled hair'),
  photo('IMG_2435.jpeg', 480, 640, 'braids', 'Heart cornrows',
    'Side view of a heart-shaped cornrow design with curled hair left out'),
  photo('IMG_8626.JPEG', 480, 640, 'braids', 'Side cornrows',
    'Child with four cornrows braided back at the side and straight hair left out'),
  photo('IMG_4652.jpg', 1179, 2063, 'braids', 'Kids braids with beads',
    'Profile of a child with cornrows into a low bun and beaded braids at the front'),
  photo('7C4CF15A-0DFD-4EE6-BBE7-E629C9F2D37B.JPG', 480, 640, 'braids', 'Kids braids with beads',
    'Child with cornrows and long front braids finished with pink and white beads'),
  photo('IMG_1976.jpeg', 480, 640, 'braids', 'Braided buns',
    'Back view of a child with thick cornrows finished in two low braided buns'),
  photo('E3E80373-8092-480E-A264-50A6EAE2691B.JPG', 480, 640, 'braids', 'Side-part cornrows',
    'Child with a side part and cornrows braided along the hairline'),
  photo('IMG_2543.jpeg', 480, 640, 'braids', 'Kids cornrows',
    'Side view of a child with two neat cornrows going back'),

  // --- Twists ---
  photo('IMG_2295.jpeg', 480, 640, 'twists', 'Two-strand twists',
    'Smiling child with short two-strand twists'),
  photo('IMG_3532.jpeg', 480, 640, 'twists', 'Flat twists',
    'Profile of a child with flat twists going back, photographed at sunset'),
  photo('IMG_3535.jpeg', 480, 640, 'twists', 'Flat twists',
    'Back view of flat twists with twisted ends, photographed at sunset'),

  // --- Ponytails ---
  photo('IMG_2514.jpeg', 480, 640, 'ponytails', 'Sleek braided ponytail',
    'Smiling woman with a sleek ponytail finished in one long braid over her shoulder'),
  photo('IMG_2516.jpeg', 450, 640, 'ponytails', 'Sleek braided ponytail',
    'Woman with a sleek ponytail finished in one long thick braid down her front'),
];
