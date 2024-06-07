import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
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
  NoPostsMessage,
} from './BoardStyles';
import { posts as initialPosts, Post } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import userAvatar from '../../assets/user.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';
import PostSkeleton from '../../components/board/PostSkeleton';
import NavigationBar from '../../components/board/NavigationBar';

const Board: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('it-news');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>('Community');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const toggleLike = (postId: number) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post =>
        post.boardId === postId ? { ...post, likedByUser: !post.likedByUser } : post,
      );
      return updatedPosts;
    });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setTitle(filter === 'all' ? 'Community' : filter === 'likes' ? 'Likes' : 'My Posts');
  };

  useEffect(() => {
    // 로딩 지연을 시뮬레이션
    setLoading(true);
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 2000); // 지연 시간을 조정하세요
  }, []);

  useEffect(() => {
    let updatedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (activeFilter === 'all') {
      updatedPosts = updatedPosts.filter(post => post.category === activeCategory);
    } else if (activeFilter === 'likes') {
      updatedPosts = updatedPosts.filter(post => post.likedByUser && post.category === activeCategory);
    } else if (activeFilter === 'myposts') {
      updatedPosts = updatedPosts.filter(post => post.myPost && post.category === activeCategory);
    }

    setFilteredPosts(updatedPosts);
  }, [activeCategory, activeFilter, posts]);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container>
      <NavigationBar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        handleCategoryClick={handleCategoryClick}
        handleFilterClick={handleFilterClick}
        title={title}
      />
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostBox key={post.boardId} onClick={() => handlePostClick(post.boardId)}>
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
        ))
      ) : (
        <NoPostsMessage>해당 포스트가 없습니다.</NoPostsMessage>
      )}
      <PaginationComponent />
    </Container>
  );
};

export default Board;
