import React from 'react';

const Input = ({
  input,
  label,
  type,
  placeholder,
  className,
  meta: { touched, error }
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          id={input.name}
        />
        {touched && error && <div className="red-text">{error}</div>}
      </div>
    </div>
  );
};

export { Input };
