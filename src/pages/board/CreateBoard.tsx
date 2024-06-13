import React, { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  DraftHandleValue,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
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
import TextEditorToolbar from '../../components/board/TextEditorToolbar';
import CustomAlert from '../../components/utils/CustomAlert';

const { hasCommandModifier } = KeyBindingUtil;

// 커스텀 스타일 맵
const styleMap = {
  RED: {
    color: 'red',
  },
  BLUE: {
    color: 'blue',
  },
  BACKGROUND_YELLOW: {
    backgroundColor: 'yellow',
  },
  // 추가 스타일 여기에 정의
};

// 링크 엔티티를 찾는 헬퍼 함수
const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

// 링크를 렌더링하는 컴포넌트
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#3b5998', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

// 링크를 위한 데코레이터
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const CreateBoard: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));
  const [showCreateBoardAlert, setShowCreateBoardAlert] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command: string, state: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent): string | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }
      return null;
    }
    if (hasCommandModifier(e)) {
      switch (e.key) {
        case 'b':
          return 'bold';
        case 'i':
          return 'italic';
        case 'u':
          return 'underline';
        default:
          return getDefaultKeyBinding(e);
      }
    }
    return getDefaultKeyBinding(e);
  };

  const handleBeforeInput = (chars: string, state: EditorState): DraftHandleValue => {
    const currentStyle = state.getCurrentInlineStyle();
    if (currentStyle.size > 0) {
      const newContentState = Modifier.replaceText(
        state.getCurrentContent(),
        state.getSelection(),
        chars,
        currentStyle,
      );
      handleEditorChange(EditorState.push(state, newContentState, 'insert-characters'));
      return 'handled';
    }
    return 'not-handled';
  };

  // 엔터를 쳐서 새 줄을 생성하는 함수
  const handleReturn = (e: React.KeyboardEvent, state: EditorState): DraftHandleValue => {
    const currentStyle = state.getCurrentInlineStyle(); // 현재 스타일 가져오기
    const newContentState = Modifier.splitBlock(state.getCurrentContent(), state.getSelection()); // 새 줄 추가
    let newEditorState = EditorState.push(state, newContentState, 'split-block'); // 새 에디터 상태 생성

    const selection = newEditorState.getSelection(); // 현재 선택 상태 가져오기
    currentStyle.forEach(style => {
      if (style) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, style); // 새로운 줄에 스타일 적용
      }
    });

    handleEditorChange(EditorState.forceSelection(newEditorState, selection)); // 새로운 선택 상태 강제 적용
    return 'handled';
  };

  // 이미지 업로드 버튼 클릭 핸들러
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 입력 변경 핸들러
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileArray]);
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 게시물 업로드 확인 핸들러
  const confirmCreateBoard = () => {
    setShowCreateBoardAlert(false);
    navigate('/board');
  };

  // 게시물 업로드 취소 핸들러
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
            <TextEditorToolbar editorState={editorState} onEditorChange={handleEditorChange} />
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
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', minHeight: '400px' }}>
              <Editor
                editorState={editorState}
                customStyleMap={styleMap}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                onChange={handleEditorChange}
                handleBeforeInput={handleBeforeInput}
                handleReturn={handleReturn}
                placeholder="내용을 입력하세요"
              />
            </div>
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
};

export default CreateBoard;
