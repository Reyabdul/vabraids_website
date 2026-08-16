import PropTypes from 'prop-types';

function formatPrice(service) {
  if (service.priceNote) return service.priceNote;
  if (service.priceType === 'tiered' && service.priceTiers?.length) {
    return service.priceTiers.map((t) => `${t.label} $${t.price}`).join(' · ');
  }
  if (service.priceType === 'flat' && service.price != null) return `$${service.price}`;
  return null;
}

/**
 * Single menu line item — flat price, tiered (S/M/L), or a free-text
 * price note ("Upon request", "from $95"), plus an optional add-on note.
 */
export function ServiceRow({ service }) {
  const price = formatPrice(service);
  const comingSoon = service.status === 'comingSoon';

  return (
    <div
      className={`flex justify-between gap-4 py-3 border-b border-ink/10 ${
        comingSoon ? 'opacity-60' : ''
      }`}
    >
      <span className="text-base">
        {service.name}
        {service.addOnNote && (
          <span className="text-muted-3 text-[13px]"> · {service.addOnNote}</span>
        )}
      </span>
      {price && <span className="text-[15px] md:text-base text-muted-2 whitespace-nowrap">{price}</span>}
    </div>
  );
}

ServiceRow.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priceType: PropTypes.oneOf(['flat', 'tiered', 'request']),
    price: PropTypes.number,
    priceTiers: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, price: PropTypes.number })
    ),
    priceNote: PropTypes.string,
    addOnNote: PropTypes.string,
    status: PropTypes.oneOf(['active', 'comingSoon']),
  }).isRequired,
};
