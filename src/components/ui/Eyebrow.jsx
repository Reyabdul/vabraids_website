import PropTypes from 'prop-types';

const TONE_CLASSES = {
  muted: 'text-muted',
  inverted: 'text-muted-3',
  paper: 'text-paper',
};

/**
 * Small tracked-uppercase label used above every section heading
 * (e.g. "The Stylist", "Services & Pricing").
 */
export function Eyebrow({ children, tone = 'muted', className = '' }) {
  return (
    <div
      className={`font-sans text-[11px] uppercase tracking-[.32em] ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

Eyebrow.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(['muted', 'inverted', 'paper']),
  className: PropTypes.string,
};
