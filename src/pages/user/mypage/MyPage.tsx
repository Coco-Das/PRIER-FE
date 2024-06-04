import React from 'react';
import {
  AIReport,
  DetailText,
  FeedbackContainer,
  IntroduceContainer,
  LinkProject,
  PointText,
  ProfileContainer,
  ProfileTextContainer,
  ProjectContainer,
  QuestContainer,
  ReviewWrapper,
  StaticContainer,
  Step,
  StepCircle,
  StepLabel,
  StepLine,
  StepsContainer,
  StyledChartIcon,
  StyledGraphIcon,
  StyledUserIcon,
  TitleText,
} from './MyPageStyle';
import { ReactComponent as TeamProfile } from '../../../assets/MainAvatar.svg';
import { Title } from '../../main/MainStyle';
import { LinkText, MiddleText } from '../../../components/user/UserStyle';
import { Link } from 'react-router-dom';
import MyReview from '../../../components/user/MyReview';

function MyPage() {
  return (
    <div className="flex-col" style={{ margin: '1% 7%' }}>
      <div className="flex">
        <ProfileContainer>
          <StyledUserIcon></StyledUserIcon>
          <div className="flex-col mt-3">
            <Title>반갑습니다{} 님</Title>
            <ProfileTextContainer>
              <MiddleText>닉네임 : </MiddleText>
              <MiddleText></MiddleText>
              <LinkText>수정 하기</LinkText>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <MiddleText>소속 : </MiddleText>
              <LinkText>수정 하기</LinkText>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <MiddleText>등급 : </MiddleText>
              <LinkText>수정 하기</LinkText>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <MiddleText>계정 정보 : </MiddleText>
              <LinkText>수정 하기</LinkText>
            </ProfileTextContainer>
          </div>
        </ProfileContainer>
        <div className="flex-col" style={{ width: '50%' }}>
          <IntroduceContainer>
            <p className="text-base mb-2">자신을 한줄로 소개</p>
            <h1 className="text-2xl font-semibold">하잉</h1>
            <LinkText className="text-end">수정하기</LinkText>
          </IntroduceContainer>
          <QuestContainer>
            <h1 className="mb-2">오늘의 퀘스트</h1>
            <StepsContainer>
              <Step>
                <StepLabel completed={true}>출석하기</StepLabel>
                <StepCircle completed={true} color="#8e8ae3" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={true}>댓글 작성하기</StepLabel>
                <StepCircle completed={true} color="#f4c542" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={false}>피드백 참여하기</StepLabel>
                <StepCircle completed={false} color="#ccc" />
              </Step>
            </StepsContainer>
          </QuestContainer>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <ProjectContainer>
          <div className="flex items-baseline justify-between">
            <Title>진행 중인 프로젝트</Title>
            <Link to="/testlist">
              <LinkText>전체 프로젝트 &gt;</LinkText>
            </Link>
          </div>
          <div className="flex ">
            <div className="flex-col mr-5">
              <Link to="/createtest">
                <LinkProject>
                  <div className="flex items-center gap-3">
                    <TeamProfile />
                    <p className="text-lg">COCODAS</p>
                  </div>
                  <p className="text-gray-600 text-center mt-2">웹 IDE 프로젝트</p>
                </LinkProject>
              </Link>
              <FeedbackContainer>
                <TitleText>제출된 피드백</TitleText>
                <PointText>34</PointText>
                <DetailText>+ {} 34개의 피드백이 추가로 제출되었습니다.</DetailText>
                <LinkText className="text-end">모아보기 &gt;</LinkText>
              </FeedbackContainer>{' '}
            </div>
            <StaticContainer>
              <TitleText>통계</TitleText>
              <PointText>평점</PointText>
              <DetailText>평점 4의 별점</DetailText>
              <StyledChartIcon></StyledChartIcon>
            </StaticContainer>
            <AIReport>
              <div className="flex gap-4">
                <TitleText>AI 분석 Report</TitleText>
                <StyledGraphIcon></StyledGraphIcon>
              </div>
            </AIReport>
          </div>
        </ProjectContainer>
        <ReviewWrapper>
          <Title>개발자 1님의 리뷰</Title>
          <ul>
            <MyReview />
          </ul>
        </ReviewWrapper>
      </div>
    </div>
  );
}

export default MyPage;
