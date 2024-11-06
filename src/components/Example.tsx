'use client';

import useExample from '@/hooks/useExample';

const Example = () => {
  const exampleData = useExample();

  return (
    <div>
      <h1>Example</h1>
      <p>{exampleData?.data}</p>
    </div>
  );
};

export default Example;
