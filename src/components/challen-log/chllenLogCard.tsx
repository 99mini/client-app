'use client';

import useProfile from '@/hooks/useProfile';
import { GatheringType } from '@/types/Gathering';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JoinCard from '../join-card/JoinCard';

const ChallenLogCard = () => {
  const searchParams = useSearchParams();

  const { profile } = useProfile();

  const id = Number(searchParams.get('id'));
  const nickName = String(searchParams.get('nickName'));
  const challengeId = Number(searchParams.get('challengeId'));
  const text = String(searchParams.get('text'));
  const maxCount = Number(searchParams.get('maxCount'));
  const likeCount = Number(searchParams.get('likeCount'));

  interface GatheringResponse {
    gatherings: GatheringType;
    check: boolean;
  }

  const [gatheringData, setGatheringData] = useState<GatheringResponse[] | null>(null);

  useEffect(() => {
    if (!profile?.accessToken || !id || !nickName || !challengeId || !text || !maxCount || !likeCount) {
      return;
    }
    axios
      .get<GatheringResponse[]>(`/api/challen-log`, {
        params: {
          id,
          nickName,
          challengeId,
          text,
          maxCount,
          likeCount,
        },
        headers: {
          Authorization: `Bearer ${profile.accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data) {
          return;
        }
        setGatheringData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, likeCount, maxCount, challengeId, text, nickName, profile?.accessToken]);
  return (
    <>
      {gatheringData?.map((data) => (
        <JoinCard
          key={data.gatherings.id}
          id={data.gatherings.id}
          likeCount={data.gatherings.likeCount}
          maxCount={data.gatherings.maxCount}
          challengeId={data.gatherings.challengeId}
          text={data.gatherings.text}
          nickName={data.gatherings.nickName}
        />
      ))}
    </>
  );
};

export default ChallenLogCard;
