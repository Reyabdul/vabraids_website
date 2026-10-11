import PropTypes from 'prop-types';

const SIZE_CLASSES = {
  sm: 'px-5 py-[11px]',
  md: 'px-[30px] py-4',
};

// Hover: the pills swap to their inverse (filled <-> outlined); the text
// links soften the label while the underline firms up.
const VARIANT_TONE_CLASSES = {
  filled: 'bg-paper text-ink border border-paper hover:bg-transparent hover:text-paper',
  'outline-light': 'border border-ink text-ink bg-transparent hover:bg-ink hover:text-paper',
  'outline-dark':
    'border border-paper/40 text-paper bg-transparent hover:bg-paper hover:text-ink hover:border-paper',
  'text-light':
    'border-0 border-b border-ink/50 text-ink bg-transparent p-0! pb-[3px]! hover:text-ink/60 hover:border-ink',
  'text-dark':
    'border-0 border-b border-paper/50 text-paper bg-transparent p-0! pb-[3px]! hover:text-paper/60 hover:border-paper',
};

// `raised` pills behave like a physical button: they lift and cast a
// shadow on hover, then sink back, shrink a touch and change color while
// pressed (released again on mouse-up).
const RAISED_MOTION_CLASSES =
  'hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgb(0_0_0/.5)] active:translate-y-0 active:scale-[.97] active:shadow-none';

const RAISED_PRESS_CLASSES = {
  filled: 'active:bg-paper/25',
  'outline-light': 'active:bg-muted-2 active:border-muted-2',
  'outline-dark': 'active:bg-muted-3 active:border-muted-3',
};

/**
 * Shared CTA treatment — filled pill, outlined pill, or an underlined
 * text link — used for every booking/nav/submit CTA on the page.
 * Renders an external <a> when `href` is set, otherwise a clickable
 * <button> that calls `onClick` (in-page scroll nav, form submit, etc).
 * `raised` adds the tactile lift/press feel — reserved for the Re-Up
 * booking CTAs so the primary action stands apart from the other links.
 */
export function CtaLink({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'filled',
  tone = 'light',
  size = 'md',
  raised = false,
  className = '',
}) {
  const key = variant === 'filled' ? 'filled' : `${variant}-${tone}`;
  // Text links have no body to lift, so `raised` only applies to pills.
  const isRaised = raised && variant !== 'text';
  // hover:opacity-100 cancels the global `a:hover` fade (globals.css) —
  // CTAs have their own hover treatment above.
  const base =
    'inline-flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[.2em] hover:opacity-100 cursor-pointer whitespace-nowrap';
  const transition = isRaised
    ? 'transition-[color,background-color,border-color,translate,scale,box-shadow] duration-200'
    : 'transition-colors duration-300';
  const shape = variant === 'text' ? '' : `rounded-md ${SIZE_CLASSES[size]}`;
  const press = isRaised ? `${RAISED_MOTION_CLASSES} ${RAISED_PRESS_CLASSES[key]}` : '';
  const classes = `${base} ${transition} ${shape} ${VARIANT_TONE_CLASSES[key]} ${press} ${className}`;

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
  raised: PropTypes.bool,
  className: PropTypes.string,
};
