import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  convertFromRaw,
  RawDraftContentState,
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
import { API_BASE_URL } from '../../const/TokenApi';
import { useUserStore } from '../../states/user/UserStore';
import Snackbar from '../../components/user/Snackbar';
import { Loading } from '../../components/utils/Loading';

const { hasCommandModifier } = KeyBindingUtil;

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
  DEFAULT_FONT_SIZE: { fontSize: '14px' },
  // 폰트 크기 스타일 추가
  ...Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, size) => {
    acc[`FONTSIZE_${size}`] = { fontSize: `${size}px` };
    return acc;
  }, {} as Record<string, React.CSSProperties>),
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

const ModifyBoard: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [title, setTitle] = useState<string>(''); // 제목 상태 변수
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator)); // 에디터 상태 변수
  const [category, setCategory] = useState<string>(''); // 카테고리 상태 변수
  const [showCreateBoardAlert, setShowCreateBoardAlert] = useState<boolean>(false); // 알림 표시 상태 변수
  const [images, setImages] = useState<File[]>([]); // 업로드된 이미지 상태 변수
  const [existingImages, setExistingImages] = useState<
    {
      [x: string]: string;
      s3Url: string;
      s3Key: string;
    }[]
  >([]); // 기존 이미지 상태 변수 초기화
  const [postMediaIds, setDeleteImages] = useState<string[]>([]); // 삭제할 이미지 상태 변수
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // 스낵바 상태 변수
  const profileNickname = sessionStorage.getItem('nickname');
  const profileImg = sessionStorage.getItem('profileImg') || userAvatar;
  const [currentFontSize, setCurrentFontSize] = useState<string>('14'); // 현재 폰트 크기 상태 변수
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조 변수

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API_BASE_URL.get(`/posts/${postId}`);
        const post = response.data;
        setTitle(post.title);
        const contentState = convertFromRaw(JSON.parse(post.content));
        setEditorState(EditorState.createWithContent(contentState, decorator));
        setCategory(post.category);
        console.log(response.data);
        if (post.media && post.media.length > 0) {
          setExistingImages(
            post.media.map((media: { postMediaId: number; s3Url: string; s3Key: string }) => ({
              postMediaId: media.postMediaId,
              s3Url: media.s3Url,
              s3Key: media.s3Key,
            })),
          ); // 이미지가 있을 경우에만 상태 업데이트
          setDeleteImages([]); // deleteImages를 초기화
        }

        // 마지막 문자 폰트 크기 설정
        const lastBlock = contentState.getLastBlock();
        const lastBlockLength = lastBlock.getLength();
        if (lastBlockLength > 0) {
          const lastCharStyle = contentState.getBlockForKey(lastBlock.getKey()).getInlineStyleAt(lastBlockLength - 1);
          const fontSize = lastCharStyle.find(style => style !== undefined && style.startsWith('FONTSIZE_'));
          if (fontSize) {
            setCurrentFontSize(fontSize.replace('FONTSIZE_', ''));
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  // 에디터 변경 핸들러
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);

    // 현재 커서 위치의 폰트 크기 업데이트
    const selection = state.getSelection();
    if (selection.isCollapsed()) {
      const currentInlineStyle = state.getCurrentInlineStyle();
      const fontSize = currentInlineStyle.find(style => style !== undefined && style.startsWith('FONTSIZE_'));
      if (fontSize) {
        setCurrentFontSize(fontSize.replace('FONTSIZE_', ''));
      } else {
        setCurrentFontSize('14'); // 기본 폰트 크기 설정
      }
    }
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

  const handleDeleteExistingImage = (index: number) => {
    setDeleteImages(prevpostMediaIds => [...prevpostMediaIds, existingImages[index].postMediaId]);
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // 게시물 수정 확인 핸들러
  const confirmCreateBoard = async () => {
    setShowCreateBoardAlert(false);

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState); // 콘텐츠 상태를 Raw 데이터로 변환
    const contentString = JSON.stringify(rawContent); // Raw 데이터를 문자열로 변환
    const formData = new FormData();

    formData.append(
      'dto',
      new Blob([JSON.stringify({ title, content: contentString, category, postMediaIds })], {
        type: 'application/json',
      }),
    );

    images.forEach(file => {
      formData.append('media', file);
    });

    try {
      const response = await API_BASE_URL.put(`/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('게시물 수정 성공');
        console.log('보낸 데이터:', { title, content: contentString, category, images, postMediaIds });
        navigate('/board');
      } else {
        console.error('게시물 수정 실패');
        console.log('응답 상태 코드:', response.status);
        console.log('보낸 데이터:', { title, content: contentString, category, images, postMediaIds });
      }
    } catch (error) {
      console.error('에러:', error);
      console.log('보낸 데이터:', { title, content: contentString, category, images, postMediaIds });
    }
  };

  // 폰트 크기 스타일 필터링 함수
  const filterFontSizeStyles = (content: RawDraftContentState): RawDraftContentState => {
    const newBlocks = content.blocks.map(block => {
      const newInlineStyleRanges = block.inlineStyleRanges.reduce((acc, style) => {
        if (!style.style.startsWith('FONTSIZE_')) {
          acc.push(style);
        }
        return acc.concat(style);
      }, [] as typeof block.inlineStyleRanges);
      return { ...block, inlineStyleRanges: newInlineStyleRanges };
    });
    return { ...content, blocks: newBlocks };
  };

  // 수정 버튼 클릭 핸들러
  const handleModifyClick = () => {
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
    <>
      {loading && <Loading />}
      <Container>
        <CreateContainer>
          <Header>
            <div className="flex justify-end mb-2">
              <Select
                placeholder="카테고리"
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 145,
                  [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                      transform: 'rotate(-180deg)',
                    },
                  },
                }}
                onChange={(event, newValue) => setCategory(newValue as string)}
                value={category}
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
              <TextEditorToolbar
                editorState={editorState}
                onEditorChange={handleEditorChange}
                currentFontSize={currentFontSize}
              />

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
            <ContentContainer className="px-[50px]">
              <Title placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
              <div
                style={{
                  borderRadius: '5px',
                  minHeight: '400px',
                  fontSize: '14px',
                }}
              >
                <Editor
                  editorState={editorState}
                  customStyleMap={styleMap}
                  handleKeyCommand={handleKeyCommand}
                  keyBindingFn={mapKeyToEditorCommand}
                  onChange={handleEditorChange}
                  handleBeforeInput={handleBeforeInput}
                  handleReturn={handleReturn}
                  placeholder="내용을 입력하세요"
                  blockStyleFn={() => 'block-default-font-size'}
                />
              </div>
            </ContentContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '0px', margin: '0 50px' }}>
              {existingImages &&
                existingImages.map((image, index) => (
                  <ImageWrapper key={index}>
                    <StyledImg src={image.s3Url} alt={`Existing image ${index}`} />
                    <DeleteButton onClick={() => handleDeleteExistingImage(index)}>×</DeleteButton>
                  </ImageWrapper>
                ))}
              {images &&
                images.map((image, index) => (
                  <ImageWrapper key={index}>
                    <StyledImg src={URL.createObjectURL(image)} alt={`Uploaded image ${index}`} />
                    <DeleteButton onClick={() => handleDeleteImage(index)}>×</DeleteButton>
                  </ImageWrapper>
                ))}
            </div>
            <FileCount>업로드된 이미지 수: {images.length + existingImages.length}</FileCount>
          </PostBox>
          <div>
            <Button onClick={handleModifyClick} className="ml-auto">
              수정
            </Button>
            {showCreateBoardAlert && (
              <CustomAlert
                message="게시물을 수정하시겠습니까?"
                onConfirm={confirmCreateBoard}
                onCancel={() => setShowCreateBoardAlert(false)}
              />
            )}
          </div>
        </CreateContainer>
        {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
      </Container>
    </>
  );
};

export default ModifyBoard;
