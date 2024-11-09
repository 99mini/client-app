'use client';

import { default as sessionInstance } from '@/helpers/session';
import { useEffect, useState } from 'react';

const useSession = () => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    console.log('useSession');
    const res = sessionInstance.get();

    setSession(res);
  }, []);

  return session;
};

export default useSession;
