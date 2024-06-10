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
import announcementAvatar from '../../assets/Announcement.svg'; // 공지사항 아바타 이미지 추가
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import useFormatDate from '../../hooks/UseFormatDate'; // 경로 수정

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
        <PostBox
          key={post.boardId}
          onClick={() => onPostClick(post.boardId)}
          category={post.category} // 카테고리 props 추가
        >
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
          </UserContainer>
          <ContentContainer>{post.title}</ContentContainer>
          <Image src="image.png" alt="Content" category={post.category} /> {/* category prop 추가 */}
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
