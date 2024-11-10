import { Skeleton } from '@mui/material';
import { Suspense } from 'react';
import ChallengeLogContainer from './challen-log-container';

import './challen-log.css';

const ChallenLog = () => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />}>
      <ChallengeLogContainer />
    </Suspense>
  );
};
export default ChallenLog;
