import React, { useId } from 'react';
import './Input.css';

/**
 * Input (Text Input) — HOT Design System (Figma node 6854:3834).
 *
 * Props:
 *  - label, required, helperText
 *  - size: 'sm' | 'md'
 *  - error: boolean  (error border + error helper text)
 *  - prefix / suffix: ReactNode (icon or short text inside the field)
 *  - disabled, value, onChange, placeholder, type, ...rest (spread to <input>)
 * States (default / hover / focus / disabled) are handled in CSS.
 */
const Input = ({
  label,
  required = false,
  helperText,
  size = 'md',
  error = false,
  prefix = null,
  suffix = null,
  disabled = false,
  className = '',
  id,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id || autoId;

  const fieldClasses = [
    'ds-input__field',
    `ds-input__field--${size}`,
    error ? 'is-error' : '',
    disabled ? 'is-disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`ds-input ${className}`}>
      {label && (
        <label className="ds-input__label" htmlFor={inputId}>
          {label}
          {required && <span className="ds-input__required">*</span>}
        </label>
      )}

      <div className={fieldClasses}>
        {prefix && <span className="ds-input__affix">{prefix}</span>}
        <input id={inputId} className="ds-input__control" disabled={disabled} {...rest} />
        {suffix && <span className="ds-input__affix ds-input__affix--suffix">{suffix}</span>}
      </div>

      {helperText && (
        <p className={`ds-input__helper ${error ? 'is-error' : ''}`}>{helperText}</p>
      )}
    </div>
  );
};

export default Input;
