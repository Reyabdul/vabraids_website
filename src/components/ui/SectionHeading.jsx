import PropTypes from 'prop-types';

const VARIANT_CLASSES = {
  // Standard section heading (About, Services, Gallery, Instagram, Voices, FAQ)
  default: 'text-[clamp(34px,3.6vw,58px)] leading-none',
  // Hero — bigger, tighter leading
  hero: 'text-[clamp(48px,7vw,104px)] leading-[.96]',
  // Contact — between default and hero
  display: 'text-[clamp(38px,4.4vw,68px)] leading-[1.02]',
  // Voices — italic pull-quote
  quote: 'text-[clamp(28px,3.6vw,50px)] italic leading-[1.24]',
};

/**
 * Cormorant serif heading used for every section title.
 */
export function SectionHeading({ children, as: Tag = 'h2', variant = 'default', className = '' }) {
  return (
    <Tag className={`font-display font-light ${VARIANT_CLASSES[variant]} m-0 ${className}`}>
      {children}
    </Tag>
  );
}

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['default', 'hero', 'display', 'quote']),
  className: PropTypes.string,
};
