import React, { useState, useEffect, CSSProperties } from 'react';
import {
  PostListPostBox as PostBox,
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

// 포스트 리스트 컴포넌트
const PostList: React.FC<PostListProps> = ({ posts, onPostClick, toggleLike }) => {
  const formatDate = useFormatDate();
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = useState<number | null>(null);

  // 프로필 클릭 이벤트를 처리하는 함수
  const handleProfileClick = (e: React.MouseEvent, memberId: number) => {
    e.stopPropagation();
    navigate(`/mypage`);
  };

  // 포스트를 클릭하는 함수
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
        <PostBox
          key={post.boardId}
          onClick={() => handlePostClick(post.boardId)}
          category={post.category}
          isActive={post.boardId === activePostId}
        >
          <UserContainer>
            <Avatar
              category={post.category}
              onClick={e => post.category !== 'Notice' && handleProfileClick(e, post.memberId)}
            >
              <AvatarImage src={post.category === 'Notice' ? announcementAvatar : userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author
                category={post.category}
                onClick={e => post.category !== 'Notice' && handleProfileClick(e, post.memberId)}
              >
                {post.category === 'Notice' ? '공지사항' : `작성자 ${post.memberId}`}
              </Author>
              <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            </AuthorContainer>
            {post.memberId === 1 && (
              <div style={{ marginLeft: 'auto' }} onClick={(e: any) => e.stopPropagation()}>
                <PositionedMenu />
              </div>
            )}
          </UserContainer>
          <ContentContainer>{post.title}</ContentContainer>
          {post.images && post.images.length > 0 && <ImageSlider images={post.images} category={post.category} />}
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
        </PostBox>
      ))}
    </>
  );
};

// 이미지 슬라이더 컴포넌트
const ImageSlider: React.FC<{ images: string[]; category: string }> = ({ images, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStyles, setImageStyles] = useState<CSSProperties[]>([]);

  // 이미지 슬라이드 전환을 위한 useEffect 훅
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000); // 5초마다 이미지 변경

      return () => clearInterval(interval);
    }
  }, [images.length]);

  // 이미지를 로드하고 스타일을 설정하는 함수
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
                  // 가로가 긴 이미지
                  resolve({ width: '100%', height: 'auto', maxHeight: '300px' });
                } else if (img.height > img.width) {
                  // 세로가 긴 이미지
                  resolve({ width: 'auto', height: '300px', maxWidth: '500px', objectFit: 'cover' });
                } else {
                  // 가로 세로가 같은 이미지
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
