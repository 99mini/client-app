import { ChallengeType } from '@/types/Challenge';
import { Card } from '@mui/material';

import './ChallengeCard.css';

interface ChallengeCardProps {
  challenge: ChallengeType;
  onClick: () => void;
}

const ChallengeCard = ({ challenge, onClick }: ChallengeCardProps) => {
  return (
    <Card className="challenge-card" onClick={onClick}>
      <h2>{challenge.district}</h2>
      <p>{challenge.bigCategory}</p>
      <p>{challenge.text}</p>
    </Card>
  );
};

export default ChallengeCard;
