'use client';

import ChallenLogCard from '@/components/challen-log/chllenLogCard';
import ReviewCard from '@/components/review-card/ReviewCard';
import SetModal from '@/components/write/setModal';
import useProfile from '@/hooks/useProfile';
import { BoardCommentType, BoardType } from '@/types/Board';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ChallengeLogContainer = () => {
  const { profile } = useProfile();

  const [board, setBoard] = useState<
    {
      board: BoardType;
      boardComments: BoardCommentType[];
    }[]
  >([]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    axios
      .get('/api/boards', {
        headers: {
          Authorization: `Bearer ${profile.accessToken}`,
        },
      })
      .then((res) => {
        setBoard(res.data);
      });
  }, [profile]);

  return (
    <div className="challen-log-container">
      <div className="reviewCard">
        <div className="titlebar">
          <span className="title" style={{ fontSize: 17, fontWeight: 550 }}>
            {'Succeeded people in the challenge'}
          </span>
          {<SetModal district={profile?.district} bigCategory={profile?.bigCategory} />}
        </div>
        <ReviewCard board={board} />
      </div>
      <div className="logCard">
        <ChallenLogCard />
      </div>
    </div>
  );
};

export default ChallengeLogContainer;
