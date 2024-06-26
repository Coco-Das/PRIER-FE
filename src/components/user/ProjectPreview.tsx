import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkText,
  ProjectContainer,
  ProjectWrapper,
  ProjectImg,
  TagContainer,
  Base,
  colors,
  ProfileImg,
} from './UserStyle';
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
              <ProfileImg src={project.profileImageUrl} />
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
        </ProjectContainer>
      ))}
    </ProjectWrapper>
  );
}
