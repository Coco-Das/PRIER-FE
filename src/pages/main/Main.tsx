import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import {
  GreetingContainer,
  LinkButton,
  MainContainer,
  MainText,
  OrderButton,
  PointText,
  SearchInputWrapper,
  StyledChartIcon,
  Title,
} from './MainStyle';
import ProjectPreview from '../../components/user/ProjectPreview';
import { FetchMyPage } from '../../services/UserApi';
import { useUserStore } from '../../states/user/UserStore';
import { CheckPoint } from '../../services/StoreApi';
import { userPointStore } from '../../states/user/PointStore';

export default function Main() {
  const [activeButton, setActiveButton] = useState('인기순');
  const userProfile = useUserStore(state => state.userProfile);
  const { setUserProfile } = useUserStore();
  const pointStore = userPointStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await FetchMyPage();
        setUserProfile(userProfileData);
        const pointsData = await CheckPoint();
        pointStore.setPoint(pointsData);
      } catch (error) {
        console.error('메인 페이지 호출 실패:', error);
      }
    };

    fetchData();
  }, [setUserProfile, pointStore.setPoint]);
  return (
    <div className="flex-col cursor-pointer" style={{ margin: '1% 7%' }}>
      <MainContainer>
        <GreetingContainer>
          <StyledChartIcon />
          <div className="flex flex-col" style={{ marginTop: '3%', marginLeft: '4%' }}>
            <PointText className="mt-2">반갑습니다 {userProfile.nickname} 님</PointText>
            <MainText>
              새로운 아이디어를 시험해보고, 실제 사용자의 피드백으로 완성도를 높이세요. <br></br>
              여기, 사용자와 함께 성장하는 첫 걸음을 내딛을 수 있는 공간입니다.
            </MainText>
            <LinkButton>
              <Link to="/createtest">지금 바로 등록하기</Link>
            </LinkButton>
          </div>
        </GreetingContainer>
      </MainContainer>
      <Title>신규 프로젝트</Title>
      <ProjectPreview />
      <Title>모든 프로젝트</Title>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          <OrderButton active={activeButton === '인기순'} onClick={() => setActiveButton('인기순')}>
            인기순
          </OrderButton>
          <OrderButton active={activeButton === '등록순'} onClick={() => setActiveButton('등록순')}>
            등록순
          </OrderButton>
        </div>

        <SearchInputWrapper>
          <input type="text" placeholder=" " />
          <div>
            <svg>
              <use xlinkHref="#path"></use>
            </svg>
          </div>
        </SearchInputWrapper>
      </div>
      <ProjectPreview />
      <span className="flex justify-center mt-6">
        <Pagination count={5} color="primary" size="large" />
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 28" id="path">
          <path
            d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562"
            transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"
          ></path>
        </symbol>
      </svg>
    </div>
  );
}
