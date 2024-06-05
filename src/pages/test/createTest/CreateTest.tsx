import { useEffect, useRef, useState } from 'react';
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
} from './CreateTestStyles';

const AutoResizeTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = props => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 자동으로 설정하여 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 높이 설정
    }
  }, [value]);

  return <Textarea ref={textareaRef} value={value} onChange={handleChange} {...props} />;
};

export const CreateTest = () => {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

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
          <ProjectTextArea className="mt-4">
            <p>프로젝트 소개</p>
            <AutoResizeTextarea placeholder="프로젝트 소개를 입력하세요..." />
            <p>프로젝트 목표</p>
            <AutoResizeTextarea placeholder="프로젝트 목표를 입력하세요..." />
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
            <span className="font-bold">태그</span> <Input className="ml-4" />
          </TagDiv>
          <OrangeDiv className="mt-3">
            <span className="font-bold">개발일정</span>
            <OrangeInputDiv>
              <Input />
              <Input />
            </OrangeInputDiv>
            <OrangeInputDiv>
              <span>진행단계 :</span>
              <Input placeholder="배포완료 / 개발 중 / 기획 중 선택" style={{ width: '60%' }} />
            </OrangeInputDiv>
          </OrangeDiv>
          <BlueDiv className="mt-2">
            <span className="font-bold">팀소개</span>
            <BlueInputDiv>
              <span>팀명 :</span>
              <Input style={{ width: '67%' }} />
            </BlueInputDiv>
            <BlueInputDiv>
              <span>한줄소개 :</span>
              <Input style={{ width: '61%' }} />
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
              ></Textarea>
            </BlueInputDiv>
          </BlueDiv>
          <GreenDiv className="mt-2">
            <GreenInputDiv>
              <span className="font-bold">배포 링크</span>
              <Input style={{ width: '60%' }} />
            </GreenInputDiv>
            <GreenInputDiv>
              <span className="font-bold">깃허브</span>
              <Input style={{ width: '60%' }} />
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
            padding: '10px 10px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <QuestionDiv className="mt-4"></QuestionDiv>
          <QuestionDiv className="mt-4"></QuestionDiv>
        </div>
      </Question>
    </CreateWrapper>
  );
};
