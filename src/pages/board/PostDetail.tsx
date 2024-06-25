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
  LikeButton,
  LikeIcon,
  CommentContainer,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentText,
  CommentCreatedAt,
  LikeBackContainer,
  CommentInputContainer,
  CommentInput,
  CommentButton,
} from './BoardStyles';
import backto from '../../assets/BackTo.svg';
import userAvatar from '../../assets/user.svg';
import announcementAvatar from '../../assets/Announcement.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
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

interface Media {
  metadata: string;
  mediaType: string;
  s3Url: string;
}

interface Comment {
  userId: number;
  nickname: string; // 닉네임 속성 추가
  content: string;
  createdAt: string;
  updatedAt: string | null;
  commentId: number;
}

interface Post {
  isLikedByMe: any;
  userId: number;
  postId: number;
  title: string;
  content: string;
  nickname: string;
  category: string;
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

  const { likes, toggleLike, isLikedByMe } = useLike();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await API_BASE_URL.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleProfileClick = async (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    if (userId == USER_ID) {
      navigate(`/mypage`);
      console.log('myID:', USER_ID);
      console.log('Profile ID:', userId);
    } else {
      await LinkUserProfile(userId);
      navigate(`/profile/${userId}`);
      console.log('myID:', USER_ID);
      console.log('Profile ID:', userId);
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
            console.log('댓글 수정:', editingCommentId, newComment);
            const updatedComments = post.comments.map(comment =>
              comment.commentId === editingCommentId ? { ...comment, content: newComment } : comment,
            );
            setPost({ ...post, comments: updatedComments });
            setEditingCommentId(null);
          } else {
            console.error('댓글 수정 실패:', response.status);
          }
        } else {
          // 댓글 전송 로직
          const response = await API_BASE_URL.post(`/posts/${postId}/comment`, {
            content: newComment,
          });

          if (response.status === 201) {
            console.log('새 댓글 제출:', newComment);
            const newCommentData: Comment = {
              userId: USER_ID!, // 실제 사용자 ID로 대체해야 합니다.
              nickname: userProfile.nickname, // 댓글 작성자의 닉네임 추가
              content: newComment,
              createdAt: new Date().toISOString(),
              updatedAt: null,
              commentId: response.data.commentId,
            };
            window.location.reload(); // 페이지 새로고침

            setPost({ ...post, comments: [...post.comments, newCommentData] });
          } else {
            console.error('댓글 전송 실패:', response.status);
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
        console.log('댓글 삭제:', commentId);
        const updatedComments = post.comments.filter(comment => comment.commentId !== commentId);
        setPost({ ...post, comments: updatedComments });
        window.location.reload(); // 페이지 새로고침
      } else {
        console.error('댓글 삭제 실패:', response.status);
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
    }); // fadeOut 애니메이션 시간과 일치
  };

  const likeState = likes[post.postId] || { isLiked: post.isLikedByMe, likeCount: post.likes };
  const currentIsLiked = likeState.isLiked;

  return (
    <PostDetailContainer className="flex">
      {loading ? (
        <Loading />
      ) : (
        <PostContentContainer className="self-start mt-0" category={post.category}>
          <UserContainer className="mt-[-16px]">
            <Avatar
              className="ml-[-8px] mt-[5px]"
              onClick={e => handleProfileClick(e, post.userId)}
              category={post.category}
            >
              <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author onClick={e => handleProfileClick(e, post.userId)} category={post.category}>
                {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
              </Author>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TimeViews>{formatDate(post.createdAt)}</TimeViews>
                <div style={{ width: '4px', height: '4px', backgroundColor: '#828282', borderRadius: '50%' }}></div>
                <TimeViews>조회수 {post.views}회 </TimeViews>
              </div>
            </AuthorContainer>
            {USER_ID === post.userId && (
              <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <PostMenu postId={post.postId} title={post.title} />
              </div>
            )}
          </UserContainer>
          <ContentContainer className="flex flex-col items-start w-[600px] self-center">
            <h1 className="text-xl font-bold  mb-8">{post.title}</h1>
            <p>
              {extractTextFromContent(post.content)
                .split('\n')
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
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
            <LikesContainer>
              <Likes>Likes {likeState.likeCount}</Likes>
              <LikeButton
                onClick={async (e: any) => {
                  e.stopPropagation();
                  await toggleLike(post.postId, currentIsLiked);
                }}
              >
                <LikeIcon src={currentIsLiked ? Like : UnLike} alt="좋아요/좋아요 취소" />
              </LikeButton>
            </LikesContainer>
          </LikeBackContainer>
        </PostContentContainer>
      )}
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
                <CommentAvatar onClick={e => handleProfileClick(e, comment.userId)}>
                  <AvatarImage src={userAvatar} alt="Avatar" />
                </CommentAvatar>
                <CommentContent className="flex-1">
                  <div className="flex flex-row items-center space-x-2 justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <CommentAuthor onClick={e => handleProfileClick(e, comment.userId)} category={post.category}>
                        {comment.nickname}
                      </CommentAuthor>
                      <CommentCreatedAt>{formatDate(comment.createdAt)}</CommentCreatedAt>
                    </div>
                    {USER_ID === comment.userId && (
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
        <CommentInputContainer>
          <CommentInput type="text" value={newComment} onChange={handleCommentChange} placeholder="댓글 달기..." />
          <CommentButton onClick={handleCommentSubmit}>{editingCommentId !== null ? '수정' : '게시'}</CommentButton>
        </CommentInputContainer>
      </CommentsContainer>

      {/* 모달 컴포넌트 사용 */}
      {isModalOpen && <ImageModal imageUrl={modalImageUrl} onClose={closeModal} />}
    </PostDetailContainer>
  );
};

export default PostDetail;
