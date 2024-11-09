'use client';

import { validateEmail, validatePassword } from '@/utils/regex';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import TextInput from '../textInput/TextInput';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickName, setNickName] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);
  const [isPwConfirm, setIsPwConfirm] = useState(true);
  const [isValidNickName, setIsValidNickName] = useState(true);

  function EmailConfirm() {
    axios.post('/api/auth/check-email-duplicate', { email: email }).then((res) => {
      if (res.status == 200) {
        if (!validateEmail(email)) {
          alert('Confirm your Email!');
          setIsValidEmail(false);
        } else {
          setIsValidEmail(true);
          console.log(email);
        }
      } else {
        setIsValidEmail(false);
        alert('Fail check-email-duplication');
      }
    });
  }
  function PwConfirm() {
    if (!validatePassword(pw)) {
      alert('Confirm your Password!');
      setIsValidPw(false);
    } else if (!(pw == pwConfirm)) {
      alert('pw != pwConfirm');
      setIsPwConfirm(false);
    } else {
      setIsValidPw(true);
      console.log(pw);
    }
  }
  function NicknameConfirm() {
    axios.post('/api/auth/check-nickname-duplicate', { nickName: nickName }).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setIsValidNickName(true);
      } else {
        setIsValidNickName(false);
        alert('Same Nickname');
      }
    });
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(email, pw);
        if (isValidEmail && isValidPw && isPwConfirm && isValidNickName) {
          axios
            .post('/api/auth/sign-up', { email: email, password: pw, nickName: nickName })
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(true);
        } else {
          console.log(false);
        }
      }}
    >
      <Box>
        <TextInput label="nickname" value={nickName} onChange={setNickName} />
        <Button variant="text" onClick={NicknameConfirm}>
          닉네임 중복 확인
        </Button>
      </Box>
      <Box>
        <TextInput label="Email" value={email} onChange={setEmail} />
        <Button variant="text" onClick={EmailConfirm}>
          이메일 양식 확인
        </Button>
      </Box>
      <Box>
        <TextInput label="password" value={pw} onChange={setPw} type="password" />
        <br />
        <TextInput label="password confirmation" value={pwConfirm} onChange={setPwConfirm} type="password" />
        <Button variant="text" onClick={PwConfirm}>
          비밀번호 확인
        </Button>
      </Box>
      <Button variant="contained" endIcon={<SendIcon />} type="submit">
        Send
      </Button>
    </Box>
  );
};

export default Form;
