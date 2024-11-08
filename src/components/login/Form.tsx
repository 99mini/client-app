'use client';

import { useState } from 'react';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log({ email, pw });
      }}
    >
      <p>
        <input
          type="text"
          placeholder="email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="pw"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  );
};

export default Form;
