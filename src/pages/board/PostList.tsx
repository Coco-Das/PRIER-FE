import React, { useState } from 'react';
import {
  BackgroundContainer,
  PostListPostBox as PostBox,
  UserContainer,
  Avatar,
  AvatarImage,
  AuthorContainer,
  Author,
  CreatedAt,
  ContentContainer,
  LikesContainer,
  Likes,
  LikeButton,
  LikeIcon,
} from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore';
import userAvatar from '../../assets/user.svg';
import announcementAvatar from '../../assets/Announcement.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import useFormatDate from '../../hooks/UseFormatDate';
import PositionedMenu from '../../components/board/PositionedMenu';
import { useNavigate } from 'react-router-dom';

interface PostListProps {
  posts: BoardPost[];
  onPostClick: (postId: number) => void;
  toggleLike: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, toggleLike }) => {
  const formatDate = useFormatDate();
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = useState<number | null>(null);

  const handleProfileClick = (e: React.MouseEvent, memberId: number) => {
    e.stopPropagation();
    navigate(`/mypage`);
  };

  const handlePostClick = (postId: number) => {
    setActivePostId(postId);
    setTimeout(() => {
      onPostClick(postId);
      navigate(`/board/post/${postId}`);
    }, 2000);
  };

  return (
    <>
      {posts.map(post => (
        <BackgroundContainer
          key={post.postId}
          isActive={post.postId === activePostId}
          onClick={() => handlePostClick(post.postId)}
        >
          <PostBox category={post.category}>
            <UserContainer>
              <Avatar
                category={post.category}
                onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, post.nickname)}
              >
                <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
              </Avatar>
              <AuthorContainer>
                <Author
                  category={post.category}
                  onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, post.nickname)}
                >
                  {post.category === 'NOTICE' ? '공지사항' : `작성자 ${post.nickname}`}
                </Author>
                <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
              </AuthorContainer>
              {post.nickname === 1 && (
                <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <PositionedMenu postId={post.postId} />
                </div>
              )}
            </UserContainer>
            <ContentContainer>{post.title}</ContentContainer>
            <LikesContainer>
              <Likes>likes {post.likes}</Likes>
              <LikeButton
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  toggleLike(post.postId);
                }}
              >
                <LikeIcon src={post.likedByUser ? Like : UnLike} alt="like/unlike" />
              </LikeButton>
            </LikesContainer>
          </PostBox>
        </BackgroundContainer>
      ))}
    </>
  );
};

export default PostList;
