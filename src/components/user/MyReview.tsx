import React from 'react';
import { ReviewContainer, ReviewProject, ReviewTeam, ReviewText } from './UserStyle';
import { Link, useLocation } from 'react-router-dom';
import { useOtherProfileStore, useUserStore } from '../../states/user/UserStore';
import StarRating from '../utils/StarRating';

function MyReview() {
  const { pathname } = useLocation();
  const userProfile = useUserStore(state => state.userProfile.myPageCommentDtoList);
  const otherProfile = useOtherProfileStore(state => state.otherProfile.myPageCommentDtoList);

  const originalList = pathname === '/mypage' ? userProfile || [] : otherProfile || [];
  const reviews = [...originalList].reverse();

  if (!reviews || reviews.length === 0) {
    return (
      <ReviewContainer>
        <ReviewProject>작성하신 리뷰가 없습니다.</ReviewProject>
        <Link to="/main">
          <ReviewProject className="text-end hover:text-[#315af1] transition">참여하러 가기 &gt;</ReviewProject>
        </Link>
      </ReviewContainer>
    );
  }
  return (
    <div>
      {reviews.map(review => (
        <ReviewContainer key={review.commentId}>
          <Link to={`/responsetest/${review.projectId}`}>
            <ReviewText>&quot; {review.content} &quot;</ReviewText>
            <ReviewProject>{review.projectName}</ReviewProject>
            <div className="flex justify-between gap-5">
              <ReviewTeam>Team : {review.teamName}</ReviewTeam>
              <StarRating initialScore={review.score} readOnly={true} onHover={false} />
            </div>
          </Link>
        </ReviewContainer>
      ))}
    </div>
  );
}

export default MyReview;
