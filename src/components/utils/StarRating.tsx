import React from 'react';
import styled from 'styled-components';

const StarRatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Star = styled.span`
  font-size: 24px;
`;

const HalfStar = styled(Star)`
  position: relative;
  &:before {
    content: '\2605';
    position: absolute;
    overflow: hidden;
    width: 50%;
    color: gold;
  }
`;
interface StarRatingProps {
  score: number; // 0부터 5까지의 스코어
}

const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  const totalStars = 5;
  const filledStars = Math.floor(score);
  const halfStars = score % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - filledStars - halfStars;

  return (
    <StarRatingDiv>
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index}>&#9733;</Star>
        ))}
      {halfStars === 1 && <HalfStar>&#9733;</HalfStar>}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index}>&#9734;</Star>
        ))}
    </StarRatingDiv>
  );
};

export default StarRating;
