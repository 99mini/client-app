'use client';

import { Button, Card, Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ChallengeType, DetailChallengeType } from '@/types/Challenge';

import { koreanToEnglishCategory, romanizeAddress, romanizeAddressWithSpace } from '@/utils/i11n';
import './ChallengeDetailCard.css';

interface ChallengeDetailCardProps {
  challenge: ChallengeType;
}

const ChallengeDetailCard = ({ challenge }: ChallengeDetailCardProps) => {
  const [maxHeight, setMaxHeight] = useState('100px');
  const [detailChallenge, setDetailChallenge] = useState<DetailChallengeType | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      if (contentRef.current) {
        setMaxHeight(`${contentRef.current.scrollHeight + 178}px`);
        await new Promise((resolve) => setTimeout(resolve, 350));
        setMaxHeight('unset');
      }
    })();
  }, [challenge, detailChallenge]);

  useEffect(() => {
    return () => setMaxHeight('100px');
  }, []);

  useEffect(() => {
    axios
      .get(`/api/challenge/attractions-by-district-category`, {
        params: { district: challenge.district, bigCategory: challenge.bigCategory },
      })
      .then((res) => {
        setDetailChallenge(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [challenge.bigCategory, challenge.district]);

  return (
    <Card ref={contentRef} className="challenge-detail-card" style={{ maxHeight: maxHeight }}>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >{`${romanizeAddress(challenge.district)} (${challenge.district}) / ${koreanToEnglishCategory(challenge.bigCategory)}`}</div>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '1rem',
        }}
      >
        {challenge.text}
      </h2>
      {detailChallenge?.imageURL ? (
        <Image
          className="mission-thumnail"
          src={detailChallenge.imageURL ?? ''}
          alt={detailChallenge.mission ?? challenge.text}
          width={400}
          height={178}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      ) : (
        <Skeleton className="mission-thumnail" variant="rectangular" width={400} height={276} />
      )}
      <div className="mission">
        <div className="mission-header">
          <span className="mission-title">{'Mission'}</span>
          <Button className="mission-button">
            <Link href={`/challenge?district=${challenge.district}&bigCategory=${challenge.bigCategory}`}>
              {'Let’s go Challenge'}
            </Link>
          </Button>
        </div>
        <p className="mission-description">{detailChallenge?.mission}</p>
        <ul className="mission-list">
          {detailChallenge?.attractions.map((attraction) => (
            <li key={attraction.id} className="mission-item">
              <div className="mission-item-title">{attraction.attraction}</div>
              <div className="mission-item-address">{`${romanizeAddressWithSpace(attraction.address)} (${attraction.address})`}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ChallengeDetailCard;
