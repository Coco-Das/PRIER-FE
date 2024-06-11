import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CreateContainer,
  PostBox,
  UserContainer,
  Avatar,
  AvatarImage,
  AuthorContainer,
  Author,
  Button,
  CustomButton,
  ButtonText,
  ContentContainer,
  Title,
  ContentText,
  ImageWrapper,
  StyledImg,
  DeleteButton,
  FileCount,
  Header,
} from './CreateBoardStyles';
import userAvatar from '../../assets/user.svg';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ToggleGroupToolbar from '../../components/board/ToggleGroupToolbar';
import CustomAlert from '../../components/utils/CustomAlert';

function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showCreateBoardAlert, setShowCreateBoardAlert] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentTextRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (contentTextRef.current) {
      contentTextRef.current.style.height = '400px';
      contentTextRef.current.style.height = `${contentTextRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const confirmCreateBoard = () => {
    setShowCreateBoardAlert(false);
    navigate('/board');
  };

  const cancelCreateBoard = () => {
    setShowCreateBoardAlert(false);
  };

  return (
    <Container>
      <CreateContainer>
        <Header>
          <div className="flex justify-end mb-2">
            <Select
              placeholder="카테고리"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 110,
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },
              }}
              className="ml-auto"
            >
              <Option value="ITNews">IT 지식</Option>
              <Option value="Daily">잡담/일상</Option>
              <Option value="Tech">기술</Option>
              <Option value="InternShip">인턴십/공모전</Option>
              <Option value="Notice">공지사항</Option>
            </Select>
          </div>
        </Header>
        <PostBox>
          <UserContainer>
            <Avatar>
              <AvatarImage src={userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author>개발자1</Author>
            </AuthorContainer>
            <ToggleGroupToolbar />
            <CustomButton onClick={handleImageUpload}>
              <ButtonText>이미지 업로드</ButtonText>
            </CustomButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </UserContainer>
          <ContentContainer>
            <Title placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
            <ContentText
              ref={contentTextRef}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </ContentContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {images.map((image, index) => (
              <ImageWrapper key={index}>
                <StyledImg src={image} alt={`Uploaded image ${index}`} />
                <DeleteButton onClick={() => handleDeleteImage(index)}>×</DeleteButton>
              </ImageWrapper>
            ))}
          </div>
          <FileCount>업로드된 이미지 수: {images.length}</FileCount>
        </PostBox>
        <div>
          <Button
            onClick={() => {
              setShowCreateBoardAlert(true);
            }}
            className="ml-auto"
          >
            <ButtonText>완료</ButtonText>
          </Button>
          {showCreateBoardAlert && (
            <CustomAlert
              message="게시물을 업로드 하시겠습니까?"
              onConfirm={confirmCreateBoard}
              onCancel={cancelCreateBoard}
            />
          )}
        </div>
      </CreateContainer>
    </Container>
  );
}

export default CreateBoard;
