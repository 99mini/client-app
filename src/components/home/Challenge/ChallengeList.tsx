'use client';

import { useState } from 'react';

import MultiSelectBox from '@/components/MultiSelectBox';
import { BIG_CATEGORY, GOGUN } from '@/constants/challenge';
import useChallenge from '@/hooks/useChallenge';
import { ChallengeType } from '@/types/Challenge';
import ChallengeCard from './ChallengeCard';
import ChallengeDetailCard from './ChallengeDetailCard';

import './ChallengeList.css';

const ChallengeList = () => {
  const [selected, setSelected] = useState<ChallengeType | null>(null);
  const [selectedGogun, setSelectedGogun] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const challenge = useChallenge(selectedGogun, selectedCategory);

  return (
    <div className="challenge-list-container">
      <div className="chanllenge-option">
        <MultiSelectBox
          title={'지역 선택'}
          options={[...GOGUN, '전체']}
          defaultValue={'전체'}
          onChange={setSelectedGogun}
        />
        <MultiSelectBox
          title={'카테고리 선택'}
          options={[...BIG_CATEGORY, '전체']}
          defaultValue={'전체'}
          onChange={setSelectedCategory}
        />
      </div>
      <ul className="challenge-list">
        {challenge.map((challen) => {
          if (selected?.district === challen.district) {
            return <ChallengeDetailCard key={challen.district} challenge={challen} />;
          }
          return (
            <ChallengeCard
              key={challen.district}
              challenge={challen}
              onClick={() => {
                setSelected(challen);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ChallengeList;
