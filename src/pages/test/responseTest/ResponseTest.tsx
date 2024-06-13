import { useEffect, useRef, useState } from 'react';
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
} from './ResponseTestStyles';
import { API_BASE_URL } from '../../../const/TokenApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { Link } from 'react-router-dom';

interface Tag {
  tagName: string;
  color: string;
}

export const ResponseTest = () => {
  const { projectId } = useParams<{ projectId: string }>(); // URL 경로에서 projectId 추출
  const setProjectId = useProjectStore(state => state.setProjectId);
  // const [projectData, setProjectData] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
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
  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  //정보 가져오기
  const handleGetInfo = async () => {
    if (!projectId) return;
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;
      console.log(Data);
      setTeamName(Data.teamName);
      setTitle(Data.title);
      setIntroduce(Data.introduce);
      setTeamDescription(Data.teamDescription);
      setGoal(Data.goal);
      setStartDate(Data.startDate);
      setEndDate(Data.endDate);
      setTeamMate(Data.teamMate.replace(/\n/g, '<br />')); // 줄바꿈 문자를 <br />로 변환
      setTags(Data.tags.map((tag: { tagName: string }) => ({ tagName: tag.tagName, color: getRandomColor() })));
      setStatus(Data.status);
      setLink(Data.link);
    } catch (error) {
      console.error('에러:', error);
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
        return '기획 중';
      default:
        return status;
    }
  };

  return (
    <CreateWrapper>
      <Project>
        <ProjectDiv>
          <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ml-4 font-bold">
              안녕하세요 <span>닉네임님</span>, <span style={{ color: '#315AF1' }}>{teamName}</span>의{' '}
              <span style={{ color: '#23BE87' }}>{title}</span> 프로젝트 입니다.
            </span>
          </div>
          <ProjectTextArea className="mt-2">
            <p className="font-extrabold">프로젝트 소개</p>
            <span className="mt-3" style={{ fontSize: '16px' }}>
              {introduce}
            </span>
            <p className="font-extrabold mt-5">프로젝트 목표</p>
            <span className="mt-3" style={{ fontSize: '16px' }}>
              {goal}
            </span>
          </ProjectTextArea>
        </ProjectDiv>
        <ProjectIntro>
          <TagWrapper>
            {tags.map((tag, index) => (
              <Tag key={index} bgColor={tag.color}>
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
            <GreenDiv className="mt-2" style={{ cursor: 'pointer' }}>
              <Link to={link}>
                <span className="font-bold">배포 링크</span>
              </Link>
            </GreenDiv>
          )}
          <WhiteDiv className="mt-2">
            <span className="font-bold">댓글 달기</span>
          </WhiteDiv>
          <CustomButton
            style={{ height: '6%', marginLeft: 'auto', width: '30%' }}
            onClick={() => navigate('/responsequestions')}
          >
            테스트폼 참여하기
          </CustomButton>
        </ProjectIntro>
      </Project>
    </CreateWrapper>
  );
};
