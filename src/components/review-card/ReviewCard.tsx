'use client';
import useProfile from '@/hooks/useProfile';
import { useEffect, useState } from 'react';

import { BoardCommentType, BoardType } from '@/types/Board';
import { Card } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import './ReviewCard.css';

const ReviewCard = () => {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {board.map((data) => (
        <Card className="reviewBox" key={data.board.id}>
          <div>
            <div style={{ fontSize: 25, fontWeight: 600, paddingBottom: 5 }}>{data.board.title}</div>
            <div className="photo">
              <Image src={data.board.image} alt="review_photo" className="review-photo" width={300} height={150} />
            </div>
          </div>
          <div className="detailBox">
            <div>
              <div className="profileBox">
                <div style={{ fontSize: 30, fontWeight: 500 }}>{data.board.nickName}</div>
              </div>
              <div className="detail">{data.board.writingText}</div>
            </div>
            <div style={{ borderRadius: 12 }}>
              <div className="detail" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
                {data.boardComments.map((comment) => (
                  <Card key={comment.id} style={{ padding: 12, borderRadius: 16 }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{comment.nickName}</div>
                    <div>{comment.comment}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default ReviewCard;
