import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/Media';

const StarRatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 3px;
  &:hover {
    cursor: pointer;
  }
`;

const starShape = `
  polygon(
    50% 0%, 
    61% 35%, 
    98% 35%, 
    68% 57%, 
    79% 91%, 
    50% 70%, 
    21% 91%, 
    32% 57%, 
    2% 35%, 
    39% 35%
  )
`;

const Star = styled.span<{ $onHover: boolean; $isFilled: boolean }>`
  font-size: 22px;
  cursor: ${({ $onHover }) => ($onHover ? 'pointer' : 'default')};
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  clip-path: ${starShape};
  background-color: ${({ $isFilled }) => ($isFilled ? 'gold' : 'lightgray')};

  ${device.small} {
    width: 10px;
    height: 10px;
    gap: 1px;
  }
`;

const HalfStar = styled.span<{ $onHover: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  clip-path: ${starShape};
  background-color: lightgray;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: gold;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  ${device.small} {
    width: 10px;
    height: 10px;
    gap: 1px;
  }
`;

interface StarRatingProps {
  initialScore: number; // 초기 스코어
  onRatingChange?: (score: number) => void; // 점수가 변경될 때 호출되는 콜백 함수
  readOnly?: boolean; // 읽기 전용 여부
  onHover?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ initialScore, onRatingChange, readOnly = false, onHover = true }) => {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [rating, setRating] = useState(initialScore);

  useEffect(() => {
    setRating(initialScore);
  }, [initialScore]);

  const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
    if (readOnly) return;
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    const newHoveredScore = starIndex + (x > width / 2 ? 1 : 0.5);
    setHoveredScore(newHoveredScore);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredScore(null);
  };

  const handleClick = (score: number) => {
    if (readOnly) return;
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
            <Star
              $onHover={onHover}
              key={`filled-${index}`}
              $isFilled={true}
              onMouseMove={e => handleMouseMove(e, index)}
              onClick={() => handleClick(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        {halfStars === 1 && (
          <HalfStar
            $onHover={onHover}
            key={`half-${filledStars}`}
            onMouseMove={e => handleMouseMove(e, filledStars)}
            onClick={() => handleClick(filledStars + 0.5)}
            onMouseLeave={handleMouseLeave}
          />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Star
              $onHover={onHover}
              key={`empty-${index}`}
              $isFilled={false}
              onMouseMove={e => handleMouseMove(e, filledStars + halfStars + index)}
              onClick={() => handleClick(filledStars + halfStars + index + 0.5)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
      </>
    );
  };

  return <StarRatingDiv>{renderStars()}</StarRatingDiv>;
};

export default StarRating;
