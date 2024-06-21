import React, { useEffect, useRef, useState } from 'react';
import {
  DivWrapper,
  FilterBtn,
  GreenDiv,
  ImageWrapper,
  Img,
  ListDiv,
  ListWrapper,
  PurpleDiv,
  Tag,
  TagWrapper,
} from './TestListStyles';
import { useOtherProfileStore } from '../../../states/user/UserStore';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../const/TokenApi';

interface Tag {
  tagId: number;
  tagName: string;
  color: string;
}

interface Project {
  projectId: number;
  title: string;
  teamName: string;
  mainImageUrl: string;
  tags: Tag[];
  score: number;
  devStartDate: string;
  status: string;
  link: string;
}

function TestList() {
  const { userId } = useParams<{ userId: string }>();
  const userProfile = useOtherProfileStore(state => state.otherProfile);
  const [filter, setFilter] = useState<'0' | '1' | '2'>('2');
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  // const [totalElements, setTotalElements] = useState(0);
  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];

  const handleFilterChange = (newFilter: '0' | '1' | '2') => {
    setFilter(newFilter);
  };

  useEffect(() => {
    if (userId) {
      handleGetInfo(userId, filter, page);
    }
  }, [userId, filter, page]);

  const handleGetInfo = async (userId: string, filter: '0' | '1' | '2', page: number) => {
    try {
      const response = await API_BASE_URL.get(`/projects/user-projects?userId=${userId}&filter=${filter}&page=${page}`);
      const data = response.data;

      setProjects(data.content);
      setTotalPages(data.totalPages);
      // setTotalElements(data.totalElements);

      const storedColors = getTagColors();
      const projectsWithColoredTags = data.content.map((project: Project) => {
        const coloredTags = project.tags.map(tag => {
          const color = storedColors[tag.tagName] || getRandomColor();
          if (!storedColors[tag.tagName]) {
            storedColors[tag.tagName] = color;
          }
          return { ...tag, color };
        });
        return { ...project, tags: coloredTags };
      });

      setProjects(projectsWithColoredTags);
      saveTagColors(storedColors);
      console.log(userId);
      console.log(page);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTagColors = (tagColors: { [key: string]: string }) => {
    localStorage.setItem('tagColors', JSON.stringify(tagColors));
  };

  const getTagColors = (): { [key: string]: string } => {
    const tagColors = localStorage.getItem('tagColors');
    return tagColors ? JSON.parse(tagColors) : {};
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DEPLOYMENT_COMPLETE':
        return '배포 완료';
      case 'DEVELOPING':
        return '개발 중';
      case 'PLANNING':
        return '기획 중';
      default:
        return status;
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => {
            setPage(i);
          }}
          style={{
            borderRadius: '8px',
            margin: '0 5px',
            padding: '5px 10px',
            background: i === page ? '#315AF1' : '#fff',
            color: i === page ? '#fff' : '#000',
          }}
        >
          {i + 1}
        </button>,
      );
    }
    return pages;
  };

  return (
    <ListWrapper>
      <span className="ml-4 font-extrabold mt-3" style={{ wordBreak: 'break-word', color: '#315AF1' }}>
        {userProfile.nickname} 프로젝트
      </span>
      <div className="ml-5 mt-2" style={{ display: 'flex', gap: '15px', width: '90%', height: '100%' }}>
        <FilterBtn $isActive={filter === '2'} onClick={() => handleFilterChange('2')}>
          최신순
        </FilterBtn>
        <FilterBtn $isActive={filter === '1'} onClick={() => handleFilterChange('1')}>
          등록순
        </FilterBtn>
        <FilterBtn $isActive={filter === '0'} onClick={() => handleFilterChange('0')}>
          진행중인 프로젝트만 보기
        </FilterBtn>
      </div>
      <div className="mt-5" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projects.map(project => (
          <ListDiv key={project.projectId}>
            <ImageWrapper>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{project.title}</p>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  color: '#828282',
                  fontSize: '14px',
                }}
              >
                <span>{project.devStartDate} ~ </span>
                <span style={{ color: getStatusText(project.status) === '배포 완료' ? 'inherit' : '#315AF1' }}>
                  {getStatusText(project.status)}
                </span>
                <span className="underline" style={{ marginLeft: 'auto', paddingRight: '10px' }}>
                  자세히 보기&gt;
                </span>
              </div>
              {/* 이미지 있을 때만 보이도록 */}
              <div style={{ padding: '10px 10px 0px 0px', height: '100%', width: '100s%' }}>
                {project.mainImageUrl && <Img src={project.mainImageUrl} alt={project.title} />}
              </div>
            </ImageWrapper>
            <DivWrapper>
              <PurpleDiv>
                <p className="font-bold">소속</p>
                <p className="font-bold" style={{ fontSize: '16px' }}>
                  {project.teamName} 팀
                </p>
                <TagWrapper>
                  {project.tags.map(tag => (
                    <Tag key={tag.tagId} $bgColor={tag.color}>
                      {tag.tagName}
                    </Tag>
                  ))}
                </TagWrapper>
              </PurpleDiv>
              <GreenDiv onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                <p>배포 링크</p>
                <span
                  className="font-bold underline"
                  style={{ marginLeft: 'auto', fontSize: '16px', color: '#828282', marginTop: 'auto' }}
                >
                  바로가기 &rarr;
                </span>
              </GreenDiv>
            </DivWrapper>
          </ListDiv>
        ))}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '16px',
        }}
      >
        {renderPagination()}
      </div>
    </ListWrapper>
  );
}

export default TestList;
