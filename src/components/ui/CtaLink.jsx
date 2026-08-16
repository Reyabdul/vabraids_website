import PropTypes from 'prop-types';

const SIZE_CLASSES = {
  sm: 'px-5 py-[11px]',
  md: 'px-[30px] py-4',
};

const VARIANT_TONE_CLASSES = {
  filled: 'bg-paper text-ink border border-paper',
  'outline-light': 'border border-ink text-ink bg-transparent',
  'outline-dark': 'border border-paper/40 text-paper bg-transparent',
  'text-light': 'border-0 border-b border-ink/50 text-ink bg-transparent p-0! pb-[3px]!',
  'text-dark': 'border-0 border-b border-paper/50 text-paper bg-transparent p-0! pb-[3px]!',
};

/**
 * Shared CTA treatment — filled pill, outlined pill, or an underlined
 * text link — used for every booking/nav/submit CTA on the page.
 * Renders an external <a> when `href` is set, otherwise a clickable
 * <button> that calls `onClick` (in-page scroll nav, form submit, etc).
 */
export function CtaLink({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'filled',
  tone = 'light',
  size = 'md',
  className = '',
}) {
  const key = variant === 'filled' ? 'filled' : `${variant}-${tone}`;
  const base =
    'inline-flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[.2em] transition-opacity cursor-pointer whitespace-nowrap';
  const shape = variant === 'text' ? '' : `rounded-md ${SIZE_CLASSES[size]}`;
  const classes = `${base} ${shape} ${VARIANT_TONE_CLASSES[key]} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

CtaLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['filled', 'outline', 'text']),
  tone: PropTypes.oneOf(['light', 'dark']),
  size: PropTypes.oneOf(['sm', 'md']),
  className: PropTypes.string,
};
