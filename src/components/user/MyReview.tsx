import React from 'react';
import { ReviewContainer, ReviewProject, ReviewTeam } from './UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';
import { MyReviewStore } from '../../states/user/UserProjectStore';
import { Link } from 'react-router-dom';

function MyReview() {
  const { reviews } = MyReviewStore();
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#315af1',
    },
  });
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
          <p>&quot;{review.content} &quot;</p>
          <ReviewProject>{review.projectTitle}</ReviewProject>
          <div className="flex justify-between gap-5">
            <ReviewTeam>Team : {review.teamName}</ReviewTeam>
            <StyledRating
              defaultValue={review.score}
              precision={0.5}
              icon={<StarRateRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
              readOnly
            />
          </div>
        </ReviewContainer>
      ))}
    </div>
  );
}

export default MyReview;
