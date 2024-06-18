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
} from './ResponseTestStyles';
import { API_BASE_URL } from '../../../const/TokenApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { Link } from 'react-router-dom';
import StarRating from '../../../components/utils/StarRating';
import CustomAlert from '../../../components/utils/CustomAlert';
import CustomModal from '../../../components/utils/CustomModal';
import styled from 'styled-components';

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
  const [nickname, setNickname] = useState('');
  const [alert, setAlert] = useState(false);
  const [comment, setCommnet] = useState('');
  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
      // handleGetData();
      handleGetInfo();
      // handleGetNickname();
    }
  }, [projectId, setProjectId]);

  // const handleGetData = async () => {
  //   await Promise.all([handleGetInfo(), handleGetNickname()]);
  // };

  //정보 가져오기
  const handleGetInfo = async () => {
    if (!projectId) return;
    try {
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
      setTags(Data.tags.map((tag: { tagName: string }) => ({ tagName: tag.tagName, color: getRandomColor() })));
      setStatus(Data.status);
      setLink(Data.link);
      setIsMine(Data.isMine);
      const mainMedia = Data.media.find((item: Media) => item.main);
      setMainImageUrl(mainMedia ? mainMedia.url : null);
      const addMedia = Data.media.filter((item: Media) => !item.main);
      setAdditionalImageUrls(addMedia.map((item: Media) => item.url));
      setFeedback(formatDateTime(Data.feedbackEndDate));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.status);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 800);
      } else {
        console.error(error);
      }
    }
  };

  // const handleGetNickname = async () => {
  //   const response = await API_BASE_URL.get('/users/mypage');
  //   setNickname(response.data);
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   handleGetInfo();
  // }, [projectId]);

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
      navigate('/testlist');
    } catch (error) {
      console.error('에러:', error);
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        navigate('/main'); // 메인 페이지로 이동
      }, 1000); // 3초 후 메인 페이지로 이동

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [alert, navigate]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
      2,
      '0',
    )}:${String(date.getSeconds()).padStart(2, '0')}`;
    return formattedDate;
  };

  //모달창에 전달할 연장하기 버튼의 위치
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top - 300, left: rect.left - 150 });
    }
    setShowModal(true);
  };

  const handleRatingChange = (newScore: number) => {
    setScore(newScore);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommnet(e.target.value);
  };
  const handleCommentSubmit = async () => {
    const jsonData = { comment, score };
    try {
      const response = await API_BASE_URL.post(`/projects/${projectId}/comment`, jsonData);
      console.log(response.data);
    } catch (error) {
      console.error('에러:', error);
    }
    setCommnet('');
    handleRatingChange(0);
  };
  return (
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
              안녕하세요 <span>{nickname}</span>, <span style={{ color: '#315AF1' }}>{teamName}</span>의{' '}
              <span style={{ color: '#23BE87' }}>{title}</span> 프로젝트 입니다.
            </span>
          </div>
          <ProjectTextArea className="mt-2">
            <p style={{ fontSize: '15px', marginLeft: 'auto', color: 'black' }}>{feedback}</p>
            <p className="font-extrabold">프로젝트 소개</p>
            <span className="mt-3" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: introduce }} />
            <p className="font-extrabold mt-5">프로젝트 목표</p>
            <span className="mt-3" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: goal }} />
            <ImageWrapper className="mt-5">
              {mainImageUrl && <StyledImg src={mainImageUrl} alt="메인 이미지" />}

              {additionalImageUrls.map((url, index) => (
                <>
                  <StyledImg key={index} src={url} alt={`추가 이미지 ${index + 1}`} />
                </>
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
              <div style={{ display: 'flex', marginLeft: 'auto', gap: '15px' }}>
                <EditButton onClick={() => navigate(`/editproject/${projectId}`)} />
                <DeleteButton onClick={() => setShowAlert(true)} />
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
            <GreenDiv
              className="mt-2"
              style={{ cursor: 'pointer' }}
              onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
            >
              <span className="font-bold underline">바로가기 &rarr;</span>
            </GreenDiv>
          )}
          <WhiteDiv className="mt-2">
            <div style={{ display: 'flex', height: 'auto' }}>
              <span className="font-bold">댓글 달기</span>
              <StarRating initialScore={score} onRatingChange={handleRatingChange} />
            </div>
            <input
              style={{ padding: '5px 10px', outline: 'none' }}
              placeholder="한줄 평"
              value={comment}
              onChange={handleCommentChange}
            ></input>
            <CustomButton
              style={{
                height: '20%',
                width: '15%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
              onClick={handleCommentSubmit}
            >
              등록
            </CustomButton>
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
            <CustomButton
              style={{ marginLeft: 'auto', width: '30%' }}
              onClick={() => navigate(`/responsequestions/${projectId}`)}
            >
              테스트폼 참여하기
            </CustomButton>
          </div>
        </ProjectIntro>
      </Project>
    </CreateWrapper>
  );
};
