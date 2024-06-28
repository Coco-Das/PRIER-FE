import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useProjectStore } from '../../../states/projects/ProjectStore'; // zustand 스토어 임포트
import DeletePng from '../../../assets/trash.png';
import SettingPng from '../../../assets/setting.png';

import {
  BlueDiv,
  CreateWrapper,
  CustomButton,
  DeleteButton,
  FileCount,
  GreenDiv,
  HiddenInput,
  ImageWrapper,
  Input,
  OrangeDiv,
  OrangeInputDiv,
  ProjectDiv,
  ProjectIntro,
  ProjectTextArea,
  Settings,
  StyledImg,
  TagDiv,
  BlueInputDiv,
  Textarea,
  GreenInputDiv,
  Project,
  Question,
  QuestionDiv,
  TagWrapper,
  Tag,
  AddButton,
  QuestionDeleteButton,
} from './CreateTestStyles';
import { ToggleBtn } from '../../../components/utils/Toggle';
import { DropDownContainer } from '../../../components/utils/DropDown';
import { API_BASE_URL } from '../../../const/TokenApi';
import CustomAlert from '../../../components/utils/CustomAlert';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../../../components/user/Snackbar';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return <Textarea ref={textareaRef} value={value} {...props} />;
};

AutoResizeTextarea.propTypes = {
  value: PropTypes.string,
};

interface Question {
  id: number;
  type: 'SUBJECTIVE' | 'OBJECTIVE';
  content: string;
  options?: string[]; // 객관식 질문의 선택지(고정)
}
interface Tag {
  tagName: string;
  color: string;
}

export const CreateTest = () => {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: 'SUBJECTIVE', content: '' },
    { id: 2, type: 'OBJECTIVE', content: '', options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] },
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [step, setStep] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [goal, setGoal] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamMate, setTeamMate] = useState('');
  const [link, setLink] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [ImageAlert, setImageAlert] = useState(false);
  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  //질문 추가
  const addQuestion = useCallback(() => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, type: 'SUBJECTIVE', content: '' },
    ]);
  }, []);

  //토글
  const toggleQuestionType = useCallback(
    (id: number) => {
      setQuestions(prevQuestions =>
        prevQuestions.map(question =>
          question.id === id
            ? {
                ...question,
                type: question.type === 'SUBJECTIVE' ? 'OBJECTIVE' : 'SUBJECTIVE',
                options:
                  question.type === 'SUBJECTIVE' ? ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] : undefined,
                content: question.type === 'SUBJECTIVE' ? '' : question.content,
              }
            : question,
        ),
      );
    },
    [setQuestions],
  );

  //메인이미지 변경
  const handleMainImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMainImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  //추가 이미지 변경
  const handleAdditionalImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileReaders = Array.from(files).map(file => {
        return new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      const results = await Promise.all(fileReaders);
      setAdditionalImageUrls(prevImageUrls => [...prevImageUrls, ...results]);
    }
  };

  //메인 이미지 삭제
  const handleDeleteMainImage = () => {
    setMainImageUrl(null);
  };

  //추가 이미지 삭제
  const handleDeleteAdditionalImage = (index: number) => {
    setAdditionalImageUrls(prevImageUrls => prevImageUrls.filter((_, i) => i !== index));
  };

  //메인이미지 업로드 버튼 클릭
  const handleMainButtonClick = () => {
    mainFileInputRef.current?.click();
  };

  //추가이미지 업로드 버튼 클릭
  const handleAdditionalButtonClick = () => {
    additionalFileInputRef.current?.click();
  };

  //태그 변경
  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  //태그 엔터 입력 & 태그 2개 제한
  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    } else {
      if (event.key === 'Enter' && tagInput.trim()) {
        event.preventDefault();

        if (tags.length < 2) {
          const newTag = tagInput.trim();
          setTagInput(''); // 입력 필드를 비워서 커서 위치를 초기화합니다.
          setTags(prevTags => [...prevTags, { tagName: newTag, color: getRandomColor() }]);
        } else {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 800);
        }
      }
    }
  };

  //질문 삭제
  const handleQuestionDelete = (id: number) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
  };

  //소개 변경
  const handleIntroduceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  };

  //목표 변경
  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };

  //타이틀 변경
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //단계 변경
  const handleStepChange = (selectedStep: string) => {
    setStep(selectedStep);
  };

  //팀이름 변경
  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  //팀설명 변경
  const handleTeamDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamDescription(event.target.value);
  };

  //팀원 변경
  const handleTeamMateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTeamMate(event.target.value);
  };

  //랑크 변경
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  //질문 내용 변경
  const handleQuestionContentChange = (id: number, content: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => (question.id === id ? { ...question, content } : question)),
    );
  };

  //태그 삭제
  const handleDeleteTag = (index: number) => {
    setTags(tags => tags.filter((_, i) => i !== index));
  };

  //제출하기 버튼
  const handleSubmit = async () => {
    const formData = new FormData();
    const formattedStartDate = format(startDate ?? new Date(), 'yyyy-MM-dd');
    const formattedEndDate = format(endDate ?? new Date(), 'yyyy-MM-dd');
    const tagContents = tags.map(tag => tag.tagName);

    const replaceEmptyStringWithNull = (value: string) => (value.trim() === '' ? null : value.trim());
    const statusValue = step === '배포 완료' ? 0 : step === '개발 중' ? 1 : 2;

    const jsonData = {
      title: replaceEmptyStringWithNull(title),
      introduce: replaceEmptyStringWithNull(introduce),
      goal: replaceEmptyStringWithNull(goal),
      tags: tagContents,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status: statusValue,
      teamName: replaceEmptyStringWithNull(teamName),
      teamDescription: replaceEmptyStringWithNull(teamDescription),
      teamMate: replaceEmptyStringWithNull(teamMate),
      link: link,
      deleteImages: deleteImages.length > 0 ? deleteImages : null,
      question: questions.map(q => replaceEmptyStringWithNull(q.content)),
      type: questions.map(q => q.type),
    };
    formData.append(
      'form',
      new Blob([JSON.stringify(jsonData)], {
        type: 'application/json',
      }),
    );
    if (mainFileInputRef.current?.files && mainFileInputRef.current.files.length > 0) {
      formData.append('mainImage', mainFileInputRef.current.files[0]);
    } else {
      setImageAlert(true);
      setTimeout(() => {
        setImageAlert(false);
      }, 800);
      return;
    }
    if (additionalFileInputRef.current?.files) {
      Array.from(additionalFileInputRef.current.files).forEach(file => {
        formData.append('contentImages', file);
      });
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await API_BASE_URL.post('/projects', formData, config);
      const projectId = response.data;
      if (projectId === -1) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 800);
        return;
      }
      const setProjectId = useProjectStore.getState().setProjectId;
      setProjectId(projectId);

      setSnackbar({ message: '프로젝트가 등록되었습니다', type: 'success' });
      setTimeout(() => {
        navigate(`/responsetest/${projectId}`);
      }, 500); // 2초 지연
    } catch (error) {
      setSnackbar({ message: '프로젝트 등록이 실패하였습니다.', type: 'error' });
      console.error('에러:', error);
    }
  };

  return (
    <CreateWrapper>
      <Project>
        <ProjectDiv>
          {alert && <CustomAlert message="비어 있는 부분이 있습니다." showButtons={false} />}
          <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
            <Settings src={SettingPng} />
            <span className="ml-4 font-extrabold" style={{ color: '#315AF1' }}>
              테스트를 진행할 프로젝트에 대해 설명해주세요
            </span>
          </div>
          <ProjectTextArea className="mt-2">
            <input
              style={{ fontSize: '25px', outline: 'none' }}
              placeholder="프로젝트 제목을 입력하세요"
              className="mb-10 font-semibold"
              onChange={handleTitleChange}
              value={title}
            />
            <p>프로젝트 소개</p>
            <AutoResizeTextarea
              value={introduce}
              onChange={handleIntroduceChange}
              placeholder="프로젝트 소개를 입력하세요..."
            />
            <p>프로젝트 목표</p>
            <AutoResizeTextarea value={goal} onChange={handleGoalChange} placeholder="프로젝트 목표를 입력하세요..." />
            <HiddenInput type="file" accept="image/*" onChange={handleMainImageChange} ref={mainFileInputRef} />
            {/* <div style={{ display: 'flex' }}>
              <CustomButton onClick={handleMainButtonClick}>메인 이미지 업로드</CustomButton>
              <span className="ml-2" style={{ fontSize: '12px', marginTop: 'auto', color: 'tomato' }}>
                * 메인이미지는 필수입니다
              </span>
            </div>
            {mainImageUrl && (
              <ImageWrapper>
                <StyledImg src={mainImageUrl} alt="메인 이미지" />
                <DeleteButton onClick={handleDeleteMainImage}>×</DeleteButton>
              </ImageWrapper>
            )}
            <HiddenInput
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImageChange}
              ref={additionalFileInputRef}
            />
            <CustomButton onClick={handleAdditionalButtonClick}>이미지 업로드</CustomButton>
            <FileCount>파일 수: {additionalImageUrls.length} 개</FileCount>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {additionalImageUrls.map((url, index) => (
                <ImageWrapper key={index}>
                  <StyledImg src={url} alt={`추가 이미지 ${index + 1}`} />
                  <DeleteButton onClick={() => handleDeleteAdditionalImage(index)}>×</DeleteButton>
                </ImageWrapper>
              ))}
            </div> */}
          </ProjectTextArea>
        </ProjectDiv>
        <ProjectIntro>
          <TagDiv className="mt-20">
            <span className="font-bold">태그</span>{' '}
            <Input
              ref={inputRef}
              className="ml-4"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
            />
          </TagDiv>
          {showAlert && <CustomAlert message="태그는 최대 2개까지 설정할 수 있습니다." showButtons={false} />}
          <TagWrapper>
            {tags.map((tag, index) => (
              <Tag key={index} $bgColor={tag.color}>
                {tag.tagName}
                <DeleteButton
                  style={{
                    top: '-3px',
                    right: '-5px',
                    width: '15px',
                    height: '15px',
                  }}
                  onClick={() => handleDeleteTag(index)}
                >
                  x
                </DeleteButton>
              </Tag>
            ))}
          </TagWrapper>
          <OrangeDiv className="mt-3">
            <span className="font-bold">개발일정</span>
            <OrangeInputDiv style={{ gap: '0px' }}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="시작 날짜"
                customInput={<Input style={{ width: '90%', textAlign: 'center', cursor: 'pointer' }} />}
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="종료 날짜"
                customInput={<Input style={{ width: '90%', textAlign: 'center', cursor: 'pointer' }} />}
              />
            </OrangeInputDiv>
            <OrangeInputDiv style={{ height: '27%' }}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>진행단계 :</div>
              <DropDownContainer onSelect={handleStepChange} />
            </OrangeInputDiv>
          </OrangeDiv>
          <BlueDiv className="mt-2">
            <span className="font-bold">팀 소개</span>
            <BlueInputDiv>
              <span>팀&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명 :</span>
              <Input style={{ width: '73%' }} onChange={handleTeamNameChange} value={teamName} />
            </BlueInputDiv>
            <BlueInputDiv>
              <span>한줄소개 :</span>
              <Input
                style={{ width: '73%', overflowY: 'auto' }}
                onChange={handleTeamDescriptionChange}
                value={teamDescription}
              />
            </BlueInputDiv>
            <BlueInputDiv style={{ alignItems: 'normal' }}>
              <span>팀&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원 :</span>
              <Textarea
                style={{
                  width: '73%',
                  borderRadius: '10px',
                  backgroundColor: 'inherit',
                  fontSize: '15px',
                  border: '1px solid #315AF1',
                  height: '110px',
                  overflowY: 'auto',
                }}
                onChange={handleTeamMateChange}
                value={teamMate}
              />
            </BlueInputDiv>
          </BlueDiv>
          <GreenDiv className="mt-2">
            <GreenInputDiv>
              <span className="font-bold">배포 링크</span>
              <Input style={{ width: '73%' }} onChange={handleLinkChange} value={link} />
            </GreenInputDiv>
          </GreenDiv>
        </ProjectIntro>
      </Project>
      <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
        <Settings src={SettingPng} />
        <span className="ml-4 font-extrabold" style={{ color: '#315AF1' }}>
          상세한 피드백을 위한 원하는 질문 폼을 작성해주세요
        </span>
      </div>

      <Question>
        {questions.map((question, index) => (
          <QuestionDiv key={question.id} className="mt-4">
            {question.type === 'SUBJECTIVE' ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '15px',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}번 문항
                  <input
                    placeholder="질문을 입력하세요"
                    style={{
                      marginLeft: '30px',
                      fontSize: '20px',
                      outline: 'none',
                      fontWeight: 'bold',
                      width: '80%',
                    }}
                    value={question.content}
                    onChange={e => handleQuestionContentChange(question.id, e.target.value)}
                  />
                  <div style={{ marginLeft: 'auto' }}>
                    <ToggleBtn currentType={question.type} onToggle={() => toggleQuestionType(question.id)} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton src={DeletePng} onClick={() => handleQuestionDelete(question.id)} />
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '15px',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}번 문항
                  <input
                    placeholder="질문을 입력하세요"
                    style={{ marginLeft: '30px', fontSize: '20px', outline: 'none', width: '80%' }}
                    onChange={e => handleQuestionContentChange(question.id, e.target.value)}
                    value={question.content}
                  />
                  <div style={{ marginLeft: 'auto' }}>
                    <ToggleBtn currentType={question.type} onToggle={() => toggleQuestionType(question.id)} />
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: '75px',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10rem',
                    fontSize: '18px',
                    width: '85%',
                    opacity: '0.3',
                  }}
                >
                  {question.options?.map((option, i) => (
                    <div key={i}>
                      <label>
                        <input type="radio" name={`question-${question.id}`} value={option} checked={false} readOnly />{' '}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton src={DeletePng} onClick={() => handleQuestionDelete(question.id)} />
                </div>
              </div>
            )}
          </QuestionDiv>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <AddButton onClick={addQuestion}>질문 추가</AddButton>
        </div>
        <div style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
          <CustomButton onClick={handleSubmit} style={{ marginLeft: 'auto', width: '15%' }}>
            제출하기
          </CustomButton>
        </div>
      </Question>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
      {ImageAlert && <CustomAlert message="메인이미지는 필수입니다" showButtons={false} />}
    </CreateWrapper>
  );
};
