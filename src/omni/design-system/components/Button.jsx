import React from 'react';
import './Button.css';

/**
 * Button — HOT Design System (Figma node 93:829).
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'filled' | 'ghost' | 'error' | 'neutral'
 *  - size: 'xs' | 'sm' | 'md'
 *  - iconLeft / iconRight: ReactNode (e.g. an <Icon />)
 *  - iconOnly: boolean — square icon button (pass a single icon as children or iconLeft)
 *  - disabled, type, onClick, ...rest
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  iconOnly = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'ds-btn',
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    iconOnly ? 'ds-btn--icon-only' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {iconLeft && <span className="ds-btn__icon">{iconLeft}</span>}
      {!iconOnly && children != null && <span className="ds-btn__label">{children}</span>}
      {iconOnly && !iconLeft && <span className="ds-btn__icon">{children}</span>}
      {iconRight && <span className="ds-btn__icon">{iconRight}</span>}
    </button>
  );
};

export default Button;
