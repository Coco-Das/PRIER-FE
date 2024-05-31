import React from 'react';
import {
  IntroduceContainer,
  ProfileContainer,
  ProfileTextContainer,
  ProjectContainer,
  QuestContainer,
  ReviewContainer,
  Step,
  StepCircle,
  StepLabel,
  StepLine,
  StepsContainer,
  StyledUserIcon,
} from './MyPageStyle';
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
      <div className="flex items-center">
        <ProjectContainer>
          <Title>진행 중인 프로젝트</Title>
          <Link to="/testlist">
            <LinkText className="text-end">전체 프로젝트 &gt;</LinkText>
          </Link>
          <div className="flex"></div>
        </ProjectContainer>
        <ReviewContainer>
          <Title>{}개발자 1님의 리뷰</Title>
          <MyReview />
        </ReviewContainer>
      </div>
    </div>
  );
}

export default MyPage;
