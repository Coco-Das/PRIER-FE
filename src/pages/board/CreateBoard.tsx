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
import ToggleGroupToolbar from '../../components/board/ToggleGroupToolbar';
import CustomAlert from '../../components/utils/CustomAlert';

const { hasCommandModifier } = KeyBindingUtil;

// Custom style map
const styleMap = {
  RED: {
    color: 'red',
  },
  // Add more custom styles here
};

// Helper function to find link entities
const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges(
    (character: any) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
};

// Component to render link
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#3b5998', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

// Decorator for links
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
        currentStyle
      );
      handleEditorChange(EditorState.push(state, newContentState, 'insert-characters'));
      return 'handled';
    }
    return 'not-handled';
  };

  const handleReturn = (e: React.KeyboardEvent, state: EditorState): DraftHandleValue => {
    const currentStyle = state.getCurrentInlineStyle();
    const newContentState = Modifier.splitBlock(state.getCurrentContent(), state.getSelection());

    const newEditorState = EditorState.push(state, newContentState, 'split-block');
    const selection = newEditorState.getSelection();

    const newContentStateWithStyles = currentStyle.reduce((contentState, style) => {
      if (contentState) {
        return Modifier.applyInlineStyle(contentState, selection, style);
      }
      return contentState;
    }, newEditorState.getCurrentContent());

    handleEditorChange(EditorState.push(newEditorState, newContentStateWithStyles, 'change-inline-style'));
    return 'handled';
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...fileArray]);
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
            <ToggleGroupToolbar editorState={editorState} onEditorChange={handleEditorChange} />
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
            <Title placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
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
