'use client';

import Link from 'next/link';

import Form from '@/components/login/Form';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';

const Login = () => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />}>
      {'로그인 페이지'}
      <Form />
      <span>{'아직 회원이 아니신가요? '}</span>
      <Link href="/sign-up">{'회원가입'}</Link>
    </Suspense>
  );
};

export default Login;
