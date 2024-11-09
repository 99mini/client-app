import './ReviewCard.css';

const ReviewCard = () => {
  return (
    <span className="reviewBox">
      <div>
        <div style={{ fontSize: 15, fontWeight: 350, paddingBottom: 1 }}>강남구/음식</div>
        <div style={{ fontSize: 25, fontWeight: 600, paddingBottom: 5 }}>제가 첫번째 챌린지 성공자입니다.^^</div>
        <div className="photo">
          <img src="/asset/sampleImage.png" alt="review_photo" className="review-photo" />
        </div>
      </div>
      <div className="detailBox">
        <div>
          <div className="profileBox">
            <div className="profileOwner">
              <img src="/asset/sampleImage.png" alt="review_photo" className="photo" />
            </div>
            <div style={{ fontSize: 30, paddingLeft: 15, fontWeight: 500 }}>Nickname</div>
          </div>
          <div className="detail">
            디테일한 리뷰 내용입니다.디테일한 리뷰 내용입니다.디테일한 리뷰 내용입니다.디테일한 리뷰 내용입니다.디테일한
            리뷰 내용입니다.
          </div>
        </div>
        <div style={{ backgroundColor: 'pink', borderRadius: 20 }}>
          <div className="profileBox">
            <div className="profileUser">
              <img src="/asset/sampleImage.png" alt="review_photo" className="photo" />
            </div>
            <div style={{ fontSize: 20, paddingLeft: 15 }}>Nickname</div>
          </div>
          <div className="detail">댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.</div>
        </div>
      </div>
    </span>
  );
};
export default ReviewCard;
