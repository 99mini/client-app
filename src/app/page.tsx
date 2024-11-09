'use client';

import dynamic from 'next/dynamic';

import ChallengeList from '@/components/home/ChallengeList';

import './page.css';

const MapWithNoSSR = dynamic(() => import('../components/home/SeoulMap'), {
  ssr: false,
});

const Home = () => {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page.</p>
      <div className="home-layout">
        <ChallengeList />
        <MapWithNoSSR />
      </div>
    </main>
  );
};

export default Home;
