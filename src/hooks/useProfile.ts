'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import session from '@/helpers/session';
import { ProfileType } from '@/types/Auth';

const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const refresh = async (token?: string) => {
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

    setProfile({
      ...res.data,
      accessToken,
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (profile) {
      session.set(profile.accessToken);
    }
  }, [profile]);

  return { profile, refresh };
};

export default useProfile;
