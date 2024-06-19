import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamProfile } from '../../assets/MainAvatar.svg';
import { LinkText, ProjectContainer, ProjectWrapper, ProjectImg, TagContainer } from './UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';
import { useAllProjectStore } from '../../states/user/UserProjectStore';

export default function ProjectPreview() {
  const { content } = useAllProjectStore();
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#315af1',
    },
  });

  return (
    <ProjectWrapper>
      {content.map(project => (
        <ProjectContainer key={project.projectId}>
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
          <ProjectImg src={project.mainImageUrl} alt="My Project" />
          <div className="flex">
            {project.tags.map(tag => (
              <TagContainer key={tag.tagId}>{tag.tagName}</TagContainer>
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
        </ProjectContainer>
      ))}
    </ProjectWrapper>
  );
}
