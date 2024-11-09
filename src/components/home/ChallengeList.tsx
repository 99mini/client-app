'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { ChallengeType } from '@/types/Challenge';
import ChallengeCard from './ChallengeCard';

import './ChallengeList.css';

const ChallengeList = () => {
  const [challenList, setChallengeList] = useState<ChallengeType[]>([]);

  useEffect(() => {
    axios
      .get('/api/challenge')
      .then((res) => {
        setChallengeList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div
      style={{
        overflowY: 'auto',
      }}
    >
      <h1>Challenge List</h1>
      <ul className="challenge-list">
        {challenList.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
