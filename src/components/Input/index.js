import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, title, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="input-section">
      <label htmlFor={name}>{title}</label>
      <input ref={inputRef} placeholder={title} {...rest} />
      {error && (
        <span style={{ color: '#f00', fontSize: '1.4rem', marginTop: 10 }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
