import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarRatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const StarIcon = styled(Star)<{ isFilled: boolean }>`
  color: ${({ isFilled }) => (isFilled ? 'gold' : 'lightgray')};
`;

const HalfStar = styled(Star)`
  &:before {
    content: '★';
    position: absolute;
    top: -6px;
    left: 0;
    width: 12px;
    height: 24px;
    overflow: hidden;
    color: gold;
  }
`;

interface StarRatingProps {
  initialScore: number; // 초기 스코어
  onRatingChange?: (score: number) => void; // 점수가 변경될 때 호출되는 콜백 함수
}

const StarRating: React.FC<StarRatingProps> = ({ initialScore, onRatingChange }) => {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [rating, setRating] = useState(initialScore);

  useEffect(() => {
    setRating(initialScore);
  }, [initialScore]);

  const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    const newHoveredScore = starIndex + (x > width / 2 ? 1 : 0.5);
    setHoveredScore(newHoveredScore);
  };

  const handleMouseLeave = () => {
    setHoveredScore(null);
  };

  const handleClick = (score: number) => {
    setRating(score);
    if (onRatingChange) {
      onRatingChange(score);
    }
  };

  const renderStars = () => {
    const totalStars = 5;
    const filledStars = Math.floor(hoveredScore !== null ? hoveredScore : rating);
    const halfStars = hoveredScore !== null ? (hoveredScore % 1 >= 0.5 ? 1 : 0) : rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - filledStars - halfStars;

    return (
      <>
        {Array(filledStars)
          .fill(0)
          .map((_, index) => (
            <StarIcon
              key={`filled-${index}`}
              isFilled={true}
              onMouseMove={e => handleMouseMove(e, index)}
              onClick={() => handleClick(index + 1)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </StarIcon>
          ))}
        {halfStars === 1 && (
          <HalfStar
            onMouseMove={e => handleMouseMove(e, filledStars)}
            onClick={() => handleClick(filledStars + 0.5)}
            onMouseLeave={handleMouseLeave}
          />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <StarIcon
              key={`empty-${index}`}
              isFilled={false}
              onMouseMove={e => handleMouseMove(e, filledStars + halfStars + index)}
              onClick={() => handleClick(filledStars + halfStars + index + 0.5)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </StarIcon>
          ))}
      </>
    );
  };

  return <StarRatingDiv>{renderStars()}</StarRatingDiv>;
};

export default StarRating;
