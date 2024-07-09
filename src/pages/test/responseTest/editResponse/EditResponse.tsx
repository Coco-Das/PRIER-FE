import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
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
  BlueInputDiv,
  ImageWrapper,
  StyledImg,
  Textarea,
  Settings,
  ImgDeleteButton,
  FileCount,
  TagDiv,
  Input,
  GreenInputDiv,
  Question,
  QuestionDiv,
  QuestionDeleteButton,
  AddButton,
} from './EditResponseStyles';
import { API_BASE_URL } from '../../../../const/TokenApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../../../states/projects/ProjectStore';
import CustomAlert from '../../../../components/utils/CustomAlert';
import { HiddenInput } from '../../createTest/CreateTestStyles';
import { DropDownContainer } from '../../../../components/utils/DropDown';
import { ToggleBtn } from '../../../../components/utils/Toggle';
import Snackbar from '../../../../components/user/Snackbar';
import DeletePng from '../../../../assets/delete.png';
import SettingPng from '../../../../assets/setting.png';

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
  questionId: number | null;
  newQuestionId?: number;
  category: string;
  content: string;
  options?: string[]; // 객관식 질문의 선택지(고정)
}

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
  s3Key: string;
}

export const EditResponse = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const [mainKeys, setMainKeys] = useState<string | null>(null);
  const [addKeys, setAddKeys] = useState<string[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [isMine, setIsMine] = useState(false);
  const [link, setLink] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [status, setStatus] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamMate, setTeamMate] = useState('');
  const [teamName, setTeamName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);
  const [deleteMainImage, setDeleteMainImage] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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
      const response = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;

      setTeamName(Data.teamName);
      setTitle(Data.title);
      setIntroduce(Data.introduce);
      setTeamDescription(Data.teamDescription);
      setGoal(Data.goal);
      setStartDate(new Date(Data.startDate));
      setEndDate(new Date(Data.endDate));
      setTeamMate(Data.teamMate);
      setTags(Data.tags.map((tag: { tagName: string }) => ({ tagName: tag.tagName, color: getRandomColor() })));
      setStatus(Data.status);
      setLink(Data.link);
      setIsMine(Data.isMine);
      const mainMedia = Data.media.find((item: Media) => item.main);
      setMainImageUrl(mainMedia ? mainMedia.url : null);
      setMainKeys(mainMedia ? mainMedia.s3Key : null);
      const addMedia = Data.media.filter((item: Media) => !item.main);
      setAdditionalImageUrls(addMedia.map((item: Media) => item.url));
      setAddKeys(addMedia.map((item: Media) => item.s3Key));

      const updatedQuestions = Data.questions.map((question: Question) => {
        if (question.category === 'OBJECTIVE' && !question.options) {
          return {
            ...question,
            options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      // console.log(Data);
    } catch (error) {
      console.error('에러:', error);
    }
  };

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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleIntroduceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  };
  const handleGoalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };
  const handleMainImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMainImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleMainButtonClick = () => {
    mainFileInputRef.current?.click();
  };

  const handleDeleteMainImage = () => {
    setMainImageUrl(null);
    setMainKeys(null);
    setDeleteMainImage(true);
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
      console.log(results);
      console.log(additionalImageUrls);
    }
  };

  const handleAdditionalButtonClick = () => {
    additionalFileInputRef.current?.click();
  };

  //추가이미지 삭제
  const handleDeleteAdditionalImage = (index: number) => {
    //url에서 제거
    setAdditionalImageUrls(prevImageUrls => {
      const updatedImageUrls = prevImageUrls.filter((_, i) => i !== index);
      return updatedImageUrls;
    });
    //key에서 제거
    setDeleteImages(prevDeleteImages => {
      const newDeleteImages = [...prevDeleteImages, addKeys[index]];
      setAddKeys(prevKey => prevKey.filter((_, i) => i !== index));
      return newDeleteImages;
    });
    console.log(additionalImageUrls);
    console.log('삭제될이미지의 key:', deleteImages);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault();
      if (tags.length < 2) {
        setTags(prevTags => [...prevTags, { tagName: tagInput.trim(), color: getRandomColor() }]);
        setTagInput('');
      } else {
        setSnackbar({ message: '태그는 최대 2개까지 가능합니다.', type: 'error' });
      }
    }
  };
  const handleDeleteTag = (index: number) => {
    setTags(tags => tags.filter((_, i) => i !== index));
  };
  const handleStepChange = (selectedStep: string) => {
    setStatus(selectedStep);
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
  const handleQuestionContentChange = (id: number | null, content: string) => {
    setNewQuestions(prevNewQuestions =>
      prevNewQuestions.map(question => (question.newQuestionId === id ? { ...question, content } : question)),
    );
  };
  const toggleQuestionType = (id: number | null) => {
    setNewQuestions(prevNewQuestions =>
      prevNewQuestions.map(question =>
        question.newQuestionId === id
          ? {
              ...question,
              category: question.category === 'SUBJECTIVE' ? 'OBJECTIVE' : 'SUBJECTIVE',
              options:
                question.category === 'SUBJECTIVE' ? ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] : undefined,
              content: '',
            }
          : question,
      ),
    );
  };
  const handleQuestionDelete = (id: number | null) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.questionId !== id));
    setNewQuestions(prevNewQuestions => prevNewQuestions.filter(question => question.newQuestionId !== id));
  };

  const addQuestion = () => {
    const allQuestions = [...questions, ...newQuestions];
    if (allQuestions.length >= 10) {
      setSnackbar({ message: '질문은 최대 10개까지 추가할 수 있습니다.', type: 'error' });
      return;
    }
    const maxId = allQuestions.reduce((max, question) => {
      const id = question.questionId ?? question.newQuestionId ?? 0;
      return Math.max(max, id);
    }, 0);

    setNewQuestions(prevNewQuestions => [
      ...prevNewQuestions,
      {
        questionId: null,
        newQuestionId: maxId + 1,
        category: 'SUBJECTIVE',
        content: '',
      },
    ]);
  };

  //제출하기
  const handleEditSubmit = async () => {
    const formData = new FormData();
    const formattedStartDate = format(startDate ?? new Date(), 'yyyy-MM-dd');
    const formattedEndDate = format(endDate ?? new Date(), 'yyyy-MM-dd');
    const tagContents = tags.map(tag => tag.tagName);

    const replaceEmptyStringWithNull = (value: string) => (value.trim() === '' ? null : value.trim());
    const combinedQuestions = [...questions, ...newQuestions];
    const statusValue = status === '배포 완료' ? 0 : status === '개발 중' ? 1 : 2;

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
      link: replaceEmptyStringWithNull(link),
      deleteMainImage: deleteMainImage,
      deleteImages: deleteImages.length > 0 ? deleteImages : null,
      question: combinedQuestions.map(q => replaceEmptyStringWithNull(q.content)),
      type: combinedQuestions.map(q => q.category),
      questionId: combinedQuestions.map(q => q.questionId),
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
      if (deleteMainImage) {
        setSnackbar({ message: '메인이미지는 필수입니다.', type: 'error' });
        return;
      }
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
      // console.log(jsonData);
      const response = await API_BASE_URL.put(`/projects/${projectId}`, formData, config);
      console.log(response.data);
      setSnackbar({ message: '프로젝트가 수정되었습니다', type: 'success' });
      setTimeout(() => {
        navigate(`/responsetest/${projectId}`);
      }, 500); // 2초 지연
    } catch (error) {
      setSnackbar({ message: '프로젝트 수정이 실패하였습니다.', type: 'error' });
      console.error('에러:', error);
      // console.log('JSON Data:', jsonData);
    }
  };

  return (
    <CreateWrapper>
      <Project>
        <ProjectDiv>
          <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
            <Settings src={SettingPng} />
            <span className="ml-4 font-extrabold" style={{ color: '#315AF1' }}>
              테스트를 진행할 프로젝트에 대해 설명해주세요
            </span>
          </div>
          <ProjectTextArea className="mt-2">
            <input
              style={{ fontSize: '25px', outline: 'none' }}
              placeholder={title}
              className="mb-10 font-semibold"
              onChange={handleTitleChange}
              value={title}
            />
            <p className="font-extrabold">프로젝트 소개</p>
            <AutoResizeTextarea
              value={introduce}
              onChange={handleIntroduceChange}
              placeholder="프로젝트 소개를 입력하세요..."
            />
            <p className="font-extrabold mt-5">프로젝트 목표</p>
            <AutoResizeTextarea value={goal} onChange={handleGoalChange} placeholder="프로젝트 목표를 입력하세요..." />
            <HiddenInput type="file" accept="image/*" onChange={handleMainImageChange} ref={mainFileInputRef} />
            <div style={{ display: 'flex' }}>
              <CustomButton onClick={handleMainButtonClick}>메인 이미지 업로드</CustomButton>
              <span
                className="ml-2"
                style={{ fontSize: '12px', marginTop: 'auto', color: 'tomato', fontWeight: 'bold' }}
              >
                * 메인이미지는 필수입니다
              </span>
            </div>
            {mainImageUrl && (
              <ImageWrapper className="mt-5">
                <StyledImg src={mainImageUrl} alt="메인 이미지" />
                <ImgDeleteButton onClick={handleDeleteMainImage}>×</ImgDeleteButton>
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
                  <ImgDeleteButton onClick={() => handleDeleteAdditionalImage(index)}>×</ImgDeleteButton>
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
          <TagWrapper $isMine={isMine}>
            {tags.map((tag, index) => (
              <Tag key={index} $bgColor={tag.color}>
                {tag.tagName}
                <ImgDeleteButton
                  style={{
                    top: '-3px',
                    right: '-5px',
                    width: '15px',
                    height: '15px',
                  }}
                  onClick={() => handleDeleteTag(index)}
                >
                  x
                </ImgDeleteButton>
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
              <DropDownContainer onSelect={handleStepChange} select={getStatusText(status)} />
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
          <span style={{ fontSize: '12px', color: '#828282' }} className="font-medium">
            {' '}
            (기존 질문은 삭제만 가능합니다.)
          </span>
        </span>
      </div>
      <Question>
        {questions.map((question, index) => (
          <QuestionDiv key={question.questionId} className="mt-4">
            {question.category === 'SUBJECTIVE' ? (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + 1}번 문항</span>
                  <span
                    style={{
                      marginLeft: '20px',
                      fontSize: '20px',
                      outline: 'none',
                      fontWeight: 'bold',
                      width: '90%',
                    }}
                  >
                    {question.content}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton src={DeletePng} onClick={() => handleQuestionDelete(question.questionId)} />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + 1}번 문항</span>
                  <span style={{ marginLeft: '20px', fontSize: '20px', outline: 'none', width: '90%' }}>
                    {question.content}
                  </span>
                </div>
                <div
                  style={{
                    marginLeft: '75px',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10rem',
                    fontSize: '20px',
                    width: '85%',
                    opacity: '0.3',
                  }}
                >
                  {question.options?.map((option, i) => (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${question.questionId}`}
                          value={option}
                          checked={false}
                          readOnly
                        />{' '}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton src={DeletePng} onClick={() => handleQuestionDelete(question.questionId)} />
                </div>
              </div>
            )}
          </QuestionDiv>
        ))}

        {newQuestions.map((question, index) => (
          <QuestionDiv key={question.newQuestionId} className="mt-4">
            {question.category === 'SUBJECTIVE' ? (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + questions.length + 1}번 문항</span>
                  <input
                    placeholder="질문을 입력하세요"
                    style={{
                      marginLeft: '20px',
                      fontSize: '20px',
                      outline: 'none',
                      fontWeight: 'bold',
                      width: '90%',
                    }}
                    value={question.content}
                    onChange={e => handleQuestionContentChange(question.newQuestionId ?? null, e.target.value)}
                  />
                  <div style={{ marginLeft: 'auto' }}>
                    <ToggleBtn
                      currentType={question.category}
                      onToggle={() => toggleQuestionType(question.newQuestionId ?? null)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton
                    src={DeletePng}
                    onClick={() => handleQuestionDelete(question.newQuestionId ?? null)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + questions.length + 1}번 문항</span>
                  <input
                    placeholder="질문을 입력하세요"
                    style={{ marginLeft: '20px', fontSize: '20px', outline: 'none', width: '90%' }}
                    onChange={e => handleQuestionContentChange(question.newQuestionId ?? null, e.target.value)}
                    value={question.content}
                  />
                  <div style={{ marginLeft: 'auto' }}>
                    <ToggleBtn
                      currentType={question.category}
                      onToggle={() => toggleQuestionType(question.newQuestionId ?? null)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: '75px',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10rem',
                    fontSize: '20px',
                    width: '85%',
                    opacity: '0.3',
                  }}
                >
                  {question.options?.map((option, i) => (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${question.newQuestionId}`}
                          value={option}
                          checked={false}
                          readOnly={true}
                        />{' '}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '10px', marginTop: '20px' }}>
                  <QuestionDeleteButton
                    src={DeletePng}
                    onClick={() => handleQuestionDelete(question.newQuestionId ?? null)}
                  />
                </div>
              </div>
            )}
          </QuestionDiv>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <AddButton onClick={addQuestion}>질문 추가</AddButton>
        </div>
        <div style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
          <CustomButton onClick={handleEditSubmit} style={{ marginLeft: 'auto', width: '15%' }}>
            수정하기
          </CustomButton>
        </div>
      </Question>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </CreateWrapper>
  );
};
