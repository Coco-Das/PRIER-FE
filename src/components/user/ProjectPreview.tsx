import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LinkText,
  ProjectContainer,
  ProjectWrapper,
  TagContainer,
  colors,
  ProfileImg,
  ProjectTitle,
  ProjectTeam,
} from './UserStyle';

import { useAllProjectStore } from '../../states/user/UserProjectStore';
import StarRating from '../utils/StarRating';
import { device } from '../../styles/Media';
import { styled } from 'styled-components';

export default function ProjectPreview() {
  const { content } = useAllProjectStore();
  const navigate = useNavigate();
  const myId = localStorage.getItem('userId');

  const handleProfileClick = async (userId: number) => {
    if (userId == Number(myId)) {
      navigate(`/mypage`);
    } else {
      navigate(`/profile/${userId}`);
    }
  };

  const ProjectImg = styled.img`
    border-radius: 10px;
    margin-bottom: 0.5rem;
    width: 240px;
    height: 200px;
    border: 0.8px solid #e0e0e0;
    align-self: center;
    object-fit: cover;
    ${device.small} {
      width: 200px;
      height: 60px;
    }
  `;
  return (
    <ProjectWrapper>
      {content.map(project => (
        <ProjectContainer key={project.projectId}>
          <Link to={`/responsetest/${project.projectId}`}>
            {device.small ? (
              <>
                <div className="flex items-center gap-1">
                  <ProfileImg src={project.profileImageUrl} onClick={() => handleProfileClick(project.userId)} />
                  <span className="flex-col ">
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectTeam style={{ color: '#828282' }}>Team : {project.teamName}</ProjectTeam>
                  </span>
                </div>
                <ProjectImg src={project.mainImageUrl} alt="My Project" />
                <div className="flex mb-2">
                  {project.tags.map((tag, index) => (
                    <TagContainer key={tag.tagId} color={colors[index % colors.length]}>
                      {tag.tagName}
                    </TagContainer>
                  ))}
                </div>
                <StarRating initialScore={project.score} readOnly={true} onHover={false} />
              </>
            ) : (
              <>
                <div className="flex items-center mt-2 justify-between w-full">
                  <div className="flex items-center mb-2">
                    <ProfileImg src={project.profileImageUrl} />
                    <span className="flex-col ml-4">
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectTeam style={{ color: '#828282' }}>Team : {project.teamName}</ProjectTeam>
                    </span>
                  </div>
                </div>
                <ProjectImg src={project.mainImageUrl} alt="My Project" />
                <div className="flex">
                  {project.tags.map((tag, index) => (
                    <TagContainer key={tag.tagId} color={colors[index % colors.length]}>
                      {tag.tagName}
                    </TagContainer>
                  ))}
                </div>
                <div className="flex justify-between items-center gap-3">
                  <StarRating initialScore={project.score} readOnly={true} onHover={false} />
                  <LinkText>피드백 참여하기 &gt;</LinkText>
                </div>
              </>
            )}
          </Link>
        </ProjectContainer>
      ))}
    </ProjectWrapper>
  );
}
