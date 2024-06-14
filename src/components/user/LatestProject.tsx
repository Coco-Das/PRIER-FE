import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamProfile } from '../../assets/MainAvatar.svg';
import { LatestProjectContainer, LinkText, ProjectContainer } from './UserStyle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Rating from '@mui/material/Rating';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { styled } from 'styled-components';
import { useAllProjectStore } from '../../states/user/UserProjectStore';
import { FetchLatestProject } from '../../services/MainPageApi';

export default function LatestProject() {
  const { content, setProjects } = useAllProjectStore();
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#315af1',
    },
  });
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await FetchLatestProject();
      } catch (error) {
        console.error('최근 프로젝트 데이터 가져오기 실패:', error);
      }
    };

    fetchProjects();
  }, [setProjects]);
  return (
    <div>
      {content.map(project => (
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
          <img src={project.mainImageUrl} alt="My Project" className="mb-2" style={{ width: '270px' }} />
          <div className="ml-3">
            <p className="font-light text-lg">
              {project.tags.map(tag => (
                <div key={tag.tagId}>{tag.tagName}</div>
              ))}
            </p>
            <div className="flex justify-between">
              <StyledRating
                defaultValue={project.score}
                precision={0.5}
                icon={<StarRateRoundedIcon fontSize="inherit" />}
                emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                readOnly
              />
              <Link to={`/feedback/projects/${project.projectId}`}>
                <LinkText>피드백 참여하기 &gt;</LinkText>
              </Link>
            </div>
          </div>
        </LatestProjectContainer>
      ))}
    </div>
  );
}
