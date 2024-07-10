import React, { useState } from 'react';
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
import { LinkUserProfile } from '../../services/UserApi';
import { Loading } from '../utils/Loading';

export default function ProjectPreview() {
  const { content } = useAllProjectStore();
  const myId = localStorage.getItem('userId');
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProfileClick = async (userId: number) => {
    setLoading(true);
    try {
      await LinkUserProfile(userId);
      Navigate(`/profile/${userId}`);
    } finally {
      Navigate(`/profile/${userId}`);
      setLoading(false);
    }
    Navigate(`/profile/${userId}`);
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
    <>
      {loading && <Loading />}
      <ProjectWrapper>
        {content.map(project => (
          <ProjectContainer key={project.projectId}>
            <div className="flex items-center mt-2 justify-between w-full">
              <div className="flex items-center mb-2">
                {project.userId === Number(myId) ? (
                  <Link to={`/mypage`}>
                    <ProfileImg src={project.profileImageUrl} />
                  </Link>
                ) : (
                  <ProfileImg src={project.profileImageUrl} onClick={() => handleProfileClick(project.userId)} />
                )}
                <span className="flex-col ml-4">
                  <Link to={`/responsetest/${project.projectId}`}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectTeam style={{ color: '#828282' }}>Team : {project.teamName}</ProjectTeam>
                  </Link>
                </span>
              </div>
            </div>
            <Link to={`/responsetest/${project.projectId}`}>
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
            </Link>
          </ProjectContainer>
        ))}
      </ProjectWrapper>
    </>
  );
}
