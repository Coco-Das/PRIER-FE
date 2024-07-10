import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BlueDiv,
  CreateWrapper,
  CustomButton,
  GreenDiv,
  OrangeDiv,
  OrangeInputDiv,
  ProjectDiv,
  ProjectIntro,
  ProjectTextArea,
  Project,
  TagWrapper,
  Tag,
  WhiteDiv,
  BlueInputDiv,
  ImageWrapper,
  StyledImg,
  DeleteButton,
  EditButton,
  CommentBtn,
} from './ResponseTestStyles';
import { API_BASE_URL } from '../../../const/TokenApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import StarRating from '../../../components/utils/StarRating';
import CustomAlert from '../../../components/utils/CustomAlert';
import CustomModal from '../../../components/utils/CustomModal';
import styled from 'styled-components';
import { Comment } from '../comment/Comment';
import { useUserStore } from '../../../states/user/UserStore';
import Snackbar from '../../../components/user/Snackbar';
import DeletePng from '../../../assets/delete.png';
import EditPng from '../../../assets/edit.png';
import LinkImg from '../../../assets/link_gray.png';
import Deadline from '../../../assets/deadline.png';
import { Loading } from '../../../components/utils/Loading';

interface Tag {
  tagName: string;
  color: string;
}
interface Media {
  id: number;
  main: boolean;
  mediaType: string;
  metadata: string;
  orderIndex: number;
  url: string;
}
const ButtonContainer = styled.div`
  position: relative;
  width: 30%;
`;

export const ResponseTest = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [isMine, setIsMine] = useState(false);
  const [link, setLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamMate, setTeamMate] = useState('');
  const [teamName, setTeamName] = useState('');
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [alert, setAlert] = useState(false);
  const [comment, setCommnet] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const userProfile = useUserStore(state => state.userProfile);
  const storedUserId = localStorage.getItem('userId');
  // const USER_ID = storedUserId ? Number(storedUserId) : null;
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { editBoolean } = location.state || { editBoolean: false };
  const { createBoolean } = location.state || { createBoolean: false };
  const { extendBoolean } = location.state || { extendBoolean: false };

  useEffect(() => {
    if (editBoolean) {
      setSnackbar({ message: '프로젝트가 수정되었습니다', type: 'success' });
    } else if (createBoolean) {
      setSnackbar({ message: '프로젝트가 등록되었습니다', type: 'success' });
    } else if (extendBoolean) {
      setSnackbar({ message: '연장되었습니다', type: 'success' });
    }
  }, [editBoolean, createBoolean, extendBoolean]);

  const saveTagColors = (tags: Tag[]) => {
    const tagColors: { [key: string]: string } = {};
    tags.forEach(tag => {
      tagColors[tag.tagName] = tag.color;
    });
    localStorage.setItem('tagColors', JSON.stringify(tagColors));
  };

  const getTagColors = (): { [key: string]: string } => {
    const tagColors = localStorage.getItem('tagColors');
    return tagColors ? JSON.parse(tagColors) : {};
  };
  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
      handleGetInfo();
    }
  }, [projectId, setProjectId]);

  //정보 가져오기
  const handleGetInfo = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const response = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;

      setTeamName(Data.teamName);
      setTitle(Data.title);
      setIntroduce(Data.introduce.replace(/\n/g, '<br />'));
      setTeamDescription(Data.teamDescription);
      setGoal(Data.goal.replace(/\n/g, '<br />'));
      setStartDate(Data.startDate);
      setEndDate(Data.endDate);
      setTeamMate(Data.teamMate.replace(/\n/g, '<br />'));
      const storedColors = getTagColors();
      const tagsWithColors = Data.tags.map((tag: { tagName: string }) => {
        const color = storedColors[tag.tagName] || getRandomColor();
        if (!storedColors[tag.tagName]) {
          storedColors[tag.tagName] = color;
        }
        return { tagName: tag.tagName, color };
      });
      setTags(tagsWithColors);
      saveTagColors(tagsWithColors);
      setStatus(Data.status);
      setLink(Data.link);
      setIsMine(Data.isMine);
      const mainMedia = Data.media.find((item: Media) => item.main);
      setMainImageUrl(mainMedia ? mainMedia.url : null);
      const addMedia = Data.media.filter((item: Media) => !item.main);
      setAdditionalImageUrls(addMedia.map((item: Media) => item.url));
      setFeedback(formatDateTime(Data.feedbackEndDate));

      setLoading(false); // 데이터 가져온 후 로딩 상태 해제
    } catch (error) {
      setLoading(false); // 데이터 가져온 후 로딩 상태 해제
      if (error instanceof AxiosError) {
        // console.log(error.response?.status);
        setAlert(true);
        const timer = setTimeout(() => {
          setAlert(false);
          navigate('/main'); // 메인 페이지로 이동
        }, 800);
        return () => clearTimeout(timer);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, [projectId]);

  if (!projectId) {
    console.log(projectId);
    return <div>Loading...</div>;
  }

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
  const handleDelete = async () => {
    setShowAlert(true);
    try {
      const response = await API_BASE_URL.delete(`/projects/${projectId}`);
      console.log('삭제 요청 성공', response.data);
      navigate(`/main`);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);

    // 9시간을 더한 새로운 Date 객체 생성
    date.setHours(date.getHours() + 9);

    // 한국 시간으로 포맷
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric', // 연도를 포함하려면 추가
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // 초를 포함하려면 추가
      hour12: false, // 24시간 형식
      timeZone: 'Asia/Seoul',
    }).format(date);
  };

  //모달창에 전달할 연장하기 버튼의 위치
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top - 290, left: rect.left - 160 });
    }
    setShowModal(true);
  };

  const handleRatingChange = (newScore: number) => {
    setScore(newScore);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommnet(e.target.value);
  };
  const handleCommentSubmit = async () => {
    if (!comment || !score) {
      setSnackbar({ message: '빈칸이 있습니다.', type: 'error' });
      return;
    }
    const jsonData = { comment, score };
    try {
      const response = await API_BASE_URL.post(`/projects/${projectId}/comment`, jsonData);
      setSnackbar({ message: '댓글이 등록되었습니다', type: 'success' });
    } catch (error) {
      console.error('에러:', error);
      setSnackbar({ message: '댓글 등록이 실패하였습니다', type: 'error' });
    }
    setCommnet('');
    handleRatingChange(0);
  };

  const handleClick = () => {
    const formattedLink = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
    window.open(formattedLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {loading && <Loading />}
      <CreateWrapper>
        <Project>
          {alert && <CustomAlert message="없는 페이지입니다." showButtons={false} />}
          <ProjectDiv>
            <div
              className="mt-4"
              style={{
                display: 'flex',
                alignItems: 'center',
                wordWrap: 'break-word',
                width: '100%',
              }}
            >
              <span className="ml-4 font-bold" style={{ wordBreak: 'break-word' }}>
                안녕하세요 <span>{userProfile.nickname} 님</span>, <span style={{ color: '#315AF1' }}>{teamName}</span>
                의 <span style={{ color: '#23BE87' }}>{title}</span> 프로젝트 입니다.
              </span>
            </div>
            <ProjectTextArea className="mt-2">
              <p
                style={{
                  fontSize: '14px',
                  marginLeft: 'auto',
                  color: '#828282',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {feedback}
                <img style={{ height: '20px', width: '20px' }} src={Deadline} />
              </p>
              <p className="font-extrabold">프로젝트 소개</p>
              <span className="mt-3" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: introduce }} />
              <p className="font-extrabold mt-5">프로젝트 목표</p>
              <span className="mt-3" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: goal }} />
              <ImageWrapper className="mt-3">
                {mainImageUrl && <StyledImg src={mainImageUrl} alt="메인 이미지" />}

                {additionalImageUrls.map((url, index) => (
                  <StyledImg key={index} src={url} alt={`추가 이미지 ${index + 1}`} />
                ))}
              </ImageWrapper>
            </ProjectTextArea>
          </ProjectDiv>
          <ProjectIntro>
            {isMine && (
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', marginLeft: 'auto', gap: '15px', alignItems: 'center' }}>
                  <EditButton src={EditPng} onClick={() => navigate(`/editproject/${projectId}`)} />
                  <DeleteButton src={DeletePng} onClick={() => setShowAlert(true)} />
                  {showAlert && (
                    <CustomAlert
                      message="삭제하시겠습니까?"
                      onConfirm={handleDelete}
                      onCancel={() => {
                        setShowAlert(false);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            <TagWrapper $isMine={isMine}>
              {tags.map((tag, index) => (
                <Tag key={index} $bgColor={tag.color}>
                  {tag.tagName}
                </Tag>
              ))}
            </TagWrapper>
            <OrangeDiv>
              <span className="font-bold">개발일정</span>
              <OrangeInputDiv>
                <span style={{ color: '#828282' }}>
                  프로젝트 기간: <span>{startDate}</span> ~ <span>{endDate}</span>
                </span>
              </OrangeInputDiv>
              <OrangeInputDiv>
                <span>
                  진행단계: <span>{getStatusText(status)}</span>
                </span>
              </OrangeInputDiv>
            </OrangeDiv>
            <BlueDiv className="mt-2">
              <span className="font-bold">팀소개</span>
              <BlueInputDiv>
                <span style={{ fontSize: '18px' }}>{teamName}</span>
                <span>{teamDescription}</span>
                <span dangerouslySetInnerHTML={{ __html: teamMate }}></span>
              </BlueInputDiv>
            </BlueDiv>
            {link && (
              <GreenDiv className="mt-2" onClick={handleClick}>
                <img style={{ width: '18px', height: '18px' }} src={LinkImg} />
                <span
                  className="underline"
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {link}
                </span>
              </GreenDiv>
            )}
            <WhiteDiv className="mt-2">
              <div style={{ display: 'flex', height: 'auto' }}>
                <span className="font-bold">댓글 달기</span>
                {!isMine && <StarRating initialScore={score} onRatingChange={handleRatingChange} />}
              </div>
              {isMine ? (
                <textarea
                  style={{ padding: '5px 10px', outline: 'none', marginTop: '5px', resize: 'none' }}
                  placeholder="전체 댓글을 눌러 댓글을 확인해보세요!"
                  readOnly
                />
              ) : (
                <textarea
                  style={{ padding: '5px 10px', outline: 'none', marginTop: '5px', resize: 'none' }}
                  placeholder="한줄 평"
                  value={comment}
                  onChange={handleCommentChange}
                />
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '20px',
                  height: '25%',
                  marginTop: 'auto',
                }}
              >
                <CommentBtn onClick={() => setShowSidebar(true)}>전체댓글</CommentBtn>
                {!isMine && <CommentBtn onClick={handleCommentSubmit}>등록</CommentBtn>}
              </div>
            </WhiteDiv>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px' }}>
              {isMine && (
                <ButtonContainer>
                  <CustomButton style={{ width: '100%' }} ref={buttonRef} onClick={handleMouseEnter}>
                    연장하기
                  </CustomButton>
                  {showModal && buttonPosition && (
                    <CustomModal
                      top={buttonPosition.top}
                      left={buttonPosition.left}
                      onCancel={() => setShowModal(false)}
                      onMouseLeave={() => setShowModal(false)}
                      onExtend={handleGetInfo}
                    />
                  )}
                </ButtonContainer>
              )}

              {!isMine ? (
                <CustomButton
                  style={{ marginLeft: 'auto', width: '30%' }}
                  onClick={() => navigate(`/responsequestions/${projectId}`)}
                >
                  테스트폼 참여하기
                </CustomButton>
              ) : (
                <CustomButton
                  style={{ marginLeft: 'auto', width: '30%' }}
                  onClick={() => navigate(`/feedback/${projectId}`)}
                >
                  피드백 상세보기
                </CustomButton>
              )}
            </div>
          </ProjectIntro>
        </Project>
        <Comment show={showSidebar} onMouseLeave={() => setShowSidebar(false)} isMine={isMine}></Comment>
        {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
      </CreateWrapper>
    </>
  );
};
