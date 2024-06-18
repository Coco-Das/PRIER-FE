// src/components/board/PostList.tsx
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
  Image,
} from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore';
import userAvatar from '../../assets/user.svg';
import announcementAvatar from '../../assets/Announcement.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import useFormatDate from '../../hooks/UseFormatDate';
import PostMenu from '../../components/board/PostMenu';
import { useNavigate } from 'react-router-dom';
import useExtractTextFromContent from '../../hooks/UseTextFromContent';
import useLike from '../../hooks/UseLike';

interface PostListProps {
  posts: BoardPost[];
  onPostClick: (postId: number) => void;
  userId: number | null; // userId를 props로 받음
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, userId }) => {
  const formatDate = useFormatDate();
  const extractTextFromContent = useExtractTextFromContent();
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const { likes, toggleLike } = useLike();

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
              <Avatar category={post.category} onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, 1)}>
                <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
              </Avatar>
              <AuthorContainer>
                <Author category={post.category} onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, 1)}>
                  {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
                </Author>
                <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
              </AuthorContainer>
              {userId === post.userId && ( // USER_ID와 post.userId가 같을 때만 PositionedMenu 표시
                <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <PostMenu postId={post.postId} />
                </div>
              )}
            </UserContainer>
            <ContentContainer>
              <h2>{post.title}</h2>
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
              {post.media && post.media.length > 0 && <Image src={post.media[0].s3Url} alt={post.media[0].metadata} />}
            </ContentContainer>
            <LikesContainer>
              <Likes>likes {post.likes}</Likes>
              <LikeButton onClick={(e: React.MouseEvent) => toggleLike(post.postId, post.isLikedByMe)}>
                <LikeIcon src={likes[post.postId] ?? post.isLikedByMe ? Like : UnLike} alt="like/unlike" />
              </LikeButton>
            </LikesContainer>
          </PostBox>
        </BackgroundContainer>
      ))}
    </>
  );
};

export default PostList;
