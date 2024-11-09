'use client';

import useProfile from '@/hooks/useProfile';
import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';

import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css';

type BadgeType = { badge: string; imageUrl: string };

const ProfileContainer = () => {
  const [bagde, setBadge] = useState<BadgeType[]>([]);
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile) {
      return;
    }

    axios('/api/auth/badge', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${profile.accessToken}`,
      },
    }).then((res) => {
      if (!res.data) {
        return;
      }

      setBadge(res.data);
    });
  }, [profile]);

  return (
    <div className="profile-page">
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 12,
          padding: 24,
          flex: 1,
          maxWidth: 400,
        }}
      >
        <Image src={'/asset/profile.svg'} alt={'profile'} width={400} height={340} />
        <Typography
          variant="h4"
          style={{
            fontSize: 24,
          }}
        >
          {profile?.nickName}
        </Typography>
        <Typography
          variant="h4"
          style={{
            color: grey[800],
            fontSize: 16,
          }}
        >
          {profile?.email}
        </Typography>
        <div
          style={{
            color: grey[800],
            backgroundColor: '#FCC4DD',
            borderRadius: 12,
            padding: 8,
            minWidth: 150,
            textAlign: 'center',
          }}
        >
          {`LV. ${profile?.level}`}
        </div>
      </Card>
      <Card style={{ padding: 24, flex: 1, height: '100%', maxWidth: 400, backgroundColor: '#FFEEEE' }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          {'Badges'}
        </Typography>
        {bagde.map((badge) => (
          <Box
            key={badge.badge}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 12,
              padding: 24,
            }}
          >
            <Image src={badge.imageUrl} alt={badge.badge} width={100} height={200} />
            <Typography variant="h5">{badge.badge}</Typography>
          </Box>
        ))}
      </Card>
    </div>
  );
};

export default ProfileContainer;
