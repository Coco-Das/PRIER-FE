import React, { useState, useEffect } from 'react';
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
  userId: number | null;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, userId }) => {
  const formatDate = useFormatDate();
  const extractTextFromContent = useExtractTextFromContent();
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const { likes, toggleLike, isLikedByMe } = useLike();

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

  useEffect(() => {
    console.log(likes);
  }, [likes]);

  return (
    <>
      {posts.map(post => {
        const likeState = likes[post.postId] || { isLiked: post.isLikedByMe, likeCount: post.likes };
        const currentIsLiked = likeState.isLiked;

        return (
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
                  <Author
                    category={post.category}
                    onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, 1)}
                  >
                    {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
                  </Author>
                  <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
                </AuthorContainer>
                {userId === post.userId && (
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
                {post.media && post.media.length > 0 && (
                  <Image src={post.media[0].s3Url} alt={post.media[0].metadata} />
                )}
              </ContentContainer>
              <LikesContainer>
                <Likes>좋아요 {likeState.likeCount}</Likes>
                <LikeButton
                  onClick={async (e: React.MouseEvent) => {
                    e.stopPropagation();
                    await toggleLike(post.postId, currentIsLiked);
                  }}
                >
                  <LikeIcon src={currentIsLiked ? Like : UnLike} alt="좋아요/좋아요 취소" />
                </LikeButton>
              </LikesContainer>
            </PostBox>
          </BackgroundContainer>
        );
      })}
    </>
  );
};

export default PostList;
