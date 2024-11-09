'use client';

import dynamic from 'next/dynamic';

import ChallengeList from '@/components/home/ChallengeList';

import './page.css';

const MapWithNoSSR = dynamic(() => import('../components/home/SeoulMap'), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="home-layout">
      <ChallengeList />
      <MapWithNoSSR />
    </div>
  );
};

export default Home;
