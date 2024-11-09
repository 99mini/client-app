'use client';

import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import TextInput from '../textInput/TextInput';
import './Form.css';

// ReferenceError: localStorage is not defined 에러 발생

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(email, pw);
        axios
          .post('/api/auth/sign-in', { email: email, password: pw })
          .then((response) => {
            if (response.status === 200) {
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
    </Box>
  );
};

export default Form;
