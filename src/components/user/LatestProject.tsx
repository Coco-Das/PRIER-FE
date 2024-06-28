import React from 'react';
import { Link } from 'react-router-dom';
import {
  Base,
  LatestProjectContainer,
  LatestProjectWrapper,
  LinkText,
  ProfileImg,
  ProjectImg,
  TagContainer,
  colors,
} from './UserStyle';
import { useNewProjectStore } from '../../states/user/UserProjectStore';
import StarRating from '../utils/StarRating';

export default function LatestProject() {
  const { content } = useNewProjectStore();

  const displayedProjects = content.slice(0, 4);

  return (
    <LatestProjectWrapper>
      {displayedProjects.map(project => (
        <LatestProjectContainer key={project.projectId}>
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
            <StarRating initialScore={project.score} readOnly={true} onHover={false} />
            <Link to={`/responsetest/${project.projectId}`}>
              <LinkText>피드백 참여하기 &gt;</LinkText>
            </Link>
          </div>
        </LatestProjectContainer>
      ))}
    </LatestProjectWrapper>
  );
}
