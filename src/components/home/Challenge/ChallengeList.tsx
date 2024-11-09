'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { ChallengeType } from '@/types/Challenge';
import ChallengeCard from './ChallengeCard';

import ChallengeDetailCard from './ChallengeDetailCard';
import './ChallengeList.css';

const ChallengeList = () => {
  const [challenList, setChallengeList] = useState<ChallengeType[]>([]);
  const [selected, setSelected] = useState<ChallengeType | null>(null);

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
    <div>
      <ul className="challenge-list">
        {challenList.map((challenge) => {
          if (selected?.district === challenge.district) {
            return <ChallengeDetailCard key={challenge.district} challenge={challenge} />;
          }
          return (
            <ChallengeCard
              key={challenge.district}
              challenge={challenge}
              onClick={() => {
                setSelected(challenge);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ChallengeList;
