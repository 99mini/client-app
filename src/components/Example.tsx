'use client';

import useExample from '@/hooks/useExample';
import useSession from '@/hooks/useSession';
import axios from 'axios';

const Example = () => {
  const exampleData = useExample();
  const session = useSession();

  return (
    <div>
      <h1>Example</h1>
      <p>{exampleData?.data}</p>
      <p>{session}</p>
      <button
        onClick={async () => {
          const res = await axios.post('/api/auth/sign-up', { email: 'emails', password: 'password' });
          console.log(res);
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Example;
