'use client';

import axios from 'axios';
import { useState } from 'react';
import TextInput from '../TextInput';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(email, pw);
        axios
          .get('/api/auth/sign-in', { params: { email: email } })
          .then((res) => {
            if (res.data.password === pw) {
              console.log(true);
            }
          })
          .catch(function (error) {});
      }}
    >
      <TextInput placeholder="email address" value={email} onChange={setEmail} />
      <TextInput placeholder="password" value={pw} onChange={setPw} type="password" />
      <p>
        <input type="submit" />
      </p>
    </form>
  );
};

export default Form;
