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
import { comments as initialComments } from '../../states/board/ChatStore';
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

interface PostDetailProps {
  postId: number;
  onBackToList: () => void;
  toggleLike: (postId: number) => void;
  posts: BoardPost[];
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBackToList, toggleLike, posts }) => {
  const post = posts.find(post => post.postId === postId);
  const postComments = initialComments.filter(comment => comment.boardId === postId);

  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const formatDate = useFormatDate();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false); // 상세보기 로딩 제거
  }, [postId]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const getMemberById = (memberId: number) => {
    return members.find(member => member.memberId === memberId);
  };

  const handleProfileClick = (e: React.MouseEvent, memberId: number) => {
    e.stopPropagation();
    navigate(`/mypage`);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      if (editingCommentId !== null) {
        // 여기에 댓글 수정 로직을 추가하세요.
        console.log('Comment edited:', editingCommentId, newComment);
        setEditingCommentId(null);
      } else {
        // 여기에 댓글 전송 로직을 추가하세요.
        console.log('New comment submitted:', newComment);
      }
      setNewComment('');
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = postComments.find(c => c.commentId === commentId);
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
            <Avatar onClick={e => handleProfileClick(e, post.nickname)} category={post.category}>
              <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author onClick={e => handleProfileClick(e, post.nickname)} category={post.category}>
                {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
              </Author>
              <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            </AuthorContainer>
            {post.nickname === 1 && (
              <div className="ml-auto">
                <PostMenu postId={post.postId} />
              </div>
            )}
          </UserContainer>
          <ContentContainer className="flex flex-col items-start">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.images &&
              post.images.map((image, index) => (
                <Image key={index} src={image} alt={`Content image ${index + 1}`} category={post.category} />
              ))}
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
        ) : postComments.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">아직 댓글이 없습니다.</p>
            <p className="text-sm text-gray-600 mt-2">댓글을 남겨보세요.</p>
          </div>
        ) : (
          postComments.map(comment => {
            const member = getMemberById(comment.memberId);
            return (
              <CommentContainer key={comment.commentId} className="flex justify-between">
                {member && (
                  <CommentAvatar onClick={e => handleProfileClick(e, comment.memberId)}>
                    <AvatarImage src={member.profilePicture} alt={member.name} />
                  </CommentAvatar>
                )}
                <CommentContent className="flex-1">
                  <div className="flex flex-row items-center space-x-2 justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <CommentAuthor onClick={e => handleProfileClick(e, comment.memberId)} category={post.category}>
                        {member?.name}
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
