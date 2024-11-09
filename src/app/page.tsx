'use client';

import dynamic from 'next/dynamic';

import ChallengeList from '@/components/home/Challenge/ChallengeList';

import './page.css';

const MapWithNoSSR = dynamic(() => import('../components/home/GeoMap/SeoulMap'), {
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
