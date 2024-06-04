import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Navigation,
  Button,
  ButtonText,
  SegmentedControlContainer,
  SegmentedControl,
  MenuItem,
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
  CategoryButtonsContainer,
  CategoryButton,
  NoPostsMessage,
} from './BoardStyles';
import { posts as initialPosts, Post } from '../../states/board/BoardStore';
import SearchInput from '../../components/SearchInput';
import PaginationComponent from '../../components/PaginationComponent';
import userAvatar from '../../assets/user.svg';
import UnLike from '../../assets/UnLike.svg';
import Like from '../../assets/Like.svg';

const categoryLabels: { [key: string]: string } = {
  'it-news': 'IT 지식',
  chat: '잡담/일상',
  tech: '기술',
  internship: '인턴십/공모전',
  notice: '공지사항',
};

const Board: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('it-news');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [title, setTitle] = useState<string>('Community');

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

  return (
    <Container>
      <Title>{title}</Title>
      <Navigation>
        <SegmentedControlContainer>
          <SegmentedControl>
            {Object.keys(categoryLabels).map(category => (
              <MenuItem
                key={category}
                active={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              >
                {categoryLabels[category]}
              </MenuItem>
            ))}
          </SegmentedControl>
        </SegmentedControlContainer>
        <CategoryButtonsContainer>
          <CategoryButton active={activeFilter === 'all'} onClick={() => handleFilterClick('all')}>
            All
          </CategoryButton>
          <CategoryButton active={activeFilter === 'likes'} onClick={() => handleFilterClick('likes')}>
            Likes
          </CategoryButton>
          <CategoryButton active={activeFilter === 'myposts'} onClick={() => handleFilterClick('myposts')}>
            My Posts
          </CategoryButton>
        </CategoryButtonsContainer>
        <SearchInput />
        <Button>
          <ButtonText>새 글 작성하기</ButtonText>
        </Button>
      </Navigation>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostBox key={post.boardId}>
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
              <LikeButton onClick={() => toggleLike(post.boardId)}>
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
