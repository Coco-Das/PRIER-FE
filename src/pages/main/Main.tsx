import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import {
  GreetingContainer,
  IconWrapper,
  LinkButton,
  MainContainer,
  MainText,
  NoresultWrapper,
  OrderButton,
  PointText,
  SearchInputWrapper,
  StyledChartIcon,
  StyledInput,
  Title,
} from './MainStyle';
import ProjectPreview from '../../components/user/ProjectPreview';
import { useUserStore } from '../../states/user/UserStore';
import { CheckPoint } from '../../services/StoreApi';
import { userPointStore } from '../../states/user/PointStore';
import LatestProject from '../../components/user/LatestProject';
import { useAllProjectStore } from '../../states/user/UserProjectStore';
import { FetchAllProject, FetchLatestProject, SearchProject } from '../../services/MainPageApi';
import Alarm from '../../components/user/Alarm';
import { FetchMyPage } from '../../services/UserApi';
import MainChart from '../../assets/MainChart.png';

export default function Main() {
  const userProfile = useUserStore(state => state.userProfile);
  const pointStore = userPointStore();
  const { totalPages, setProjects } = useAllProjectStore();
  const [activeButton, setActiveButton] = useState('인기순');
  const [filter, setFilter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [noResults, setNoResults] = useState(false);
  //알림 데이터
  const response = sessionStorage.getItem('responseAmount');
  const comment = sessionStorage.getItem('commentAmount');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointsData = await CheckPoint();
        pointStore.setPoint(pointsData);
        await FetchMyPage();
      } catch (error) {
        console.error('메인 페이지 호출 실패:', error);
      }
    };

    fetchData();
  }, [pointStore.setPoint]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await FetchLatestProject();
        await FetchAllProject(1, 0);
      } catch (error) {
        console.error('프로젝트 데이터 가져오기 실패:', error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  const FilterChange = async (newFilter: number, buttonLabel: string) => {
    setFilter(newFilter);
    setActiveButton(buttonLabel);
    try {
      await setFilter(newFilter);
      await FetchAllProject(newFilter, 0);
      setCurrentPage(1);
    } catch (error) {
      console.error('프로젝트 데이터 가져오기 실패:', error);
    }
  };

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    try {
      await FetchAllProject(filter, value - 1);
    } catch (error) {
      console.error('프로젝트 데이터 가져오기 실패:', error);
    }
  };
  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const response = await SearchProject(keyword);
      if (response.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  };
  return (
    <div className="flex-col cursor-pointer" style={{ margin: '1% 7%' }}>
      <MainContainer>
        <GreetingContainer>
          <StyledChartIcon src={MainChart} />
          <div className="flex flex-col w-full" style={{ marginTop: '1%', marginLeft: '4%' }}>
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
          <OrderButton active={activeButton === '인기순'} onClick={() => FilterChange(1, '인기순')}>
            인기순
          </OrderButton>
          <OrderButton active={activeButton === '등록순'} onClick={() => FilterChange(2, '등록순')}>
            등록순
          </OrderButton>
          <OrderButton active={activeButton === '최신순'} onClick={() => FilterChange(3, '최신순')}>
            최신순
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
      {noResults ? (
        <NoresultWrapper>{keyword} (이)가 포함된 프로젝트가 존재하지 않습니다.</NoresultWrapper>
      ) : (
        <ProjectPreview />
      )}

      <span className="flex justify-center mt-6">
        <Pagination count={totalPages} page={currentPage} color="primary" size="large" onChange={handlePageChange} />
      </span>
      {response === '0' && comment === '0' ? (
        <></>
      ) : (
        <>
          <Alarm />
        </>
      )}
    </div>
  );
}
