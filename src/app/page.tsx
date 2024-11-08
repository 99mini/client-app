'use client';

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/SeoulMap'), {
  ssr: false,
});

const Home = () => {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page.</p>
      <MapWithNoSSR />
    </main>
  );
};

export default Home;
