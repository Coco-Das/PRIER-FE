/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import {
  PostDetailContainer,
  PostContentContainer,
  CommentsContainer,
  Backto,
  UserContainer,
  Avatar,
  AvatarImage,
  AuthorContainer,
  Author,
  TimeViews,
  ContentContainer,
  Image,
  LikesContainer,
  Likes,
  LikeBackContainer,
  CommentContainer,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentText,
  CommentCreatedAt,
  CommentInputContainer,
  CommentInput,
  CommentButton,
} from './BoardStyles';
import backto from '../../assets/BackTo.svg';
import announcementAvatar from '../../assets/Announcement.svg';
import useFormatDate from '../../hooks/UseFormatDate';
import PostMenu from '../../components/board/PostMenu';
import CommentMenu from '../../components/board/CommentMenu';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/utils/Loading';
import axios from 'axios';
import { API_BASE_URL } from '../../const/TokenApi';
import useExtractTextFromContent from '../../hooks/UseTextFromContent';
import ImageModal from '../../components/board/ImageModal'; // 모달 컴포넌트 임포트
import useLike from '../../hooks/UseLike';
import { LinkUserProfile } from '../../services/UserApi';
import { useUserStore } from '../../states/user/UserStore';
import { Editor, EditorState, convertFromRaw, CompositeDecorator } from 'draft-js'; // Draft.js 임포트
import 'draft-js/dist/Draft.css';

// CreateBoard에서 사용한 styleMap과 decorator를 가져옵니다.
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
  // 폰트 크기 스타일 추가
  ...Array.from({ length: 1000 }, (_, i) => i + 1).reduce((acc, size) => {
    acc[`FONTSIZE_${size}`] = { fontSize: `${size}px` };
    return acc;
  }, {} as Record<string, React.CSSProperties>),
  default: {
    fontSize: '12px', // 기본 폰트 크기 설정
  },
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

interface Media {
  metadata: string;
  mediaType: string;
  s3Url: string;
}

interface Comment {
  writerId: number;
  nickname: string; // 닉네임 속성 추가
  content: string;
  createdAt: string;
  updatedAt: string | null;
  commentId: number;
  writerProfileUrl: string;
}

interface Post {
  isLikedByMe: any;
  writerId: number;
  postId: number;
  title: string;
  content: string;
  nickname: string;
  category: string;
  writerProfileUrl: string;
  media: Media[];
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string | null;
  comments: Comment[];
}

interface PostDetailProps {
  postId: number;
  onBackToList: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBackToList }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const formatDate = useFormatDate();
  const extractTextFromContent = useExtractTextFromContent();
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem('userId');
  const USER_ID = storedUserId ? Number(storedUserId) : null;
  const userProfile = useUserStore(state => state.userProfile);

  const { likes, toggleLike } = useLike();
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await API_BASE_URL.get(`/posts/${postId}`);
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);
  if (!post) {
    return <div></div>;
  }

  const handleProfileClick = async (e: React.MouseEvent, writerId: number) => {
    e.stopPropagation();
    if (writerId === USER_ID) {
      navigate(`/mypage`);
    } else {
      await LinkUserProfile(writerId);
      navigate(`/profile/${writerId}`);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        if (editingCommentId !== null) {
          // 댓글 수정 로직
          const response = await API_BASE_URL.put(`/posts/${postId}/comment/${editingCommentId}`, {
            content: newComment,
          });

          if (response.status === 200) {
            const updatedComments = post.comments.map(comment =>
              comment.commentId === editingCommentId ? { ...comment, content: newComment } : comment,
            );
            setPost({ ...post, comments: updatedComments });
            setEditingCommentId(null);
          }
        } else {
          // 댓글 전송 로직
          const response = await API_BASE_URL.post(`/posts/${postId}/comment`, {
            content: newComment,
          });

          fetchPost();
          if (response.status === 201) {
            const newCommentData: Comment = {
              writerId: USER_ID!,
              nickname: userProfile.nickname,
              content: newComment,
              createdAt: new Date().toISOString(),
              updatedAt: null,
              commentId: response.data.commentId,
              writerProfileUrl: response.data.writerProfileUrl,
            };
            window.location.reload();

            setPost({ ...post, comments: [...post.comments, newCommentData] });
          }
        }
        setNewComment('');
      } catch (error) {
        console.error('댓글 전송 중 오류 발생:', error);
      }
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = post.comments.find(c => c.commentId === commentId);
    if (comment) {
      setNewComment(comment.content);
      setEditingCommentId(commentId);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/comment/${commentId}`);
      if (response.status === 200) {
        const updatedComments = post.comments.filter(comment => comment.commentId !== commentId);
        setPost({ ...post, comments: updatedComments });
        window.location.reload();
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  const openModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalImageUrl(null);
    });
  };

  const likeState = likes[post.postId] || { isLiked: post.isLikedByMe, likeCount: post.likes };
  const currentIsLiked = likeState.isLiked;

  // content를 EditorState로 변환
  const contentState = convertFromRaw(JSON.parse(post.content));
  const editorState = EditorState.createWithContent(contentState, decorator);

  return (
    <PostDetailContainer className="flex">
      {loading ? (
        <Loading />
      ) : (
        <>
          <PostContentContainer className="self-start mt-0" category={post.category}>
            <UserContainer className="mt-[-16px]">
              <Avatar
                className="ml-[-8px] mt-[5px]"
                onClick={e => handleProfileClick(e, post.writerId)}
                category={post.category}
              >
                <AvatarImage
                  src={post.category === 'NOTICE' ? announcementAvatar : post.writerProfileUrl}
                  alt="Avatar"
                />
              </Avatar>
              <AuthorContainer>
                <Author onClick={e => handleProfileClick(e, post.writerId)} category={post.category}>
                  {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
                </Author>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TimeViews>{formatDate(post.createdAt)}</TimeViews>
                  <div style={{ width: '4px', height: '4px', backgroundColor: '#828282', borderRadius: '50%' }}></div>
                  <TimeViews>조회수 {post.views}회 </TimeViews>
                </div>
              </AuthorContainer>
              {USER_ID === post.writerId && (
                <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <PostMenu postId={post.postId} title={post.title} />
                </div>
              )}
            </UserContainer>
            <ContentContainer className=" px-[50px] flex flex-col items-start self-center w-[100%]">
              <h1 className="text-xl font-semibold	 mb-8">{post.title}</h1>
              <div className=" w-[100%]" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div
                  style={{
                    fontSize: '12px',
                  }}
                >
                  <Editor editorState={editorState} customStyleMap={styleMap} readOnly={true} onChange={() => {}} />
                </div>
              </div>
              {post.media && post.media.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {post.media.map((mediaItem, index) => (
                    <Image
                      key={index}
                      src={mediaItem.s3Url}
                      alt={mediaItem.metadata}
                      onClick={() => openModal(mediaItem.s3Url)}
                    />
                  ))}
                </div>
              )}
            </ContentContainer>
            <LikeBackContainer>
              <button onClick={onBackToList} className="w-[15px] mt-[10px]">
                <Backto src={backto} />
              </button>
              <LikesContainer style={{ zIndex: 1 }}>
                <Likes>Likes {likeState.likeCount}</Likes>
                <label className="ui-like" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={currentIsLiked}
                    onChange={async e => {
                      e.stopPropagation();
                      await toggleLike(post.postId, currentIsLiked);
                    }}
                  />
                  <div className="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
                      <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                    </svg>
                  </div>
                </label>
              </LikesContainer>
            </LikeBackContainer>
          </PostContentContainer>
          <CommentsContainer className="mt-0">
            {loading ? (
              <Loading />
            ) : post.comments.length === 0 ? (
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">아직 댓글이 없습니다.</p>
                <p className="text-sm text-gray-600 mt-2">댓글을 남겨보세요.</p>
              </div>
            ) : (
              post.comments.map(comment => {
                return (
                  <CommentContainer key={comment.commentId} className="flex justify-between">
                    <CommentAvatar onClick={e => handleProfileClick(e, comment.writerId)}>
                      <AvatarImage src={comment.writerProfileUrl} alt="Avatar" />
                    </CommentAvatar>
                    <CommentContent className="flex-1">
                      <div className="flex flex-row items-center space-x-2 justify-between">
                        <div className="flex flex-row items-center space-x-2">
                          <CommentAuthor
                            onClick={e => handleProfileClick(e, comment.writerId)}
                            category={post.category}
                          >
                            {comment.nickname}
                          </CommentAuthor>
                          <CommentCreatedAt>{formatDate(comment.createdAt)}</CommentCreatedAt>
                        </div>
                        {USER_ID === comment.writerId && (
                          <div>
                            <CommentMenu
                              commentId={comment.commentId}
                              postId={post.postId}
                              title={post.title}
                              onEditClick={handleEditComment}
                              onDeleteSuccess={() => handleDeleteComment(comment.commentId)}
                              commentContent={comment.content}
                            />
                          </div>
                        )}
                      </div>
                      <CommentText>{comment.content}</CommentText>
                    </CommentContent>
                  </CommentContainer>
                );
              })
            )}
            <CommentInputContainer className="">
              <CommentInput type="text" value={newComment} onChange={handleCommentChange} placeholder="댓글 달기..." />
              <CommentButton onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                {editingCommentId !== null ? '수정' : '게시'}
              </CommentButton>
            </CommentInputContainer>
          </CommentsContainer>

          {isModalOpen && <ImageModal imageUrl={modalImageUrl} onClose={closeModal} />}
        </>
      )}
    </PostDetailContainer>
  );
};

export default PostDetail;
