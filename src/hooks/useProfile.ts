'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';

import session from '@/helpers/session';
import { ProfileType } from '@/types/Auth';

const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const refresh = useCallback(
    async (token?: string) => {
      const accessToken = token ?? session.get();

      if (token) {
        session.set(token);
      }

      if (!accessToken) {
        return;
      }

      const res = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data) {
        return;
      }

      if (res.status === 403 && res.data.code === 'JWT_EXPIRED') {
        session.set(null);
        setProfile(null);
        return;
      }

      const newProfile = {
        ...res.data,
        accessToken,
      };

      setProfile(newProfile);

      return newProfile;
    },
    [setProfile]
  );

  return { profile, refresh };
};

export default useProfile;
