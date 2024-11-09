import ChallenLogCard from '@/components/challen-log/chllenLogCard';
import ReviewCard from '@/components/review-card/ReviewCard';
import SetModal from '@/components/write/setModal';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';
import './challen-log.css';

const ChallenLog = () => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />}>
      <div className="challen-log-container">
        <div className="reviewCard">
          <div className="titlebar">
            <span className="title" style={{ fontSize: 17, fontWeight: 550 }}>
              {'Succeeded people in the challenge'}
            </span>
            <SetModal />
          </div>
          <ReviewCard />
        </div>
        <div className="logCard">
          <ChallenLogCard />
        </div>
      </div>
    </Suspense>
  );
};
export default ChallenLog;
