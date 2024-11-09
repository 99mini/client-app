'use client';

import useProfile from '@/hooks/useProfile';
import { MissionType } from '@/types/Challenge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { koreanToEnglishCategory, romanizeAddress } from '@/utils/i11n';
import Image from 'next/image';
import Link from 'next/link';
import './MissionCard.css';

const MissionTitle = ({
  district,
  bigCategory,
  missionText,
}: {
  district: string | null;
  bigCategory: string | null;
  missionText: string;
}) => {
  return (
    <div className="mission-card-title">
      <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14 }}
      >{`${romanizeAddress(district ?? '')}(${district}) / ${koreanToEnglishCategory(bigCategory ?? '')}`}</Typography>
      <Typography variant="h3" component="div">
        {missionText}
      </Typography>
    </div>
  );
};

const MissionOpenCard = ({
  name,
  district,
  bigCategory,
  mission,
}: {
  name: string;
  district: string | null;
  bigCategory: string | null;
  mission: MissionType;
}) => {
  const [open, setOpen] = useState(false);
  const { profile } = useProfile();
  return (
    <div
      className="mission-open-card"
      style={{
        position: 'absolute',
      }}
    >
      <Box sx={{ minWidth: 275 }}>
        <>
          <CardContent style={{ border: 'none' }}>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {`${name} Nice to meet you! I'll tell you the mission of the [${romanizeAddress(district ?? '')}(${district}) / ${koreanToEnglishCategory(bigCategory ?? '')}] Challenge!`}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{
                whiteSpace: 'pre-line',
                wordBreak: 'break-word',
                fontSize: '1rem',
              }}
            >
              {`The  team today! `}
              <span
                style={{
                  color: profile?.team ? 'pink' : 'green',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              >
                {`${profile?.team ? 'PINK' : 'GREEN'}`}
              </span>
              {` team. Visit the restaurant list recommended by Challen-Day Seoul and write a certification post for the challenge!
              And, there's another mission for you
              I hope you achieve it in secret!`}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {open ? (
              <Typography>{`${mission.mission}`}</Typography>
            ) : (
              <Button
                size="small"
                style={{
                  backgroundColor: '#FCC4DD',
                  color: 'black',
                  padding: '10px 20px',
                }}
                onClick={() => setOpen(true)}
              >{`Click to Open!`}</Button>
            )}
          </CardActions>
        </>
      </Box>
    </div>
  );
};

const MissionCard = () => {
  const searchParams = useSearchParams();

  const { profile } = useProfile();

  const district = searchParams.get('district');
  const bigCategory = searchParams.get('bigCategory');

  const [mission, setMission] = useState<MissionType | null>(null);

  useEffect(() => {
    if (!profile?.accessToken || !district || !bigCategory) {
      return;
    }
    axios
      .get('/api/mission', {
        params: {
          district,
          bigCategory,
        },
        headers: {
          Authorization: `Bearer ${profile.accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data) {
          return;
        }

        setMission(res.data);
      });
  }, [district, bigCategory, profile?.accessToken]);

  return (
    <div className="mission-page">
      <MissionTitle district={district} bigCategory={bigCategory} missionText={"Today's Mission"} />
      {mission && (
        <div className="container">
          <div className="main-image">
            <Image src="/asset/mascot.png" alt="mascot" width={558} height={574} />
          </div>

          <div className="text-box">
            <div style={{ position: 'relative' }}>
              <Image
                className="balloon"
                src="/asset/balloon.png"
                alt="balloon"
                width={538}
                height={538}
                style={{ maxWidth: 'unset' }}
              />
              <MissionOpenCard
                name={profile?.nickName ?? ''}
                district={district}
                bigCategory={bigCategory}
                mission={mission}
              />
            </div>
          </div>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '0 auto', width: 'fit-content', backgroundColor: '#FCC4DD' }}
      >
        <Link href={'/challen-log'}>{`Let's go Challenge`}</Link>
      </Button>
    </div>
  );
};

export default MissionCard;
