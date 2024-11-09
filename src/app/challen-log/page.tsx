import ChallenLogCard from '@/components/challen-log/chllenLogCard';
import ReviewCard from '@/components/review-card/ReviewCard';
import SetModal from '@/components/write/setModal';
import './challen-log.css';

const ChallenLog = () => {
  return (
    <div className="container">
      <span className="reviewCard">
        <div className="titlebar">
          <span className="title" style={{ fontSize: 17, fontWeight: 550 }}>
            이미 챌린지 성공한 사람의 글
          </span>
          <SetModal />
        </div>
        <ReviewCard />
      </span>
      <div className="logCard">
        <ChallenLogCard />
      </div>
    </div>
  );
};
export default ChallenLog;
