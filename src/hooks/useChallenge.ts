import { ChallengeType } from '@/types/Challenge';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const useChallenge = (district?: string, category?: string) => {
  const [challenge, setChallenge] = useState<ChallengeType[]>([]);

  useEffect(() => {
    axios
      .get('/api/challenge', {})
      .then((res) => {
        setChallenge(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectedChallenge = useMemo(
    () =>
      challenge.filter((challen) => {
        if (district && category) {
          return challen.district === district && challen.bigCategory === category;
        } else if (district) {
          return challen.district === district;
        } else if (category) {
          return challen.bigCategory === category;
        } else {
          return challen;
        }
      }),
    [challenge, district, category]
  );

  return selectedChallenge;
};

export default useChallenge;
