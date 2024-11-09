'use client';

import useProfile from '@/hooks/useProfile';
import { MissionType } from '@/types/Challenge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { romanizeAddress } from '@/utils/i11n';
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
      >{`${romanizeAddress(district ?? '')}(${district}) / ${bigCategory}`}</Typography>
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
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {`Challen-Day | Hello User ${name}!`}
              </Typography>
              <Typography variant="h6" component="div">
                {`Today's challenge that you selected [${district}/${bigCategory}] is ${'this'}!`}
              </Typography>
              <Typography variant="h6">
                {`Good Luck!`}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              {open ? (
                <Typography>{mission.mission}</Typography>
              ) : (
                <Button size="small" onClick={() => setOpen(true)}>{`Click to Open!`}</Button>
              )}
            </CardActions>
          </>
        </Card>
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
    <>
      <MissionTitle district={district} bigCategory={bigCategory} missionText={"Today's Mission"} />
      {mission && (
        <div className="container">
          <div className="main-image">
            <img src="/asset/sampleImage.png" alt="sampleImage" />
          </div>
          <div className="text-box">
            <MissionOpenCard
              name={profile?.email ?? ''}
              district={district}
              bigCategory={bigCategory}
              mission={mission}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default MissionCard;
