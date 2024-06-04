import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamProfile } from '../../assets/MainAvatar.svg';
import EX from '../../assets/eximage.png';
import { LinkText, ProjectContainer } from './UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';

export default function ProjectPreview() {
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
      <ProjectContainer>
        <div className="flex items-center mt-2 justify-between w-full">
          <div className="flex items-center">
            <TeamProfile />
            <span className="flex-col ml-2">
              <p className="text-lg">프로젝트 명</p>
              <p className="text-base font-light" style={{ color: '#828282' }}>
                Team : {}
              </p>
            </span>
          </div>
          <StarBorderRoundedIcon fontSize="large" className="justify-end" />
        </div>
        <img src={EX} alt="My Project" className="mb-2" style={{ width: '270px' }} />
        <div className="ml-3">
          <p className="font-light text-lg">프로젝트 설명{}</p>
          <div className="flex justify-between">
            <StyledRating
              defaultValue={2}
              precision={0.5}
              icon={<StarRateRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
              readOnly
            />
            <Link to="/feedback">
              <LinkText>피드백 참여하기 &gt;</LinkText>
            </Link>
          </div>
        </div>
      </ProjectContainer>
    </div>
  );
}
