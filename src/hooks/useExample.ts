'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { ExampleType } from '@/types/Example';

const useExample = (): ExampleType | null => {
  const [example, setExample] = useState<ExampleType | null>(null);

  useEffect(() => {
    const fetchIndex = async () => {
      const res = await axios.get<{ data: string }>('/api/test/3');

      if (res.status === 200) {
        setExample({
          id: 1,
          data: res.data.data,
        });
      }
    };

    fetchIndex();
  }, []);

  return example;
};

export default useExample;
