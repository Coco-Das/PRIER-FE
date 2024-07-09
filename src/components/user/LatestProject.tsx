import React from 'react';
import { Link } from 'react-router-dom';
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

export default function LatestProject() {
  const { content } = useNewProjectStore();

  const displayedProjects = content.slice(0, 4);
  const myId = localStorage.getItem('userId');

  return (
    <LatestProjectWrapper>
      {displayedProjects.map(project => (
        <LatestProjectContainer key={project.projectId}>
          <Link to={`/responsetest/${project.projectId}`}>
            <div className="flex items-center mt-2 justify-between w-full">
              <div className="flex items-center mb-2">
                <Link to={project.projectId === Number(myId) ? `/mypage` : `/profile/${project.projectId}`}>
                  <ProfileImg src={project.profileImageUrl} />
                </Link>
                <span className="flex-col ml-4">
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectTeam className="text-base font-light" style={{ color: '#828282' }}>
                    Team : {project.teamName}
                  </ProjectTeam>
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
            <div className="flex justify-between items-center gap-2">
              <StarRating initialScore={project.score} readOnly={true} onHover={false} />

              <LinkText>피드백 참여하기 &gt;</LinkText>
            </div>{' '}
          </Link>
        </LatestProjectContainer>
      ))}
    </LatestProjectWrapper>
  );
}
