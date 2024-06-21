import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamProfile } from '../../assets/MainAvatar.svg';
import {
  Base,
  LatestProjectContainer,
  LatestProjectWrapper,
  LinkText,
  ProjectImg,
  TagContainer,
  colors,
} from './UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';
import { useNewProjectStore } from '../../states/user/UserProjectStore';

export default function LatestProject() {
  const { content } = useNewProjectStore();
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#315af1',
    },
  });
  const displayedProjects = content.slice(0, 4);

  return (
    <LatestProjectWrapper>
      {displayedProjects.map(project => (
        <LatestProjectContainer key={project.projectId}>
          <div className="flex items-center mt-2 justify-between w-full">
            <div className="flex items-center">
              <TeamProfile />
              <span className="flex-col ml-2">
                <p className="text-lg">{project.title}</p>
                <p className="text-base font-light" style={{ color: '#828282' }}>
                  Team : {project.teamName}
                </p>
              </span>
            </div>
          </div>
          {project.mainImageUrl ? <ProjectImg src={project.mainImageUrl} alt="My Project" /> : <Base />}
          <div className="flex">
            {project.tags.map((tag, index) => (
              <TagContainer key={tag.tagId} color={colors[index % colors.length]}>
                {tag.tagName}
              </TagContainer>
            ))}
          </div>
          <div className="flex justify-between">
            <StyledRating
              defaultValue={project.score}
              precision={0.5}
              icon={<StarRateRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
              readOnly
            />
            <Link to={`/responsetest/${project.projectId}`}>
              <LinkText>피드백 참여하기 &gt;</LinkText>
            </Link>
          </div>
        </LatestProjectContainer>
      ))}
    </LatestProjectWrapper>
  );
}
