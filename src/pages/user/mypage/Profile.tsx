import React from 'react';
import {
  DetailText,
  FeedbackContainer,
  IntroduceContainer,
  LinkProject,
  UniqueText,
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
  MypageChartIcon,
  StyledGraphIcon,
  StyledUserIcon,
  TitleText,
  ProfileAccountContainer,
  AIReportContainer,
  ProfileText,
  AccountLink,
  AccountIcon,
  AIBestText,
  EmptyContainer,
} from './MyPageStyle';
import { ReactComponent as TeamProfile } from '../../../assets/MainAvatar.svg';
import { Title } from '../../main/MainStyle';
import { LinkText } from '../../../components/user/UserStyle';
import { Link } from 'react-router-dom';
import MyReview from '../../../components/user/MyReview';
import { useOtherProfileStore } from '../../../states/user/UserStore';
import BlogIcon from '../../../assets/blog.png';
import GithubIcon from '../../../assets/github.png';
import FigmaIcon from '../../../assets/figma.png';
import NotionIcon from '../../../assets/notion.png';
import AIReport from '../../../components/utils/AIReport';

export default function UserProfile() {
  const userProfile = useOtherProfileStore(state => state.otherProfile);

  return (
    <div className="flex-col overflow-hidden" style={{ margin: '1% 4% 0 4%' }}>
      <div className="flex w-full h-[40%] mb-5">
        <ProfileContainer>
          <StyledUserIcon></StyledUserIcon>
          <div className="flex-col mt-3 w-full">
            <span className="flex items-center justify-between">
              <Title>{userProfile.nickname} 님의 프로필</Title>
            </span>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>닉네임 : </ProfileText>
                <ProfileText> {userProfile.nickname} </ProfileText>
              </span>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>소속 : </ProfileText>
                <ProfileText> {userProfile.belonging} </ProfileText>
              </span>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <ProfileText>등급 : </ProfileText>
              <ProfileText>{userProfile.rank} </ProfileText>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <ProfileText>계정 정보 : {userProfile.email}</ProfileText>
            </ProfileTextContainer>
            <ProfileAccountContainer>
              <div className="flex items-center gap-5">
                <AccountLink href={userProfile.blog ?? ''} target="_blank">
                  <AccountIcon src={BlogIcon}></AccountIcon>
                  Blog
                </AccountLink>
                <AccountLink href={userProfile.github ?? ''} target="_blank">
                  <AccountIcon src={GithubIcon}></AccountIcon>
                  Github
                </AccountLink>
                <AccountLink href={userProfile.figma ?? ''} target="_blank">
                  <AccountIcon src={FigmaIcon}></AccountIcon>
                  Figma
                </AccountLink>
                <AccountLink href={userProfile.notion ?? ''} target="_blank">
                  <AccountIcon src={NotionIcon}></AccountIcon>
                  Notion
                </AccountLink>
              </div>
            </ProfileAccountContainer>
          </div>
        </ProfileContainer>
        <div className="flex-col w-[50%]">
          <IntroduceContainer>
            <p className="text-base mb-2 cursor-pointer">자신을 한줄로 소개</p>
            <h1 className="text-2xl font-semibold">{userProfile.intro}</h1>
          </IntroduceContainer>
          <QuestContainer>
            <h1 className="mb-5 cursor-pointer">오늘의 퀘스트</h1>
            <StepsContainer>
              <Step>
                <StepLabel completed={userProfile.firstQuest === true}>출석하기</StepLabel>
                <StepCircle completed={userProfile.firstQuest === true} color="#8e8ae3" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={userProfile.secondQuest === true}>댓글 작성하기</StepLabel>
                <StepCircle completed={userProfile.secondQuest === true} color="#f4c542" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={userProfile.thirdQuest === true}>피드백 참여하기</StepLabel>
                <StepCircle completed={userProfile.thirdQuest === true} color="#4188FE" />
              </Step>
            </StepsContainer>
          </QuestContainer>
        </div>
      </div>
      <div className="flex w-screen h-[60%]">
        <ProjectContainer>
          <Title>진행 중인 프로젝트</Title>
          {userProfile.nowProjectId !== null ? (
            <div className="flex w-full h-full">
              <div className="flex-col w-[30%] h-full">
                <Link to={`/responsetest/${userProfile.nowProjectId}`}>
                  <LinkProject>
                    <div className="flex items-center gap-3">
                      <TeamProfile />
                      <p className="text-lg">{userProfile.nowProjectTeamName}</p>
                    </div>
                    <p className="text-gray-600 text-center mt-2">{userProfile.nowProjectName}</p>
                  </LinkProject>
                </Link>
                <FeedbackContainer>
                  <Link to="/feedback">
                    <TitleText className="mb-4">제출된 피드백</TitleText>
                    <UniqueText className="mb-4">{userProfile.nowProjectFeedbackCount}</UniqueText>
                    <DetailText>{userProfile.nowProjectFeedbackCount}개의 피드백이 제출되었습니다.</DetailText>
                    <LinkText className="text-end">모아보기 &gt;</LinkText>
                  </Link>
                </FeedbackContainer>
              </div>
              <StaticContainer>
                <TitleText>통계</TitleText>
                <UniqueText>평점</UniqueText>
                <UniqueText>{userProfile.nowProjectStaticPercentage} % </UniqueText>
                <DetailText>평점 {userProfile.nowProjectScore}의 별점</DetailText>
                <MypageChartIcon></MypageChartIcon>
              </StaticContainer>
              <AIReportContainer>
                {userProfile.nowProjectKeywordList && userProfile.nowProjectKeywordList.length > 0 ? (
                  <>
                    <div className="flex-col items-start w-full">
                      <span className="flex items-center">
                        <TitleText>AI 분석 Report</TitleText>
                        <StyledGraphIcon></StyledGraphIcon>
                      </span>
                      <AIBestText>&quot; {userProfile.nowProjectKeywordList[0].content} &quot;</AIBestText>
                      <LinkText>
                        &quot; {userProfile.nowProjectKeywordList[0].content} &quot; 라는 단어가 가장 많이
                        응답되었습니다.
                      </LinkText>
                    </div>
                    <AIReport />
                  </>
                ) : (
                  <></>
                )}
              </AIReportContainer>
            </div>
          ) : (
            <EmptyContainer>
              <p>생성한 테스트가 없습니다.</p>
            </EmptyContainer>
          )}
        </ProjectContainer>
        <ReviewWrapper>
          <Title>{userProfile.nickname} 님의 리뷰</Title>
          <span className="scroll-m-0 overflow-y-auto">
            <MyReview />
          </span>
        </ReviewWrapper>
      </div>
    </div>
  );
}
