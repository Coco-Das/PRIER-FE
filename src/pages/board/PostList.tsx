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
import PositionedMenu from '../../components/board/PostMenu';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../const/TokenApi';
import useExtractTextFromContent from '../../hooks/UseTextFromContent';

interface PostListProps {
  posts: BoardPost[];
  onPostClick: (postId: number) => void;
  toggleLike: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, toggleLike }) => {
  const formatDate = useFormatDate();
  const extractTextFromContent = useExtractTextFromContent();
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

  const handleLikeClick = async (e: React.MouseEvent, postId: number, liked: boolean) => {
    e.stopPropagation();
    try {
      const response = liked
        ? await API_BASE_URL.delete(`/like/${postId}`)
        : await API_BASE_URL.post(`/like/${postId}`);

      if (response.status === 200) {
        toggleLike(postId);
      } else {
        console.error(`Failed to ${postId} ${liked ? 'unlike' : 'like'} the post`);
      }
    } catch (error) {
      console.error(`Error ${liked ? 'unliking' : 'liking'} the post:`, error);
    }
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
              {post.nickname === '이인지' && (
                <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <PositionedMenu postId={post.postId} />
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
              <LikeButton onClick={(e: React.MouseEvent) => handleLikeClick(e, post.postId, post.likedByUser)}>
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
