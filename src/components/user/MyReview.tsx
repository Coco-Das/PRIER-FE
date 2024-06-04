import React from 'react';
import { ReviewContainer, ReviewProject, ReviewTeam } from '../board/UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';

function MyReview() {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#315af1',
    },
  });
  return (
    <div>
      <ReviewContainer>
        <p>&quot; best &quot;</p>
        <ReviewProject>COCO 프로젝트</ReviewProject>
        <div className="flex justify-between gap-5">
          <ReviewTeam>COCODas 팀</ReviewTeam>
          <StyledRating
            defaultValue={3}
            precision={0.5}
            icon={<StarRateRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
            readOnly
          />
        </div>
      </ReviewContainer>
    </div>
  );
}

export default MyReview;
