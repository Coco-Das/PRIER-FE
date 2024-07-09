import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Base,
  LatestProjectContainer,
  LatestProjectWrapper,
  LinkText,
  ProfileImg,
  ProjectImg,
  ProjectTeam,
  ProjectTitle,
  TagContainer,
  colors,
} from './UserStyle';
import { useNewProjectStore } from '../../states/user/UserProjectStore';
import StarRating from '../utils/StarRating';
import { LinkUserProfile } from '../../services/UserApi';
import { Loading } from '../utils/Loading';

export default function LatestProject() {
  const { content } = useNewProjectStore();
  const Navigate = useNavigate();
  const displayedProjects = content.slice(0, 4);
  const myId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(false);

  const handleProfileClick = async (userId: number) => {
    setLoading(true);
    try {
      await LinkUserProfile(userId);
      Navigate(`/profile/${userId}`);
    } finally {
      setLoading(false);
    }
    Navigate(`/profile/${userId}`);
  };

  return (
    <>
      {loading && <Loading />}
      <LatestProjectWrapper>
        {displayedProjects.map(project => (
          <LatestProjectContainer key={project.projectId}>
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
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectTeam className="text-base font-light" style={{ color: '#828282' }}>
                    Team : {project.teamName}
                  </ProjectTeam>
                </span>
              </div>
            </div>{' '}
            <Link to={`/responsetest/${project.projectId}`}>
              {project.mainImageUrl ? <ProjectImg src={project.mainImageUrl} alt="My Project" /> : <Base />}
              <div className="flex">
                {project.tags.map((tag, index) => (
                  <TagContainer key={tag.tagId} color={colors[index % colors.length]}>
                    {tag.tagName}
                  </TagContainer>
                ))}
              </div>
              <div className="flex justify-between items-center gap-2">
                <StarRating initialScore={project.score} readOnly={true} onHover={false} />

                <LinkText>피드백 참여하기 &gt;</LinkText>
              </div>{' '}
            </Link>
          </LatestProjectContainer>
        ))}
      </LatestProjectWrapper>
    </>
  );
}
