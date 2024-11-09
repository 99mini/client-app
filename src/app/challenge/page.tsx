'use client';

import MissionCard from '@/components/mission/MissionCard';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';

const Mission = () => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} height={'100vh'} />}>
      <MissionCard />
    </Suspense>
  );
};

export default Mission;
