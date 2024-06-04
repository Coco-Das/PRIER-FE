import { useEffect, useRef, useState } from 'react';
import {
  CreateWrapper,
  DeleteButton,
  ImageWrapper,
  ProjectDiv,
  ProjectIntro,
  ProjectTextArea,
  Settings,
  StyledImg,
  StyledInput,
  Textarea,
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setImageUrls(prevImageUrls => [...prevImageUrls, ...results]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageUrls(prevImageUrls => prevImageUrls.filter((_, i) => i !== index));
  };

  return (
    <CreateWrapper>
      <ProjectDiv>
        <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
          <Settings />
          <span className="ml-4 font-extrabold" style={{ color: '#315AF1' }}>
            테스트를 진행할 프로젝트에 대해 설명해주세요
          </span>
        </div>
        <ProjectTextArea>
          <p>프로젝트 소개</p>
          <AutoResizeTextarea placeholder="프로젝트 소개를 입력하세요..." />
          <p>프로젝트 목표</p>
          <AutoResizeTextarea placeholder="프로젝트 목표를 입력하세요..." />
          <StyledInput type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {imageUrls.map((url, index) => (
              <ImageWrapper key={index}>
                <StyledImg src={url} alt={`프로젝트 이미지 ${index + 1}`} />
                <DeleteButton onClick={() => handleDeleteImage(index)}>×</DeleteButton>
              </ImageWrapper>
            ))}
          </div>
        </ProjectTextArea>
      </ProjectDiv>
      <ProjectIntro></ProjectIntro>
    </CreateWrapper>
  );
};
