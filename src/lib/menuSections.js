/**
 * Menu section grouping, in display order. Shared between the Services
 * section (full menu) and the contact form's service-select modal
 * (bookable services only — see `BOOKABLE_MENU_SECTION_ORDER` below).
 * `labelKey` looks up the CMS-provided label in `servicesContent.menuSectionLabels`.
 */
export const MENU_SECTION_ORDER = [
  { value: 'wash-prep', labelKey: 'washPrep' },
  { value: 'braids', labelKey: 'braids' },
  { value: 'single-braids-twists', labelKey: 'singleBraidsTwists' },
  { value: 'ponytails', labelKey: 'ponytails' },
  { value: 'coming-soon', labelKey: 'comingSoon' },
];

// Same list minus "Coming Soon" — those services aren't offered yet, so
// clients shouldn't be able to request them through the inquiry form.
export const BOOKABLE_MENU_SECTION_ORDER = MENU_SECTION_ORDER.filter(
  (section) => section.value !== 'coming-soon'
);
