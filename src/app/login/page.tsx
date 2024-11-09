'use client';

import Form from '@/components/login/Form';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';

const Login = () => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />}>
      <Form />
    </Suspense>
  );
};

export default Login;
