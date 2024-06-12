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
} from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore'; // 수정된 인터페이스 임포트
import { comments as initialComments } from '../../states/board/ChatStore';
import { members } from '../../states/board/MemberStore';
import backto from '../../assets/BackTo.svg';
import userAvatar from '../../assets/user.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import PostDetailSkeleton from '../../components/board/PostDetailSkeleton';
import useFormatDate from '../../hooks/UseFormatDate';
import PositionedMenu from '../../components/board/PositionedMenu';
import { useNavigate } from 'react-router-dom';

interface PostDetailProps {
  postId: number;
  onBackToList: () => void;
  toggleLike: (postId: number) => void;
  posts: BoardPost[]; // 수정된 인터페이스 사용
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBackToList, toggleLike, posts }) => {
  const post = posts.find(post => post.boardId === postId);
  const postComments = initialComments.filter(comment => comment.boardId === postId);

  const [loading, setLoading] = useState(true);
  const formatDate = useFormatDate();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  return (
    <PostDetailContainer>
      {loading ? (
        <PostDetailSkeleton />
      ) : (
        <PostContentContainer>
          <UserContainer>
            <Avatar onClick={e => handleProfileClick(e, post.memberId)}>
              <AvatarImage src={userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author onClick={e => handleProfileClick(e, post.memberId)}>{`작성자 ${post.memberId}`}</Author>
              <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            </AuthorContainer>
            {post.memberId === 1 && (
              <div className="ml-auto">
                <PositionedMenu />
              </div>
            )}
          </UserContainer>
          <ContentContainer className="flex flex-col items-start">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.images &&
              post.images.map((image, index) => <Image key={index} src={image} alt={`Content image ${index + 1}`} />)}
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
                  toggleLike(post.boardId);
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
          <PostDetailSkeleton />
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
                      <CommentAuthor onClick={e => handleProfileClick(e, comment.memberId)}>
                        {member?.name}
                      </CommentAuthor>
                      <CommentCreatedAt>{formatDate(comment.createdAt)}</CommentCreatedAt>
                    </div>
                    {comment.memberId === 1 && (
                      <div>
                        <PositionedMenu />
                      </div>
                    )}
                  </div>
                  <CommentText>{comment.content}</CommentText>
                </CommentContent>
              </CommentContainer>
            );
          })
        )}
      </CommentsContainer>
    </PostDetailContainer>
  );
};

export default PostDetail;
