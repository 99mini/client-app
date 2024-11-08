'use client';

import { validateEmail, validatePassword } from '@/utils/regex';
import axios from 'axios';
import { useState } from 'react';
import TextInput from '../TextInput';
import './Form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickName, setNickName] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);
  const [isPwConfirm, setIsPwConfirm] = useState(true);

  function EmailConfirm() {
    if (!validateEmail(email)) {
      alert('Confirm your Email!');
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
      console.log(email);
    }
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(email, pw);
        if (isValidEmail && isValidPw && isPwConfirm) {
          axios.post('/api/auth/sign-up', { email: email, password: pw });
          console.log(true);
        } else {
          console.log(false);
        }
      }}
    >
      <TextInput placeholder="nickname" value={nickName} onChange={setNickName} />
      <TextInput placeholder="email address" value={email} onChange={setEmail} />
      <input type="button" value="이메일 확인" onClick={EmailConfirm} />
      <TextInput placeholder="password" value={pw} onChange={setPw} type="password" />
      <TextInput placeholder="password confirmation" value={pwConfirm} onChange={setPwConfirm} type="password" />
      <input type="button" value="비밀번호 확인" onClick={PwConfirm} />
      <p>
        <input type="submit" />
      </p>
    </form>
  );
};

export default Form;
