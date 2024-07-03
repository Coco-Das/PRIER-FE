import React, { useState } from 'react';
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
  TitleText,
  ProfileAccountContainer,
  AIReportContainer,
  ProfileText,
  AccountLink,
  AccountIcon,
  EmptyContainer,
  AccountGithub,
  ProfileDetail,
  ProfileImgContainer,
  StyledProfile,
  StaticOverlay,
  LinkProjectText,
} from './MyPageStyle';
import { Title } from '../../main/MainStyle';
import { LinkText } from '../../../components/user/UserStyle';
import { Link, useParams } from 'react-router-dom';
import MyReview from '../../../components/user/MyReview';
import { useOtherProfileStore } from '../../../states/user/UserStore';
import BlogIcon from '../../../assets/blog.png';
import GithubIcon from '../../../assets/github.png';
import FigmaIcon from '../../../assets/figma.png';
import NotionIcon from '../../../assets/notion.png';
import AIReport from '../../../components/utils/AIReport';
import { styled } from 'styled-components';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import Snackbar from '../../../components/user/Snackbar';
import ChartIcon from '../../../assets/MainChart.png';
import TeamProfile from '../../../assets/TeamProfile.png';
const AccountTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    color: 'white',
    borderRounded: '10px',
    border: '1px solid black',
    fontSize: 13,
  },
}));

export default function UserProfile() {
  const userProfile = useOtherProfileStore(state => state.otherProfile);
  const { userId } = useParams();
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const ClickNoLink = () => {
    setSnackbar({ message: '링크가 등록되지 않았습니다.', type: 'error' });
  };
  return (
    <div className="flex-col overflow-hidden" style={{ margin: '1% 4% 0 4%' }}>
      <div className="flex w-full h-[40%] mb-5">
        <ProfileContainer>
          <ProfileImgContainer>
            <StyledProfile src={userProfile.imgUrl} alt="profile" />
          </ProfileImgContainer>
          <div className="flex-col mt-3 w-full">
            <span className="flex items-center justify-between">
              <Title>{userProfile.nickname} 님의 프로필</Title>
            </span>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>이름 : </ProfileText>
                <ProfileDetail> {userProfile.nickname} </ProfileDetail>
              </span>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>소속 : </ProfileText>
                <ProfileDetail> {userProfile.belonging} </ProfileDetail>
              </span>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>등급 : </ProfileText>
                <ProfileDetail>{userProfile.rank} </ProfileDetail>
              </span>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>계정 : </ProfileText>
                <ProfileDetail>{userProfile.email}</ProfileDetail>
              </span>
            </ProfileTextContainer>
            <ProfileAccountContainer>
              <div className="flex items-center gap-5">
                <AccountTooltip title="Blog" placement="bottom">
                  {userProfile.blog ? (
                    <AccountLink href={userProfile.blog} target="_blank">
                      <AccountIcon src={BlogIcon} hasHref={true}></AccountIcon>
                    </AccountLink>
                  ) : (
                    <AccountIcon src={BlogIcon} hasHref={false} onClick={ClickNoLink}></AccountIcon>
                  )}
                </AccountTooltip>
                <AccountTooltip title="Github" placement="bottom">
                  {userProfile.github ? (
                    <AccountLink href={userProfile.github} target="_blank">
                      <AccountGithub src={GithubIcon} hasHref={true}></AccountGithub>
                    </AccountLink>
                  ) : (
                    <AccountGithub src={GithubIcon} hasHref={false} onClick={ClickNoLink}></AccountGithub>
                  )}
                </AccountTooltip>
                <AccountTooltip title="Figma" placement="bottom">
                  {userProfile.figma ? (
                    <AccountLink href={userProfile.figma} target="_blank">
                      <AccountIcon src={FigmaIcon} hasHref={true}></AccountIcon>
                    </AccountLink>
                  ) : (
                    <AccountIcon src={FigmaIcon} hasHref={false} onClick={ClickNoLink}></AccountIcon>
                  )}
                </AccountTooltip>
                <AccountTooltip title="Notion" placement="bottom">
                  {userProfile.notion ? (
                    <AccountLink href={userProfile.notion} target="_blank">
                      <AccountIcon src={NotionIcon} hasHref={true}></AccountIcon>
                    </AccountLink>
                  ) : (
                    <AccountIcon src={NotionIcon} hasHref={false} onClick={ClickNoLink}></AccountIcon>
                  )}
                </AccountTooltip>
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
          <div className="flex items-center">
            <Title>진행 중인 프로젝트</Title>
            <Link to={`/testlist/${userId}`}>
              <LinkText className="ml-5">모든 프로젝트 &gt;</LinkText>
            </Link>
          </div>
          {userProfile.nowProjectId !== null ? (
            <div className="flex w-full h-full">
              <div className="flex-col w-[30%] h-full">
                <Link to={`/responsetest/${userProfile.nowProjectId}`}>
                  <LinkProject>
                    <div className="flex items-center gap-3">
                      <img src={TeamProfile} />
                      <LinkProjectText className="text-lg">{userProfile.nowProjectTeamName}</LinkProjectText>
                    </div>
                    <LinkProjectText className="text-gray-600 text-center mt-2">
                      {userProfile.nowProjectName}
                    </LinkProjectText>
                  </LinkProject>
                </Link>
                <FeedbackContainer>
                  <Link to={`/feedback/${userProfile.nowProjectId}`}>
                    <TitleText className="mb-4">받은 피드백</TitleText>
                    <UniqueText className="mb-4">{userProfile.nowProjectFeedbackCount}</UniqueText>
                    <DetailText>{userProfile.nowProjectFeedbackCount}개의 피드백이 제출되었습니다.</DetailText>
                    <LinkText className="text-end">모아보기 &gt;</LinkText>
                  </Link>
                </FeedbackContainer>
              </div>
              {userProfile.nowProjectFeedbackCount === 0 ? (
                <StaticContainer className="relative">
                  <TitleText>통계</TitleText>
                  <UniqueText>평점</UniqueText>
                  <UniqueText>80 % </UniqueText>
                  <DetailText>평점 4의 별점</DetailText>
                  <MypageChartIcon src={ChartIcon}></MypageChartIcon>
                  <StaticOverlay>받은 피드백이 없습니다.</StaticOverlay>
                </StaticContainer>
              ) : (
                <StaticContainer>
                  <TitleText>통계</TitleText>
                  <UniqueText>평점</UniqueText>
                  <UniqueText>
                    {Math.round(parseFloat(userProfile.nowProjectStaticPercentage) * 100) / 100} %
                  </UniqueText>
                  <DetailText>평점 {userProfile.nowProjectScore}의 별점</DetailText>
                  <MypageChartIcon src={ChartIcon}></MypageChartIcon>
                </StaticContainer>
              )}
              <AIReportContainer>
                <AIReport />
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
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </div>
  );
}
