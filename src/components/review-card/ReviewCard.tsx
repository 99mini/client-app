'use client';

import { BoardCommentType, BoardType } from '@/types/Board';
import { Card } from '@mui/material';
import Image from 'next/image';
import './ReviewCard.css';

const ReviewCard = ({
  board,
}: {
  board: {
    board: BoardType;
    boardComments: BoardCommentType[];
  }[];
}) => {
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
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  {'Comment'}
                </div>
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
