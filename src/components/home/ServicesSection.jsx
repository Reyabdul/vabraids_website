import PropTypes from 'prop-types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceMenuGroup } from './ServiceMenuGroup';

const MENU_SECTION_ORDER = [
  { value: 'wash-prep', labelKey: 'washPrep' },
  { value: 'braids', labelKey: 'braids' },
  { value: 'single-braids-twists', labelKey: 'singleBraidsTwists' },
  { value: 'ponytails', labelKey: 'ponytails' },
  { value: 'coming-soon', labelKey: 'comingSoon' },
];

/**
 * The Menu — services grouped by menu section, balanced into columns.
 * Includes the required hair disclaimer (VA Braids does not supply hair).
 */
export function ServicesSection({ content, services = [], hairDisclaimer }) {
  const groups = MENU_SECTION_ORDER.map(({ value, labelKey }) => ({
    label: content?.menuSectionLabels?.[labelKey],
    services: services.filter((s) => s.menuSection === value),
  })).filter((g) => g.services.length > 0);

  return (
    <section
      id="services"
      className="snap-start min-h-screen px-6 md:px-10 py-26 md:py-24"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-13">
          <div>
            <Eyebrow className="mb-5">{content?.eyebrow}</Eyebrow>
            <SectionHeading>{content?.heading}</SectionHeading>
          </div>
          <div className="text-[13px] leading-[1.7] text-muted-2 max-w-[34ch] font-light">
            {content?.introText}
          </div>
        </div>

        <div className="columns-1 md:columns-2 gap-x-18">
          {groups.map((group) => (
            <ServiceMenuGroup key={group.label} label={group.label} services={group.services} />
          ))}
        </div>

        {hairDisclaimer && (
          <p className="text-[13px] leading-[1.7] text-muted-2 font-light max-w-[64ch] mt-10 pt-6 border-t border-ink/10">
            {hairDisclaimer}
          </p>
        )}
      </div>
    </section>
  );
}

ServicesSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string,
    heading: PropTypes.string,
    introText: PropTypes.string,
    menuSectionLabels: PropTypes.object,
  }),
  services: PropTypes.arrayOf(PropTypes.object),
  hairDisclaimer: PropTypes.string,
};
