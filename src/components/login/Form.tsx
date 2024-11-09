'use client';

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
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
          .post('/api/auth/sign-in', { email: email, password: pw })
          .then((res) => {
            if (res.status === 200) {
              console.log('success');
            }
          })
          .catch((e) => {
            if (e.status === 403) {
              console.log(e.code);
            }
          });
      }}
    >
      <TextInput label="Email" value={email} onChange={setEmail} />
      <br />
      <TextInput label="Password" value={pw} onChange={setPw} type="password" />
      <br />
      <br />
      <Button variant="contained" endIcon={<SendIcon />} type="submit">
        Send
      </Button>
    </form>
  );
};

export default Form;
