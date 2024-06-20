import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import {
  GreetingContainer,
  IconWrapper,
  LinkButton,
  MainContainer,
  MainText,
  OrderButton,
  PointText,
  SearchInputWrapper,
  StyledChartIcon,
  StyledInput,
  Title,
} from './MainStyle';
import ProjectPreview from '../../components/user/ProjectPreview';
import { FetchMyPage } from '../../services/UserApi';
import { useUserStore } from '../../states/user/UserStore';
import { CheckPoint } from '../../services/StoreApi';
import { userPointStore } from '../../states/user/PointStore';
import LatestProject from '../../components/user/LatestProject';
import { useAllProjectStore } from '../../states/user/UserProjectStore';
import { FetchAllProject, FetchLatestProject, SearchProject } from '../../services/MainPageApi';

export default function Main() {
  const userProfile = useUserStore(state => state.userProfile);
  const { setUserProfile } = useUserStore();
  const pointStore = userPointStore();
  const { totalPages, setProjects } = useAllProjectStore();
  const [activeButton, setActiveButton] = useState('인기순');
  const [filter, setFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await FetchMyPage();
        const pointsData = await CheckPoint();
        pointStore.setPoint(pointsData);
        console.log(pointStore.point);
      } catch (error) {
        console.error('메인 페이지 호출 실패:', error);
      }
    };

    fetchData();
  }, [setUserProfile, pointStore.setPoint]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const Latest = await FetchLatestProject();
        console.log('최근 프로젝트 데이터 가져오기 :', Latest);
        const AllProject = await FetchAllProject(0, 0);
        console.log('모든 프로젝트 데이터 가져오기 :', AllProject);
      } catch (error) {
        console.error('프로젝트 데이터 가져오기 실패:', error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  const FilterChange = async (newFilter: number | null, buttonLabel: string) => {
    if (newFilter) {
      setFilter(newFilter);
    }
    setActiveButton(buttonLabel);
    try {
      const allProjects = await FetchAllProject(filter, 0);
      console.log('모든 프로젝트 데이터 가져오기 :', allProjects);
    } catch (error) {
      console.error('프로젝트 데이터 가져오기 실패:', error);
    }
  };

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    try {
      const allProjects = await FetchAllProject(filter, value);
      console.log('페이지네이션 :', allProjects);
    } catch (error) {
      console.error('프로젝트 데이터 가져오기 실패:', error);
    }
  };
  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await SearchProject(keyword);
    }
  };
  return (
    <div className="flex-col cursor-pointer" style={{ margin: '1% 7%' }}>
      <MainContainer>
        <GreetingContainer>
          <StyledChartIcon />
          <div className="flex flex-col" style={{ marginTop: '3%', marginLeft: '4%' }}>
            <PointText className="mt-2">반갑습니다 {userProfile.nickname} 님</PointText>
            <MainText>
              새로운 아이디어를 시험해보고, 실제 사용자의 피드백으로 완성도를 높이세요. <br />
              사용자와 함께 성장하는 첫 걸음을 내딛을 수 있는 공간입니다.
            </MainText>
            <LinkButton>
              <Link to="/createtest">지금 바로 등록하기</Link>
            </LinkButton>
          </div>
        </GreetingContainer>
      </MainContainer>
      <Title>신규 프로젝트</Title>
      <LatestProject />
      <Title>모든 프로젝트</Title>
      <div className="flex justify-between mb-[1%]">
        <div className="flex gap-2">
          <OrderButton active={activeButton === '인기순'} onClick={() => FilterChange(0, '인기순')}>
            인기순
          </OrderButton>
          <OrderButton active={activeButton === '등록순'} onClick={() => FilterChange(1, '등록순')}>
            등록순
          </OrderButton>
        </div>
        <SearchInputWrapper>
          <StyledInput
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
              <title>Search</title>
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              ></path>
            </svg>
          </IconWrapper>
        </SearchInputWrapper>
      </div>
      <ProjectPreview />
      <span className="flex justify-center mt-6">
        <Pagination
          count={totalPages - 1}
          page={currentPage}
          color="primary"
          size="large"
          onChange={handlePageChange}
        />
      </span>
    </div>
  );
}
