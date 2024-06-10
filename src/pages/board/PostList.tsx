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
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';

interface PostListProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
  toggleLike: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick, toggleLike }) => {
  return (
    <>
      {posts.map(post => (
        <PostBox key={post.boardId} onClick={() => onPostClick(post.boardId)}>
          <UserContainer>
            <Avatar>
              <AvatarImage src={userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author>{`작성자 ${post.memberId}`}</Author>
              <CreatedAt>{post.createdAt}</CreatedAt>
            </AuthorContainer>
          </UserContainer>
          <ContentContainer>{post.content}</ContentContainer>
          <Image src="image.png" alt="Content" />
          <LikesContainer>
            <Likes>{post.likes} likes</Likes>
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
