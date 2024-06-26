import React, { useEffect, useRef, useState } from 'react';
import {
  DetailText,
  DivWrapper,
  FilterBtn,
  GreenDiv,
  ImageWrapper,
  Img,
  ListDiv,
  ListWrapper,
  MypageChartIcon,
  PurpleDiv,
  StaticContainer,
  Tag,
  TagWrapper,
  TitleText,
  UniqueText,
} from './TestListStyles';
import { useOtherProfileStore } from '../../../states/user/UserStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../const/TokenApi';
import { Link } from 'react-router-dom';
import StarRating from '../../../components/utils/StarRating';
import ProjectStatistics from './ProjectStatics';

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
  console.log(userProfile.nickname);
  const [filter, setFilter] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const [last, setLast] = useState(false);

  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];

  const handleFilterChange = (newFilter: number) => {
    setFilter(newFilter);
    navigateToPage(0, newFilter);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentFilter = parseInt(queryParams.get('filter') || '0', 10);
    const currentPage = parseInt(queryParams.get('page') || '0', 10);
    setFilter(currentFilter);
    setPage(currentPage);
  }, [location.search]);

  useEffect(() => {
    if (userId) {
      handleGetInfo(userId, filter, page);
    }
  }, [userId, filter, page]);

  const handleGetInfo = async (userId: string, filter: number, page: number) => {
    try {
      console.log(`Requesting with userId: ${userId}, filter: ${filter}, page: ${page}`);
      const response = await API_BASE_URL.get(`/projects/user-projects?`, {
        params: { userId, filter, page },
      });
      const data = response.data;

      setProjects(data.content);
      setTotalPages(data.totalPages);

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
      setLast(data.last);

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

  const navigateToPage = (newPage: number, newFilter: number) => {
    const queryParams = new URLSearchParams();
    queryParams.set('filter', newFilter.toString());
    queryParams.set('page', newPage.toString());
    navigate(`/testlist/${userId}?${queryParams.toString()}`);
    if (listWrapperRef.current) {
      listWrapperRef.current.scrollTo(0, 0);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DEPLOYMENT_COMPLETE':
        return '배포 완료';
      case 'DEVELOPING':
        return '개발 중';
      case 'PLANNING':
        return '기획';
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
            navigateToPage(i, filter);
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
    <ListWrapper ref={listWrapperRef}>
      <span className="ml-4 font-extrabold mt-3" style={{ wordBreak: 'break-word', color: '#315AF1' }}>
        {userProfile.nickname} 님의 프로젝트
      </span>
      <div className="ml-5 mt-2" style={{ display: 'flex', gap: '15px', width: '90%', height: '100%' }}>
        <FilterBtn $isActive={filter === 0} onClick={() => handleFilterChange(0)}>
          최신순
        </FilterBtn>
        <FilterBtn $isActive={filter === 1} onClick={() => handleFilterChange(1)}>
          등록순
        </FilterBtn>
        <FilterBtn $isActive={filter === 2} onClick={() => handleFilterChange(2)}>
          진행중인 프로젝트만 보기
        </FilterBtn>
      </div>
      <div
        className="mt-5"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
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
                <Link
                  to={`/responsetest/${project.projectId}`}
                  style={{ marginLeft: 'auto', paddingRight: '10px', cursor: 'pointer' }}
                >
                  <span className="underline">자세히 보기 &gt;</span>
                </Link>
              </div>
              <div>
                <StarRating initialScore={project.score} onHover={false} readOnly={true}></StarRating>
              </div>
              {/* 이미지 있을 때만 보이도록 */}
              <div style={{ padding: '10px 10px 0px 0px', height: '100%', width: '100%', position: 'relative' }}>
                {project.mainImageUrl && <Img src={project.mainImageUrl} alt={project.title} />}
                {/* <div style={{ position: 'absolute', top: '5%' }}>
                  <StarRating initialScore={project.score}></StarRating>
                </div> */}
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
                  style={{ marginLeft: 'auto', fontSize: '14px', color: '#828282', marginTop: 'auto' }}
                >
                  바로가기 &rarr;
                </span>
              </GreenDiv>
            </DivWrapper>
            <ProjectStatistics project={project} />
          </ListDiv>
        ))}
      </div>
      {projects.length > 0 ? (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          <button onClick={() => setPage(page => page - 1)} disabled={page === 0}>
            &lt;
          </button>
          {renderPagination()}
          <button onClick={() => setPage(page => page + 1)} disabled={last}>
            &gt;
          </button>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#cccccc',
          }}
        >
          <span> {filter === 2 ? '현재 진행 중인 프로젝트가 없습니다.' : '프로젝트가 없습니다.'}</span>
        </div>
      )}
    </ListWrapper>
  );
}

export default TestList;

// api/chatgpt/projectId
