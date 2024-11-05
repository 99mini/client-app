"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { ExampleType } from "@/types/Example";

const useExample = (): ExampleType | null => {
  const [example, setExample] = useState<ExampleType | null>(null);

  useEffect(() => {
    const fetchIndex = async () => {
      const res = await axios.get<{ message: string }>("/api/");

      if (res.status === 200) {
        setExample({
          id: 1,
          data: res.data.message,
        });
      }
    };

    fetchIndex();
  }, []);

  return example;
};

export default useExample;
