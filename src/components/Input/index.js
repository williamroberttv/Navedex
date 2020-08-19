import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="input-section">
      <label htmlFor={name}>{placeholder}</label>
      <input ref={inputRef} placeholder={placeholder} {...rest} />
    </div>
  );
}

export default Input;
