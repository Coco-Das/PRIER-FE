import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

interface MenuItemProps {
  active: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  padding: 10px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#87ceeb' : 'transparent')};
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PostContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostContent = styled.div`
  margin-top: 10px;
`;

interface Post {
  id: number;
  category: string;
  author: string;
  content: string;
  likes: number;
}

interface Category {
  name: string;
  id: string;
}

const posts: Post[] = [
  { id: 1, category: 'it-news', author: '개발자 1', content: 'IT 소식 내용 1', likes: 10 },
  { id: 2, category: 'it-news', author: '개발자 2', content: 'IT 소식 내용 2', likes: 20 },
  { id: 3, category: 'chat', author: '개발자 3', content: '잡담 내용 1', likes: 5 },
  { id: 4, category: 'chat', author: '개발자 4', content: '잡담 내용 2', likes: 15 },
  { id: 5, category: 'tech', author: '개발자 5', content: '기술 내용 1', likes: 8 },
  { id: 6, category: 'tech', author: '개발자 6', content: '기술 내용 2', likes: 18 },
  { id: 7, category: 'internship', author: '개발자 7', content: '인턴십 내용 1', likes: 3 },
  { id: 8, category: 'internship', author: '개발자 8', content: '인턴십 내용 2', likes: 13 },
  { id: 9, category: 'notice', author: '개발자 9', content: '공지사항 내용 1', likes: 7 },
  { id: 10, category: 'notice', author: '개발자 10', content: '공지사항 내용 2', likes: 17 },
];

const categories: Category[] = [
  { name: 'IT 소식', id: 'it-news' },
  { name: '잡담/일상', id: 'chat' },
  { name: '기술', id: 'tech' },
  { name: '인턴십/공모전', id: 'internship' },
  { name: '공지사항', id: 'notice' },
];

const Board: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeCategory, setActiveCategory] = useState<string>(categoryId || 'it-news');

  useEffect(() => {
    if (categoryId) {
      setActiveCategory(categoryId);
    }
  }, [categoryId]);

  const filteredPosts = posts.filter(post => post.category === activeCategory);

  return (
    <Container>
      <Menu>
        {categories.map(category => (
          <MenuItem
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
      {filteredPosts.map(post => (
        <PostContainer key={post.id}>
          <PostHeader>
            <div>{post.author}</div>
            <div>Likes: {post.likes}</div>
          </PostHeader>
          <PostContent>{post.content}</PostContent>
        </PostContainer>
      ))}
    </Container>
  );
};

export default Board;
