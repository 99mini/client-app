'use client';

import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import TextInput from '../textInput/TextInput';

import session from '@/helpers/session';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const route = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get('redirectTo');

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();

        axios
          .post('/api/auth/sign-in', { email: email, password: pw })
          .then(async (response) => {
            if (response.data) {
              console.log(response.data);
              session.set(response.data.accessToken);

              if (redirectTo) {
                const decoded = decodeURIComponent(redirectTo);

                route.replace(decoded);
              } else {
                route.replace('/');
              }
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
