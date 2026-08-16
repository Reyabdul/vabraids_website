import PropTypes from 'prop-types';
import { ServiceRow } from './ServiceRow';

/**
 * One menu subsection (e.g. "Braids") — a label and its line items.
 */
export function ServiceMenuGroup({ label, services }) {
  return (
    <div className="break-inside-avoid mb-10">
      <div className="text-[11px] tracking-[.28em] uppercase text-muted pb-3.5 mb-1.5 border-b border-ink/22">
        {label}
      </div>
      {services.map((service) => (
        <ServiceRow key={service._id} service={service} />
      ))}
    </div>
  );
}

ServiceMenuGroup.propTypes = {
  label: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};
