'use client';

import { useState } from 'react';
import './TextInput.css';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const TextInput = ({ placeholder, value, onChange, type = 'text' }: Props) => {
  const [data, setData] = useState('');

  return (
    <p>
      <label>{placeholder}</label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        value={value ?? data}
        onChange={(e) => {
          setData(e.target.value);
          onChange(e.target.value);
        }}
      />
    </p>
  );
};

export default TextInput;
