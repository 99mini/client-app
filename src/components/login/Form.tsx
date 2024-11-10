'use client';

import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import TextInput from '../textInput/TextInput';

import session from '@/helpers/session';
import useProfile from '@/hooks/useProfile';
import Link from 'next/link';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const route = useRouter();

  const { refresh } = useProfile();

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 12,
        padding: 24,
        flex: 1,
      }}
    >
      <Image src={'/asset/login.png'} alt={'login'} width={400} height={340} />
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();

          axios.post('/api/auth/sign-in', { email: email, password: pw }).then(async (response) => {
            if (response.data) {
              session.set(response.data.accessToken);

              const res = await refresh(response.data.accessToken);

              if (!res.accessToken) {
                return;
              }
              if (response.data.team !== null) {
                route.replace('/challen-log');
              } else {
                route.replace('/');
              }
            }
          });
        }}
      >
        <TextInput label="Email" value={email} onChange={setEmail} />
        <br />
        <TextInput label="Password" value={pw} onChange={setPw} type="password" />
        <br />
        <br />
        <Button
          style={{ flex: 1, width: '100%', backgroundColor: '#FCC4DD' }}
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </Button>
      </Box>
      <Link href="/sign-up">{'Sign up'}</Link>
    </Box>
  );
};

export default Form;
