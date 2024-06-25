import React, { useState, useEffect, CSSProperties } from 'react';
import {
  BackgroundContainer,
  PostListPostBox as PostBox,
  UserContainer,
  Avatar,
  AvatarImage,
  AuthorContainer,
  Author,
  TimeViews,
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
import { LinkUserProfile } from '../../services/UserApi';

interface PostListProps {
  posts: BoardPost[];
  onPostClick: (postId: number) => void;
  userId: number | null;
  activeSort: string;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, userId, activeSort }) => {
  const formatDate = useFormatDate();
  const extractTextFromContent = useExtractTextFromContent();
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const { likes, toggleLike, isLikedByMe } = useLike();
  const storedUserId = localStorage.getItem('userId');
  const USER_ID = storedUserId ? Number(storedUserId) : null;

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

  const sortedPosts = [...posts].sort((a, b) => {
    if (activeSort === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (activeSort === 'registration') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (activeSort === 'popular') {
      if (b.likes === a.likes) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.likes - a.likes;
    } else if (activeSort === 'views') {
      if (b.views === a.views) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.views - a.views;
    }
    return 0;
  });

  return (
    <>
      {sortedPosts.map(post => {
        const likeState = likes[post.postId] || { isLiked: post.isLikedByMe, likeCount: post.likes };
        const currentIsLiked = likeState.isLiked;

        const content = extractTextFromContent(post.content);
        const lines = content.split('\n');
        const displayContent = lines.length > 2 ? `${lines.slice(0, 2).join('\n')}\n...` : content;

        return (
          <BackgroundContainer
            key={post.postId}
            isActive={post.postId === activePostId}
            onClick={() => handlePostClick(post.postId)}
          >
            <PostBox category={post.category}>
              <UserContainer>
                <Avatar
                  category={post.category}
                  onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, post.userId)}
                  className="mt-[5px]"
                >
                  <AvatarImage src={post.category === 'NOTICE' ? announcementAvatar : userAvatar} alt="Avatar" />
                </Avatar>
                <AuthorContainer>
                  <Author
                    category={post.category}
                    onClick={e => post.category !== 'NOTICE' && handleProfileClick(e, post.userId)}
                  >
                    {post.category === 'NOTICE' ? '공지사항' : `${post.nickname}`}
                  </Author>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TimeViews>{formatDate(post.createdAt)}</TimeViews>
                    <div style={{ width: '4px', height: '4px', backgroundColor: '#828282', borderRadius: '50%' }}></div>
                    <TimeViews>조회수 {post.views}회 </TimeViews>
                  </div>
                </AuthorContainer>
                {userId === post.userId && (
                  <div style={{ marginLeft: 'auto' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <PostMenu postId={post.postId} title={post.title} insidePostBox />
                  </div>
                )}
              </UserContainer>
              <ContentContainer className="flex flex-col items-start w-[1000px] self-center">
                <h1 className="text-xl font-bold mb-8">{post.title}</h1>
                {post.media && post.media.length > 0 ? (
                  <ImageSlider images={post.media.map(m => m.s3Url)} category={post.category} />
                ) : (
                  <p className="single-line-text">
                    {displayContent.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </ContentContainer>
              <LikesContainer>
                <Likes>Likes {likeState.likeCount}</Likes>
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

const ImageSlider: React.FC<{ images: string[]; category: string }> = ({ images, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStyles, setImageStyles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  useEffect(() => {
    const loadImages = async () => {
      const styles = await Promise.all(
        images.map(
          src =>
            new Promise<CSSProperties>(resolve => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => {
                if (img.width > img.height) {
                  resolve({ width: '100%', height: 'auto', maxHeight: '300px' });
                } else if (img.height > img.width) {
                  resolve({ width: 'auto', height: '300px', maxWidth: '500px', objectFit: 'cover' });
                } else {
                  resolve({ width: 'auto', height: '300px', objectFit: 'contain' });
                }
              };
            }),
        ),
      );
      setImageStyles(styles);
    };

    loadImages();
  }, [images]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Content image ${index + 1}`}
          category={category}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
            ...imageStyles[index],
          }}
        />
      ))}
    </div>
  );
};

export default PostList;
