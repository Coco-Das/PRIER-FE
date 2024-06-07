// components/PostDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, PostDetailContainer, PostContentContainer, CommentsContainer } from './BoardStyles';
import NavigationBar from '../../components/board/NavigationBar';

const PostDetail: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('it-news');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [title, setTitle] = useState<string>('Community');

  const { postId } = useParams<{ postId: string }>();
  // 게시물 정보를 가져오기 위해 postId를 사용합니다.
  // 여기서 데이터를 가져오는 로직을 추가할 수 있습니다.

  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
  };

  const handleFilterClick = (filter: string) => {
    console.log(`Filter clicked: ${filter}`);
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
      <PostDetailContainer>
        <PostContentContainer>
          {/* 게시물 상세 내용 */}
          <h1>Post Title</h1>
          <p>Post content goes here...</p>
        </PostContentContainer>
        <CommentsContainer>
          {/* 댓글 박스 */}
          <h2>Comments</h2>
          <p>Comment section...</p>
        </CommentsContainer>
      </PostDetailContainer>
    </Container>
  );
};

export default PostDetail;
