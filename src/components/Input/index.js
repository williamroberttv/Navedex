import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, title, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

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
    </div>
  );
}

export default Input;
