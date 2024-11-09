'use client';

import TextField from '@mui/material/TextField';
import './TextInput.css';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const TextInput = ({ label, value, onChange, type = 'text' }: Props) => {
  return (
    <>
      <TextField
        value={value}
        label={label}
        type={type}
        variant="standard"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default TextInput;
