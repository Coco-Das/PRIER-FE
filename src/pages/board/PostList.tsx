import React from 'react';
import {
  PostBox,
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
import { Post } from '../../states/board/BoardStore';
import userAvatar from '../../assets/user.svg';
import announcementAvatar from '../../assets/Announcement.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import useFormatDate from '../../hooks/UseFormatDate';
import PositionedMenu from '../../components/board/PositionedMenu';

interface PostListProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
  toggleLike: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, toggleLike }) => {
  const formatDate = useFormatDate();

  return (
    <>
      {posts.map(post => (
        <PostBox key={post.boardId} onClick={() => onPostClick(post.boardId)} category={post.category}>
          <UserContainer>
            <Avatar category={post.category}>
              <AvatarImage src={post.category === 'Notice' ? announcementAvatar : userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author category={post.category}>
                {post.category === 'Notice' ? '공지사항' : `작성자 ${post.memberId}`}
              </Author>
              <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
            </AuthorContainer>
            {post.memberId === 1 && ( // memberId가 1일 때만 메뉴바를 렌더링
              <div style={{ marginLeft: 'auto' }} onClick={(e: any) => e.stopPropagation()}>
                {/* 메뉴를 오른쪽에 배치하고 클릭 이벤트 버블링 방지 */}
                <PositionedMenu />
              </div>
            )}
          </UserContainer>
          <ContentContainer>{post.title}</ContentContainer>
          <Image src="image.png" alt="Content" category={post.category} />
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

export default PostList;
