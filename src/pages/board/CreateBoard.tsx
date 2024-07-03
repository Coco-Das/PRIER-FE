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
  convertToRaw,
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
import { API_BASE_URL } from '../../const/TokenApi'; // Axios 인스턴스 가져오기
import { useUserStore } from '../../states/user/UserStore';
import Snackbar from '../../components/user/Snackbar';

const { hasCommandModifier } = KeyBindingUtil;
const storedUserId = localStorage.getItem('userId');
const styleMap = {
  RED: { color: 'red' },
  ORANGE: { color: 'orange' },
  YELLOW: { color: 'yellow' },
  GREEN: { color: 'green' },
  BLUE: { color: 'blue' },
  INDIGO: { color: 'indigo' },
  VIOLET: { color: 'violet' },
  BLACK: { color: 'black' },
  WHITE: { color: 'white' },
  BACKGROUND_YELLOW: { backgroundColor: 'yellow' },
};

// 링크 엔티티를 찾는 전략을 정의합니다.
const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

// 링크 컴포넌트 정의
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#3b5998', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

// 컴포지트 데코레이터 정의
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const CreateBoard: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(''); // 제목 상태 변수
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator)); // 에디터 상태 변수
  const [category, setCategory] = useState<string>(''); // 카테고리 상태 변수
  const [showCreateBoardAlert, setShowCreateBoardAlert] = useState<boolean>(false); // 알림 표시 상태 변수
  const [images, setImages] = useState<File[]>([]); // 업로드된 이미지 상태 변수
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // 스낵바 상태 변수
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조 변수
  const userProfile = useUserStore(state => state.userProfile);
  const profileNickname = sessionStorage.getItem('nickname');
  const profileImg = sessionStorage.getItem('profileImg') || userAvatar;
  // 에디터 변경 핸들러
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  // 키 명령 핸들러
  const handleKeyCommand = (command: string, state: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // 키 바인딩 함수
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

  // 입력 전 처리 핸들러
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

  // 엔터 키 핸들러
  const handleReturn = (e: React.KeyboardEvent, state: EditorState): DraftHandleValue => {
    const currentStyle = state.getCurrentInlineStyle();
    const newContentState = Modifier.splitBlock(state.getCurrentContent(), state.getSelection());
    let newEditorState = EditorState.push(state, newContentState, 'split-block');

    const selection = newEditorState.getSelection();
    currentStyle.forEach(style => {
      if (style) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
      }
    });

    handleEditorChange(EditorState.forceSelection(newEditorState, selection));
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
      const fileArray = Array.from(event.target.files);
      setImages(prevImages => [...prevImages, ...fileArray]);
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 게시물 생성 확인 핸들러
  const confirmCreateBoard = async () => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState); // 콘텐츠 상태를 Raw 데이터로 변환
    const contentString = JSON.stringify(contentRaw); // Raw 데이터를 문자열로 변환
    const formData = new FormData();
    formData.append(
      'dto',
      new Blob([JSON.stringify({ title, content: contentString, category })], { type: 'application/json' }),
    );

    images.forEach(file => {
      formData.append('media', file);
    });

    try {
      const response = await API_BASE_URL.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('게시물 작성 성공');
        console.log('보낸 데이터:', { title, content: contentString, category, images });
        navigate('/board');
      } else {
        console.error('게시물 작성 실패');
        console.log('응답 상태 코드:', response.status);
        console.log('보낸 데이터:', { title, content: contentString, category, images });
      }
    } catch (error) {
      console.error('에러:', error);
      console.log('보낸 데이터:', { title, content: contentString, category, images });
    }
  };

  // 게시물 생성 취소 핸들러
  const cancelCreateBoard = () => {
    setShowCreateBoardAlert(false);
  };

  // 완료 버튼 클릭 핸들러
  const handleCompleteClick = () => {
    if (!title || !category || !editorState.getCurrentContent().hasText()) {
      const missingFields = [];
      if (!title) missingFields.push('제목');
      if (!category) missingFields.push('카테고리');
      if (!editorState.getCurrentContent().hasText()) missingFields.push('내용');
      setSnackbar({ message: `${missingFields.join(', ')}을(를) 작성해주세요.`, type: 'error' });
      return;
    }
    setShowCreateBoardAlert(true);
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
              onChange={(event, newValue) => setCategory(newValue as string)}
            >
              <Option value="ITNEWS">IT 지식</Option>
              <Option value="DAILY">잡담/일상</Option>
              <Option value="TECH">기술</Option>
              <Option value="INTERNSHIP">인턴십/공모전</Option>
              <Option value="NOTICE">공지사항</Option>
            </Select>
          </div>
        </Header>
        <PostBox>
          <UserContainer>
            <Avatar>
              <AvatarImage src={profileImg} />
            </Avatar>
            <AuthorContainer>
              <Author>{profileNickname}</Author>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '0px' }}>
            {images.map((image, index) => (
              <ImageWrapper key={index}>
                <StyledImg src={URL.createObjectURL(image)} alt={`Uploaded image ${index}`} />
                <DeleteButton onClick={() => handleDeleteImage(index)}>×</DeleteButton>
              </ImageWrapper>
            ))}
          </div>
          <FileCount>업로드된 이미지 수: {images.length}</FileCount>
        </PostBox>
        <div>
          <Button onClick={handleCompleteClick} className="ml-auto">
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
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </Container>
  );
};

export default CreateBoard;
