import React, { useEffect, useState } from 'react';
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
  CorrectText,
  AIReportContainer,
  ProfileText,
  StyledInput,
  AccountLink,
  AccountIcon,
  EditAccountText,
} from './MyPageStyle';
import { ReactComponent as TeamProfile } from '../../../assets/MainAvatar.svg';
import { Title } from '../../main/MainStyle';
import { LinkText } from '../../../components/user/UserStyle';
import { Link, useNavigate } from 'react-router-dom';
import MyReview from '../../../components/user/MyReview';
import {
  EditBelonging,
  EditBlog,
  EditFigma,
  EditGithub,
  EditIntro,
  EditNickName,
  EditNotion,
  FetchLogout,
  FetchMyPage,
} from '../../../services/UserApi';
import { useUserStore } from '../../../states/user/UserStore';
import CustomAlert from '../../../components/utils/CustomAlert';
import BlogIcon from '../../../assets/blog.png';
import GithubIcon from '../../../assets/github.png';
import FigmaIcon from '../../../assets/figma.png';
import NotionIcon from '../../../assets/notion.png';
import AccountEdit from '../../../components/user/AccountEdit';

export default function MyPage() {
  const navigate = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showEditNameAlert, setShowEditNameAlert] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newNickName, setNewNickName] = useState<string>('');
  const [showEditBelongingAlert, setShowEditBelongingAlert] = useState(false);
  const [isEditingBelonging, setIsEditingBelonging] = useState(false);
  const [newBelonging, setNewBelonging] = useState<string>('');
  const [showEditBlogAlert, setShowEditBlogAlert] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [newBlog, setNewBlog] = useState<string>('');
  const [showEditGithubAlert, setShowEditGithubAlert] = useState(false);
  const [isEditingGithub, setIsEditingGithub] = useState(false);
  const [newGithub, setNewGithub] = useState<string>('');
  const [showEditFigmaAlert, setShowEditFigmaAlert] = useState(false);
  const [isEditingFigma, setIsEditingFigma] = useState(false);
  const [newFigma, setNewFigma] = useState<string>('');
  const [showEditNotionAlert, setShowEditNotionAlert] = useState(false);
  const [isEditingNotion, setIsEditingNotion] = useState(false);
  const [newNotion, setNewNotion] = useState<string>('');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [showEditIntroAlert, setShowEditIntroAlert] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [newIntro, setNewIntro] = useState<string>('');
  const UseFetchLogout = FetchLogout();

  useEffect(() => {
    // FetchMyPage();
  }, []);
  //로그아웃
  const ConfirmLogout = () => {
    setShowLogoutAlert(true);
  };
  const CancelLogout = () => {
    setShowLogoutAlert(false);
  };
  const Logout = async () => {
    setShowLogoutAlert(false);
    await UseFetchLogout();
    navigate('/login');
  };

  //닉네임 수정
  const NickNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickName(event.target.value);
  };
  const setEditName = () => {
    setIsEditingName(true);
  };
  const ConfirmEditName = () => {
    setShowEditNameAlert(true);
  };
  const saveEditName = async () => {
    try {
      await EditNickName(newNickName);
      setIsEditingName(false);
      setShowEditNameAlert(false);
    } catch (error) {
      alert('닉네임 수정 중 오류 발생:');
    }
  };
  const cancleEditName = () => {
    setIsEditingName(false);
    setShowEditNameAlert(false);
    setNewNickName('');
  };
  //소속 수정
  const BelongingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBelonging(event.target.value);
  };
  const setEditBelonging = () => {
    setIsEditingBelonging(true);
  };
  const ConfirmEditBelonging = () => {
    setShowEditBelongingAlert(true);
  };
  const saveEditBelonging = async () => {
    try {
      await EditBelonging(newBelonging);
      setIsEditingBelonging(false);
      setShowEditBelongingAlert(false);
    } catch (error) {
      alert('소속 수정 중 오류 발생:');
    }
  };
  const cancleEditBelonging = () => {
    setIsEditingBelonging(false);
    setShowEditBelongingAlert(false);
    setNewBelonging('');
  };

  //블로그 수정
  const BlogInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBlog(event.target.value);
  };
  const setEditBlog = () => {
    setIsEditingBlog(true);
  };
  const ConfirmEditBlog = () => {
    setShowEditBlogAlert(true);
  };
  const saveEditBlog = async () => {
    try {
      await EditBlog(newBlog);
      setIsEditingBlog(false);
      setShowEditBlogAlert(false);
    } catch (error) {
      alert('블로그 주소 수정 실패');
    }
  };
  const cancleEditBlog = () => {
    setIsEditingBlog(false);
    setShowEditBlogAlert(false);
    setNewBlog('');
  };
  //깃허브 수정
  const GithubInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGithub(event.target.value);
  };
  const setEditGithub = () => {
    setIsEditingGithub(true);
  };
  const ConfirmEditGithub = () => {
    setShowEditGithubAlert(true);
  };
  const saveEditGithub = async () => {
    try {
      await EditGithub(newGithub);
      setIsEditingGithub(false);
    } catch (error) {
      alert('깃허브 주소 수정 실패');
    }
  };
  const cancleEditGithub = () => {
    setIsEditingGithub(false);
    setShowEditGithubAlert(false);
    setNewGithub('');
  };
  //피그마 수정
  const FigmaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFigma(event.target.value);
  };
  const setEditFigma = () => {
    setIsEditingFigma(true);
  };
  const ConfirmEditFigma = () => {
    setShowEditFigmaAlert(true);
  };
  const saveEditFigma = async () => {
    try {
      await EditFigma(newFigma);
      setIsEditingFigma(false);
    } catch (error) {
      alert('피그마 주소 수정 실패');
    }
  };
  const cancleEditFigma = () => {
    setIsEditingFigma(false);
    setShowEditFigmaAlert(false);
    setNewFigma('');
  };
  //노션 수정
  const NotionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNotion(event.target.value);
  };
  const setEditNotion = () => {
    setIsEditingNotion(true);
  };
  const ConfirmEditNotion = () => {
    setShowEditNotionAlert(true);
  };
  const saveEditNotion = async () => {
    try {
      await EditNotion(newNotion);
      setIsEditingNotion(false);
    } catch (error) {
      alert('노션 주소 수정 실패');
    }
  };
  const cancleEditNotion = () => {
    setIsEditingNotion(false);
    setShowEditNotionAlert(false);
    setNewNotion('');
  };
  const EditAccount = () => {
    setIsEditingAccount(true);
    setEditBlog();
    setEditGithub();
    setEditFigma();
    setEditNotion();
  };
  const cancleEditingAccount = () => {
    setIsEditingAccount(false);
    setIsEditingBlog(false);
    setIsEditingGithub(false);
    setIsEditingFigma(false);
    setIsEditingNotion(false);
  };

  //자기 소개 수정
  const IntroInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIntro(event.target.value);
  };
  const setEditIntro = () => {
    setIsEditingIntro(true);
  };
  const ConfirmEditIntro = () => {
    setShowEditIntroAlert(true);
  };
  const saveEditIntro = async () => {
    try {
      await EditIntro(newIntro);
      setIsEditingIntro(false);
    } catch (error) {
      alert('자기소개 수정 중 오류 발생:');
    }
  };
  const cancleEditIntro = () => {
    setIsEditingIntro(false);
    setShowEditIntroAlert(false);
    setNewIntro('');
  };
  return (
    <div className="flex-col" style={{ margin: '1% 7%' }}>
      {showLogoutAlert && (
        <CustomAlert message="정말 로그아웃 하시겠습니까?" onConfirm={Logout} onCancel={CancelLogout} />
      )}
      {showEditNameAlert && (
        <CustomAlert message="닉네임을 수정 하시겠습니까?" onConfirm={saveEditName} onCancel={cancleEditName} />
      )}
      {showEditBelongingAlert && (
        <CustomAlert message="소속을 수정 하시겠습니까?" onConfirm={saveEditBelonging} onCancel={cancleEditBelonging} />
      )}
      {showEditBlogAlert && (
        <>
          <AccountEdit
            message="블로그 주소를 수정 하시겠습니까?"
            onConfirm={saveEditBlog}
            onCancel={cancleEditBlog}
            onInput={BlogInputChange}
          />
        </>
      )}
      {showEditGithubAlert && (
        <AccountEdit
          message="Github 주소를 수정 하시겠습니까?"
          onConfirm={saveEditGithub}
          onCancel={cancleEditGithub}
          onInput={GithubInputChange}
        />
      )}
      {showEditFigmaAlert && (
        <AccountEdit
          message="Figma 주소를 수정 하시겠습니까?"
          onConfirm={saveEditFigma}
          onCancel={cancleEditFigma}
          onInput={FigmaInputChange}
        />
      )}
      {showEditNotionAlert && (
        <AccountEdit
          message="Notion 주소를 수정 하시겠습니까?"
          onConfirm={saveEditNotion}
          onCancel={cancleEditNotion}
          onInput={NotionInputChange}
        />
      )}
      {showEditIntroAlert && (
        <CustomAlert message="한 줄 소개를 수정 하시겠습니까?" onConfirm={saveEditIntro} onCancel={cancleEditIntro} />
      )}

      <div className="flex w-full">
        <ProfileContainer>
          <StyledUserIcon></StyledUserIcon>
          <div className="flex-col mt-3 w-full">
            <span className="flex items-center justify-between">
              <Title>반갑습니다 {userProfile.nickname} 님</Title>
              <CorrectText onClick={ConfirmLogout}>로그 아웃</CorrectText>
            </span>

            {isEditingName ? (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>닉네임 : </ProfileText>
                  <StyledInput type="text" value={newNickName} onChange={NickNameInputChange}></StyledInput>
                </span>
                <CorrectText onClick={ConfirmEditName}>확인</CorrectText>
              </ProfileTextContainer>
            ) : (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>닉네임 : </ProfileText>
                  <ProfileText> {userProfile.nickname} </ProfileText>
                </span>
                <CorrectText onClick={setEditName}>수정 하기</CorrectText>
              </ProfileTextContainer>
            )}
            {isEditingBelonging ? (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>소속: </ProfileText>
                  <StyledInput type="text" value={newBelonging} onChange={BelongingInputChange}></StyledInput>
                </span>
                <CorrectText onClick={ConfirmEditBelonging}>확인</CorrectText>
              </ProfileTextContainer>
            ) : (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>소속 : </ProfileText>
                  <ProfileText> {userProfile.belonging} </ProfileText>
                </span>
                <CorrectText onClick={setEditBelonging}>수정 하기</CorrectText>
              </ProfileTextContainer>
            )}
            <ProfileTextContainer>
              <ProfileText>등급 : </ProfileText>
              <ProfileText>{userProfile.rank} </ProfileText>
            </ProfileTextContainer>
            <ProfileTextContainer>
              <ProfileText>계정 정보 : {userProfile.email}</ProfileText>
            </ProfileTextContainer>
            <ProfileAccountContainer>
              <div className="flex items-center gap-5">
                {isEditingBlog ? (
                  <EditAccountText onClick={ConfirmEditBlog}>
                    <AccountIcon src={BlogIcon}></AccountIcon>
                    Blog
                  </EditAccountText>
                ) : (
                  <AccountLink href={userProfile.blog} target="_blank">
                    <AccountIcon src={BlogIcon}></AccountIcon>
                    Blog
                  </AccountLink>
                )}
                {isEditingGithub ? (
                  <EditAccountText onClick={ConfirmEditGithub}>
                    <AccountIcon src={GithubIcon}></AccountIcon>
                    Github
                  </EditAccountText>
                ) : (
                  <AccountLink href={userProfile.github} target="_blank">
                    <AccountIcon src={GithubIcon}></AccountIcon>
                    Github
                  </AccountLink>
                )}
                {isEditingFigma ? (
                  <EditAccountText onClick={ConfirmEditFigma}>
                    <AccountIcon src={FigmaIcon}></AccountIcon>
                    Figma
                  </EditAccountText>
                ) : (
                  <AccountLink href={userProfile.figma} target="_blank">
                    <AccountIcon src={FigmaIcon}></AccountIcon>
                    Figma
                  </AccountLink>
                )}
                {isEditingNotion ? (
                  <EditAccountText onClick={ConfirmEditNotion}>
                    <AccountIcon src={NotionIcon}></AccountIcon>
                    Notion
                  </EditAccountText>
                ) : (
                  <AccountLink href={userProfile.notion} target="_blank">
                    <AccountIcon src={NotionIcon}></AccountIcon>
                    Notion
                  </AccountLink>
                )}
              </div>
              {isEditingAccount ? (
                <CorrectText className="text-end" onClick={cancleEditingAccount}>
                  수정 모드 끝내기
                </CorrectText>
              ) : (
                <CorrectText className="text-end" onClick={EditAccount}>
                  수정 하기
                </CorrectText>
              )}
            </ProfileAccountContainer>
          </div>
        </ProfileContainer>
        <div className="flex-col" style={{ width: '50%' }}>
          {isEditingIntro ? (
            <IntroduceContainer>
              <p className="text-base mb-2 cursor-pointer">자신을 한줄로 소개</p>
              <StyledInput type="text" value={newIntro} onChange={IntroInputChange}></StyledInput>
              <CorrectText className="text-end" onClick={ConfirmEditIntro}>
                확인
              </CorrectText>
            </IntroduceContainer>
          ) : (
            <IntroduceContainer>
              <p className="text-base mb-2 cursor-pointer">자신을 한줄로 소개</p>
              <h1 className="text-2xl font-semibold">{userProfile.intro}안녕하세요</h1>
              <CorrectText className="text-end" onClick={setEditIntro}>
                수정하기
              </CorrectText>
            </IntroduceContainer>
          )}
          <QuestContainer>
            <h1 className="mb-2 cursor-pointer">오늘의 퀘스트</h1>
            <StepsContainer>
              <Step>
                <StepLabel completed={parseInt(userProfile.quest) >= 1}>출석하기</StepLabel>
                <StepCircle completed={parseInt(userProfile.quest) >= 1} color="#8e8ae3" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={parseInt(userProfile.quest) >= 2}>댓글 작성하기</StepLabel>
                <StepCircle completed={parseInt(userProfile.quest) >= 2} color="#f4c542" />
              </Step>
              <StepLine />
              <Step>
                <StepLabel completed={parseInt(userProfile.quest) >= 3}>피드백 참여하기</StepLabel>
                <StepCircle completed={parseInt(userProfile.quest) >= 3} color="#4188FE" />
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
            <div className="flex-col">
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
                <Link to="/feedback">
                  <TitleText>제출된 피드백</TitleText>
                  <UniqueText>34</UniqueText>
                  <DetailText>+ {} 34개의 피드백이 추가로 제출되었습니다.</DetailText>
                  <LinkText className="text-end">모아보기 &gt;</LinkText>
                </Link>
              </FeedbackContainer>
            </div>
            <StaticContainer>
              <TitleText>통계</TitleText>
              <UniqueText>평점</UniqueText>
              <UniqueText>{userProfile.statistic} % </UniqueText>
              <DetailText>평점 4의 별점</DetailText>
              <MypageChartIcon></MypageChartIcon>
            </StaticContainer>
            <AIReportContainer>
              <div className="flex gap-4">
                <TitleText>AI 분석 Report</TitleText>
                <StyledGraphIcon></StyledGraphIcon>
              </div>
            </AIReportContainer>
          </div>
        </ProjectContainer>
        <ReviewWrapper>
          <Title>{userProfile.nickname} 님의 리뷰</Title>
          <ul>
            <MyReview />
          </ul>
        </ReviewWrapper>
      </div>
    </div>
  );
}
