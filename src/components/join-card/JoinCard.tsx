'use client';

import useProfile from '@/hooks/useProfile';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import './JoinCard.css';

interface Props {
  id: number;
  nickName: string;
  text: string;
  challengeId: number;
  maxCount: number;
  likeCount: number;
}

const JoinCard = ({ id, nickName, text, challengeId, maxCount, likeCount }: Props) => {
  const { profile } = useProfile();

  const Profile = () => {
    return (
      <div className="profileBox">
        <div className="profile">
          <img src="/asset/sampleImage.png" alt="profile_photo" className="photo" />
        </div>
        {nickName}
      </div>
    );
  };
  const [count, setCount] = useState(likeCount);
  return (
    <div className="container">
      <Box>
        <Card variant="outlined" sx={{ minWidth: 500 }} style={{ backgroundColor: 'pink', borderRadius: 25 }}>
          <React.Fragment>
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: 20 }}>
                <Profile />
              </Typography>
              <Typography sx={{ fontSize: 15, padding: 1 }} component="div">
                {text}
              </Typography>
              <div className="join-button">
                <Typography sx={{ fontSize: 14, padding: 1 }}>
                  ({count}/{maxCount})
                </Typography>
                <CardActions>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={async (e) => {
                      if (!profile) {
                        return;
                      }
                      axios
                        .get(`/api/gathering/join`, {
                          params: {
                            id: id,
                          },
                          headers: {
                            Authorization: `Bearer ${profile.accessToken}`,
                          },
                        })
                        .then((res) => {
                          if (res.data.status === 200) {
                            setCount(count + 1);
                          }
                        });
                    }}
                  >{`Join`}</Button>
                </CardActions>
              </div>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </div>
  );
};
export default JoinCard;
