import { ChallengeType } from '@/types/Challenge';
import { Card } from '@mui/material';

import './ChallengeCard.css';

interface ChallengeCardProps {
  challenge: ChallengeType;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card className="challenge-card">
      <h2>{challenge.district}</h2>
      <p>{challenge.bigCategory}</p>
    </Card>
  );
};

export default ChallengeCard;
