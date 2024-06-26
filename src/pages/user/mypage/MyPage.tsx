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
  TitleText,
  ProfileAccountContainer,
  CorrectText,
  AIReportContainer,
  ProfileText,
  StyledInput,
  AccountLink,
  AccountIcon,
  EditAccountText,
  EmptyContainer,
  ProfileDetail,
  AccountGithub,
  ProfileImgContainer,
  EditOverlay,
  EditingOverlay,
  StyledProfile,
  StaticOverlay,
} from './MyPageStyle';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
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
  SendQuest,
} from '../../../services/UserApi';
import { useUserStore } from '../../../states/user/UserStore';
import CustomAlert from '../../../components/utils/CustomAlert';
import BlogIcon from '../../../assets/blog.png';
import GithubIcon from '../../../assets/github.png';
import FigmaIcon from '../../../assets/figma.png';
import NotionIcon from '../../../assets/notion.png';
import AccountEdit from '../../../components/user/AccountEdit';
import AIReport from '../../../components/utils/AIReport';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material';
import QuestSuccess from '../../../components/user/QuestSuccess';
import Snackbar from '../../../components/user/Snackbar';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F3F8FF',
    color: '#4188FE',
    borderRounded: '10px',
    border: '1px solid #CEE7FF',
    fontSize: 12,
  },
}));
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
export default function MyPage() {
  const navigate = useNavigate();
  const userProfile = useUserStore(state => state.userProfile);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showEditImgAlert, setShowEditImgAlert] = useState(false);
  const [isEditingImg, setIsEditingImg] = useState(false);
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await FetchMyPage();
      } catch (error) {
        console.error('마이 페이지 호출 실패:', error);
      }
    };
    fetchData();
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
    navigate('/firstmain');
  };
  //이미지 수정
  const setEditImg = () => {
    setIsEditingImg(true);
    setShowEditImgAlert(true);
  };
  const CancelEditImg = () => {
    setIsEditingImg(false);
    setShowEditImgAlert(false);
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
      setShowEditBlogAlert(false);
    } catch (error) {
      alert('블로그 주소 수정 실패');
    }
  };
  const cancleEditBlog = () => {
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
      setShowEditGithubAlert(false);
    } catch (error) {
      alert('깃허브 주소 수정 실패');
    }
  };
  const cancleEditGithub = () => {
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
      setShowEditFigmaAlert(false);
    } catch (error) {
      alert('피그마 주소 수정 실패');
    }
  };
  const cancleEditFigma = () => {
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
      setShowEditNotionAlert(false);
    } catch (error) {
      alert('노션 주소 수정 실패');
    }
  };
  const cancleEditNotion = () => {
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
      setShowEditIntroAlert(false);
    } catch (error) {
      alert('자기소개 수정 중 오류 발생:');
    }
  };
  const cancleEditIntro = () => {
    setIsEditingIntro(false);
    setShowEditIntroAlert(false);
    setNewIntro('');
  };

  //퀘스트
  const QuestClick = async (sequence: '1' | '2' | '3') => {
    const userProfile = useUserStore.getState().userProfile;
    if (
      (sequence === '1' && userProfile.firstQuest) ||
      (sequence === '2' && userProfile.secondQuest) ||
      (sequence === '3' && userProfile.thirdQuest)
    ) {
      setSnackbar({ message: '퀘스트가 이미 완료되었습니다.', type: 'error' });
      return;
    }
    const success = await SendQuest(sequence);
    if (success === '퀘스트가 성공적으로 업데이트되었습니다.') {
      useUserStore.getState().setQuest(sequence);
      setShowSuccess(true);
    } else {
      setSnackbar({ message: `${success}`, type: 'error' });
    }
  };
  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
    <div className="flex-col overflow-hidden" style={{ margin: '1% 4% 0 4%' }}>
      {showLogoutAlert && (
        <CustomAlert message="정말 로그아웃 하시겠습니까?" onConfirm={Logout} onCancel={CancelLogout} />
      )}
      {showEditImgAlert && (
        <AccountEdit message="프로필 이미지를 변경하시겠습니까?" onConfirm={CancelEditImg} onCancel={CancelEditImg} />
      )}
      {showEditNameAlert && (
        <CustomAlert message="닉네임을 수정 하시겠습니까?" onConfirm={saveEditName} onCancel={cancleEditName} />
      )}
      {showEditBelongingAlert && (
        <CustomAlert message="소속을 수정 하시겠습니까?" onConfirm={saveEditBelonging} onCancel={cancleEditBelonging} />
      )}

      {showEditBlogAlert && (
        <AccountEdit
          message="블로그 주소를 수정 하시겠습니까?"
          onConfirm={saveEditBlog}
          onCancel={cancleEditBlog}
          onInput={BlogInputChange}
        />
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

      <div className="flex w-full h-[40%] mb-5">
        <ProfileContainer>
          {isEditingImg ? (
            <ProfileImgContainer>
              <StyledProfile src={userProfile.imgUrl} alt="Profile" />
              <EditingOverlay></EditingOverlay>
            </ProfileImgContainer>
          ) : (
            <ProfileImgContainer>
              <StyledProfile src={userProfile.imgUrl} alt="Profile" />
              <EditOverlay className="edit-overlay" onClick={setEditImg}>
                <ModeEditOutlineRoundedIcon color="inherit" />
              </EditOverlay>
            </ProfileImgContainer>
          )}

          <div className="flex-col mt-3 w-full">
            <div className="w-full flex items-center justify-between ml-[10px]">
              <Title>반갑습니다 {userProfile.nickname} 님</Title>
              <CorrectText onClick={ConfirmLogout}>로그아웃</CorrectText>
            </div>
            {isEditingName ? (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>이름 : </ProfileText>
                  <StyledInput type="text" value={newNickName} onChange={NickNameInputChange}></StyledInput>
                </span>
                <CorrectText onClick={ConfirmEditName}>확인</CorrectText>
              </ProfileTextContainer>
            ) : (
              <ProfileTextContainer>
                <span className="flex">
                  <ProfileText>이름 : </ProfileText>
                  <ProfileDetail> {userProfile.nickname} </ProfileDetail>
                </span>
                <CorrectText onClick={setEditName}>수정하기</CorrectText>
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
                  <ProfileDetail> {userProfile.belonging} </ProfileDetail>
                </span>
                <CorrectText onClick={setEditBelonging}>수정하기</CorrectText>
              </ProfileTextContainer>
            )}
            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>등급 : </ProfileText>
                <ProfileDetail>{userProfile.rank} </ProfileDetail>
              </span>
            </ProfileTextContainer>

            <ProfileTextContainer>
              <span className="flex">
                <ProfileText>계정 : </ProfileText>
                <ProfileDetail> {userProfile.email} </ProfileDetail>
              </span>
            </ProfileTextContainer>

            <ProfileAccountContainer>
              <div className="flex items-center gap-5">
                {isEditingBlog ? (
                  <EditAccountText onClick={ConfirmEditBlog}>
                    <AccountIcon src={BlogIcon}></AccountIcon>
                  </EditAccountText>
                ) : (
                  <AccountTooltip title="Blog" placement="bottom">
                    <AccountLink href={userProfile.blog ?? ''} target="_blank">
                      <AccountIcon src={BlogIcon}></AccountIcon>
                    </AccountLink>
                  </AccountTooltip>
                )}
                {isEditingGithub ? (
                  <EditAccountText onClick={ConfirmEditGithub}>
                    <AccountGithub src={GithubIcon}></AccountGithub>
                  </EditAccountText>
                ) : (
                  <AccountTooltip title="Github" placement="bottom">
                    <AccountLink href={userProfile.github ?? ''} target="_blank">
                      <AccountGithub src={GithubIcon}></AccountGithub>
                    </AccountLink>
                  </AccountTooltip>
                )}
                {isEditingFigma ? (
                  <EditAccountText onClick={ConfirmEditFigma}>
                    <AccountIcon src={FigmaIcon}></AccountIcon>
                  </EditAccountText>
                ) : (
                  <AccountTooltip title="Figma" placement="bottom">
                    <AccountLink href={userProfile.figma ?? ''} target="_blank">
                      <AccountIcon src={FigmaIcon}></AccountIcon>
                    </AccountLink>
                  </AccountTooltip>
                )}
                {isEditingNotion ? (
                  <div onClick={ConfirmEditNotion}>
                    <AccountIcon src={NotionIcon}></AccountIcon>
                  </div>
                ) : (
                  <AccountTooltip title="Notion" placement="bottom">
                    <AccountLink href={userProfile.notion ?? ''} target="_blank">
                      <AccountIcon src={NotionIcon}></AccountIcon>
                    </AccountLink>
                  </AccountTooltip>
                )}
              </div>
              {isEditingAccount ? (
                <CorrectText onClick={cancleEditingAccount}>수정 모드 끝내기</CorrectText>
              ) : (
                <CorrectText onClick={EditAccount}>수정하기</CorrectText>
              )}
            </ProfileAccountContainer>
          </div>
        </ProfileContainer>
        <div className="flex-col w-[50%]">
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
              <h1 className="text-2xl font-semibold">{userProfile.intro}</h1>
              <CorrectText className="text-end" onClick={setEditIntro}>
                수정하기
              </CorrectText>
            </IntroduceContainer>
          )}
          <QuestContainer>
            <h1 className="mb-5 cursor-pointer">오늘의 퀘스트</h1>
            <StepsContainer>
              <LightTooltip title="+ 1코어" placement="top">
                <Step onClick={() => QuestClick('1')}>
                  <StepLabel completed={userProfile.firstQuest === true}>출석하기</StepLabel>
                  <StepCircle completed={userProfile.firstQuest === true} color="#8e8ae3" />
                </Step>
              </LightTooltip>
              <StepLine />
              <LightTooltip title="+ 2코어" placement="top">
                <Step onClick={() => QuestClick('2')}>
                  <StepLabel completed={userProfile.secondQuest === true}>댓글 작성하기</StepLabel>
                  <StepCircle completed={userProfile.secondQuest === true} color="#f4c542" />
                </Step>
              </LightTooltip>
              <StepLine />
              <LightTooltip title="+ 3코어" placement="top">
                <Step onClick={() => QuestClick('3')}>
                  <StepLabel completed={userProfile.thirdQuest === true}>피드백 참여하기</StepLabel>
                  <StepCircle completed={userProfile.thirdQuest === true} color="#4188FE" />
                </Step>
              </LightTooltip>
            </StepsContainer>
          </QuestContainer>
          {showSuccess && <QuestSuccess onClose={closeSuccessMessage} />}
        </div>
      </div>
      <div className="flex w-screen h-[60%]">
        <ProjectContainer>
          <div className="flex w-full justify-between items-center">
            <Title>진행 중인 프로젝트</Title>
            <Link to={`/testlist/${localStorage.getItem('userId')}`}>
              <LinkText>내 프로젝트 &gt;</LinkText>
            </Link>
          </div>
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
              {userProfile.nowProjectFeedbackCount === 0 ? (
                <StaticContainer className="relative">
                  <TitleText>통계</TitleText>
                  <UniqueText>평점</UniqueText>
                  <UniqueText>80 % </UniqueText>
                  <DetailText>평점 4의 별점</DetailText>
                  <MypageChartIcon></MypageChartIcon>
                  <StaticOverlay>제출된 피드백이 없습니다.</StaticOverlay>
                </StaticContainer>
              ) : (
                <StaticContainer>
                  <TitleText>통계</TitleText>
                  <UniqueText>평점</UniqueText>
                  <UniqueText>
                    {Math.round(parseFloat(userProfile.nowProjectStaticPercentage) * 100) / 100} %
                  </UniqueText>
                  <DetailText>평점 {userProfile.nowProjectScore}의 별점</DetailText>
                  <MypageChartIcon></MypageChartIcon>
                </StaticContainer>
              )}

              <AIReportContainer>
                <AIReport />
              </AIReportContainer>
            </div>
          ) : (
            <Link to="/createtest">
              <EmptyContainer>
                <p>생성한 테스트가 없습니다.</p>
                <p className="text-end hover:text-[#315af1] mt-[5%]">테스트 생성하기 &gt;</p>
              </EmptyContainer>
            </Link>
          )}
        </ProjectContainer>
        <ReviewWrapper>
          <Title>{userProfile.nickname} 님의 리뷰</Title>
          <span className="max-h-[80%] overflow-y-auto">
            <MyReview />
          </span>
        </ReviewWrapper>
      </div>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </div>
  );
}
