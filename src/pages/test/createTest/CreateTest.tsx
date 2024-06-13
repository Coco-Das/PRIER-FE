import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useProjectStore } from '../../../states/projects/ProjectStore'; // zustand 스토어 임포트

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
  type: 'subjective' | 'objective';
  content: string;
  options?: string[]; // 객관식 질문의 선택지(고정)
}
interface Tag {
  tag: string;
  color: string;
}

export const CreateTest = () => {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: 'subjective', content: '' },
    { id: 2, type: 'objective', content: '', options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] },
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
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
  const navigate = useNavigate();
  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const addQuestion = () => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, type: 'subjective', content: '' },
    ]);
  };

  const toggleQuestionType = (id: number) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id
          ? {
              ...question,
              type: question.type === 'subjective' ? 'objective' : 'subjective',
              options: question.type === 'subjective' ? ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] : undefined,
              content: '',
            }
          : question,
      ),
    );
  };

  const handleMainImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMainImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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

  const handleDeleteMainImage = () => {
    setMainImageUrl(null);
  };

  const handleDeleteAdditionalImage = (index: number) => {
    setAdditionalImageUrls(prevImageUrls => prevImageUrls.filter((_, i) => i !== index));
  };

  const handleMainButtonClick = () => {
    mainFileInputRef.current?.click();
  };

  const handleAdditionalButtonClick = () => {
    additionalFileInputRef.current?.click();
  };
  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault();
      if (tags.length < 2) {
        setTags(prevTags => [...prevTags, { tag: tagInput.trim(), color: getRandomColor() }]);
        setTagInput('');
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 800);
      }
    }
  };
  const handleQuestionDelete = (id: number) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
  };

  const handleIntroduceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  };

  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStepChange = (selectedStep: string) => {
    setStep(selectedStep);
  };

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleTeamDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamDescription(event.target.value);
  };

  const handleTeamMateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTeamMate(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleQuestionContentChange = (id: number, content: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => (question.id === id ? { ...question, content } : question)),
    );
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags => tags.filter((_, i) => i !== index));
  };

  //제출하기 버튼
  const handleSubmit = async () => {
    const formData = new FormData();
    const formattedStartDate = format(startDate ?? new Date(), 'yyyy-MM-dd');
    const formattedEndDate = format(endDate ?? new Date(), 'yyyy-MM-dd');
    const tagContents = tags.map(tag => tag.tag);

    const jsonData = {
      title,
      introduce,
      goal,
      tags: tagContents,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status: step === '배포완료' ? 0 : step === '개발 중' ? 1 : 2,
      teamName,
      teamDescription,
      teamMate,
      link,
      question: questions.map(q => q.content),
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
      const setProjectId = useProjectStore.getState().setProjectId;
      setProjectId(projectId);
      console.log(projectId);

      // console.log('JSON Data:', jsonData);
      // console.log(startDate, endDate);
      navigate(`/responsetest/${projectId}`);
      console.log(response.data);
      // navigator('/')
    } catch (error) {
      console.error('에러:', error);
      console.log('JSON Data:', jsonData);
    }
  };

  return (
    <CreateWrapper>
      <Project>
        <ProjectDiv>
          <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
            <Settings />
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
            ></input>
            <p>프로젝트 소개</p>
            <AutoResizeTextarea
              value={introduce}
              onChange={handleIntroduceChange}
              placeholder="프로젝트 소개를 입력하세요..."
            />
            <p>프로젝트 목표</p>
            <AutoResizeTextarea value={goal} onChange={handleGoalChange} placeholder="프로젝트 목표를 입력하세요..." />
            <HiddenInput type="file" accept="image/*" onChange={handleMainImageChange} ref={mainFileInputRef} />
            <CustomButton onClick={handleMainButtonClick}>메인 이미지 업로드</CustomButton>
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
            </div>
          </ProjectTextArea>
        </ProjectDiv>
        <ProjectIntro>
          <TagDiv className="mt-20">
            <span className="font-bold">태그</span>{' '}
            <Input
              className="ml-4"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
            />
          </TagDiv>
          {showAlert && <CustomAlert message="태그는 최대 2개까지 설정할 수 있습니다." showButtons={false} />}
          <TagWrapper>
            {tags.map((tagIndex, index) => (
              <Tag key={index} bgcolor={tagIndex.color}>
                {tagIndex.tag}
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
            <OrangeInputDiv>
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
            <span className="font-bold">팀소개</span>
            <BlueInputDiv>
              <span>팀명 :</span>
              <Input style={{ width: '67%' }} onChange={handleTeamNameChange} value={teamName} />
            </BlueInputDiv>
            <BlueInputDiv>
              <span>한줄소개 :</span>
              <Input style={{ width: '61%' }} onChange={handleTeamDescriptionChange} value={teamDescription} />
            </BlueInputDiv>
            <BlueInputDiv style={{ alignItems: 'normal' }}>
              <span>팀원 :</span>
              <Textarea
                style={{
                  width: '67%',
                  borderRadius: '10px',
                  backgroundColor: 'inherit',
                  fontSize: '15px',
                  border: '1px solid #315AF1',
                  height: '110px',
                  overflowY: 'auto',
                }}
                onChange={handleTeamMateChange}
                value={teamMate}
              ></Textarea>
            </BlueInputDiv>
          </BlueDiv>
          <GreenDiv className="mt-2">
            <GreenInputDiv>
              <span className="font-bold">배포 링크</span>
              <Input style={{ width: '60%' }} onChange={handleLinkChange} value={link} />
            </GreenInputDiv>
          </GreenDiv>
        </ProjectIntro>
      </Project>
      <Question>
        <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
          <Settings />
          <span className="ml-4 font-extrabold" style={{ color: '#315AF1' }}>
            상세한 피드백을 위한 원하는 질문 폼을 작성해주세요
          </span>
        </div>
        <div
          style={{
            padding: '0px 10px 20px 10px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {questions.map((question, index) => (
            <QuestionDiv key={question.id} className="mt-4">
              {question.type === 'subjective' ? (
                <div>
                  <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                    {index + 1}번 문항
                    <input
                      placeholder="질문을 입력하세요"
                      style={{
                        marginLeft: '20px',
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
                  <AutoResizeTextarea
                    placeholder="주관식 답변을 입력하세요..."
                    style={{
                      marginTop: '10px',
                      marginLeft: '75px',
                      overflowY: 'auto',
                      width: '80%',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <QuestionDeleteButton onClick={() => handleQuestionDelete(question.id)} />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                    {index + 1}번 문항
                    <input
                      placeholder="질문을 입력하세요"
                      style={{ marginLeft: '20px', fontSize: '20px', outline: 'none', width: '80%' }}
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
                      marginBottom: '40px',
                      fontSize: '20px',
                      width: '85%',
                    }}
                  >
                    {question.options?.map((option, i) => (
                      <div key={i}>
                        <label>
                          <input type="radio" name={`question-${question.id}`} value={option} /> {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <QuestionDeleteButton onClick={() => handleQuestionDelete(question.id)} />
                  </div>
                </div>
              )}
            </QuestionDiv>
          ))}
          <AddButton onClick={addQuestion}>질문 추가</AddButton>
          <div style={{ width: '100%', display: 'flex' }}>
            <CustomButton onClick={handleSubmit} style={{ marginLeft: 'auto', width: '15%' }}>
              제출하기
            </CustomButton>
          </div>
        </div>
      </Question>
    </CreateWrapper>
  );
};
