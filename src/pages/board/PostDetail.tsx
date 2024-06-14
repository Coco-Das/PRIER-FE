import React, { useState, useEffect } from 'react';
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
  CreatedAt,
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
import { BoardPost } from '../../states/board/BoardStore';
import { members } from '../../states/board/MemberStore';
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

interface PostDetailProps {
  postId: number;
  onBackToList: () => void;
  toggleLike: (postId: number) => void;
  posts: BoardPost[];
}

interface Comment {
  commentId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  memberId: number;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBackToList, toggleLike, posts }) => {
  const post = posts.find(post => post.postId === postId);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const formatDate = useFormatDate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comment`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const getMemberById = (memberId: number) => {
    return members.find(member => member.userId === memberId);
  };

  const handleProfileClick = (e: React.MouseEvent, memberId: number) => {
    e.stopPropagation();
    navigate(`/mypage`);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        if (editingCommentId !== null) {
          // 댓글 수정 로직
          const response = await axios.put(`${API_BASE_URL}/posts/${postId}/comment/${editingCommentId}`, {
            content: newComment,
          });

          if (response.status === 200) {
            console.log('Comment edited:', editingCommentId, newComment);
            // 댓글 수정 후 UI를 업데이트하기 위한 추가 로직을 작성하세요.
            setEditingCommentId(null);
            setComments(
              comments.map(comment =>
                comment.commentId === editingCommentId ? { ...comment, content: newComment } : comment,
              ),
            );
          } else {
            console.error('댓글 수정 실패:', response.status);
            console.log(newComment);
          }
        } else {
          // 댓글 전송 로직
          console.log(newComment);

          const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comment`, {
            content: newComment,
          });

          if (response.status === 202) {
            console.log('New comment submitted:', newComment);
            // 댓글 제출 후 UI를 업데이트하기 위한 추가 로직을 작성하세요.
            setComments([...comments, response.data]);
          } else {
            console.error('댓글 전송 실패:', response.status);
          }
        }
        setNewComment('');
      } catch (error) {
        console.error('댓글 전송 중 오류 발생:', error, newComment);
        console.log(postId, newComment);
      }
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find(c => c.commentId === commentId);
    if (comment) {
      setNewComment(comment.content);
      setEditingCommentId(commentId);
    }
  };

  return (
    <PostDetailContainer>
      {loading ? (
        <Loading />
      ) : (
        <PostContentContainer category={post.category}>
          <UserContainer>
            <Avatar onClick={e => handleProfileClick(e, 1)} category={post.category}>
              <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author onClick={e => handleProfileClick(e, 1)} category={post.category}>
                {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
              </Author>
              <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            </AuthorContainer>
            {post.nickname === '이인지' && (
              <div className="ml-auto">
                <PostMenu postId={post.postId} />
              </div>
            )}
          </UserContainer>
          <ContentContainer className="flex flex-col items-start">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.media && post.media.length > 0 && <Image src={post.media[0].s3Url} alt={post.media[0].metadata} />}
          </ContentContainer>
          <LikeBackContainer>
            <button onClick={onBackToList}>
              <Backto src={backto} />
            </button>
            <LikesContainer>
              <Likes>likes {post.likes}</Likes>
              <LikeButton
                onClick={(e: any) => {
                  e.stopPropagation();
                  toggleLike(post.postId);
                }}
              >
                <LikeIcon src={post.likedByUser ? Like : UnLike} alt="like/unlike" />
              </LikeButton>
            </LikesContainer>
          </LikeBackContainer>
        </PostContentContainer>
      )}
      <CommentsContainer>
        {loading ? (
          <Loading />
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">아직 댓글이 없습니다.</p>
            <p className="text-sm text-gray-600 mt-2">댓글을 남겨보세요.</p>
          </div>
        ) : (
          comments.map(comment => {
            const member = getMemberById(comment.memberId);
            return (
              <CommentContainer key={comment.commentId} className="flex justify-between">
                {member && (
                  <CommentAvatar onClick={e => handleProfileClick(e, comment.memberId)}>
                    <AvatarImage src={member.profilePicture} alt={member.nickname} />
                  </CommentAvatar>
                )}
                <CommentContent className="flex-1">
                  <div className="flex flex-row items-center space-x-2 justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <CommentAuthor onClick={e => handleProfileClick(e, comment.memberId)} category={post.category}>
                        {member?.nickname}
                      </CommentAuthor>
                      <CommentCreatedAt>{formatDate(comment.createdAt)}</CommentCreatedAt>
                    </div>
                    {comment.memberId === 1 && (
                      <div>
                        <CommentMenu commentId={comment.commentId} onEditClick={handleEditComment} />
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
    </PostDetailContainer>
  );
};

export default PostDetail;
