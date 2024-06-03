import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  LikeImage,
} from './BoardStyles';
import userAvatar from '../../assets/user.svg';

// 게시물과 카테고리 인터페이스 정의
interface Post {
  id: number;
  category: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
}

interface Category {
  name: string;
  id: string;
}

// 게시물 및 카테고리 데이터
const posts: Post[] = [
  // IT 소식 카테고리
  {
    id: 1,
    category: 'it-news',
    author: '개발자 1',
    content: 'IT 소식 내용 1',
    likes: 10,
    createdAt: '24.06.03 14:23:04',
  },
  {
    id: 2,
    category: 'it-news',
    author: '개발자 2',
    content: 'IT 소식 내용 2',
    likes: 20,
    createdAt: '24.06.03 14:24:05',
  },
  {
    id: 3,
    category: 'it-news',
    author: '개발자 3',
    content: 'IT 소식 내용 3',
    likes: 5,
    createdAt: '24.06.03 14:25:06',
  },
  {
    id: 4,
    category: 'it-news',
    author: '개발자 4',
    content: 'IT 소식 내용 4',
    likes: 15,
    createdAt: '24.06.03 14:26:07',
  },
  {
    id: 5,
    category: 'it-news',
    author: '개발자 5',
    content: 'IT 소식 내용 5',
    likes: 8,
    createdAt: '24.06.03 14:27:08',
  },
  {
    id: 6,
    category: 'it-news',
    author: '개발자 6',
    content: 'IT 소식 내용 6',
    likes: 18,
    createdAt: '24.06.03 14:28:09',
  },
  {
    id: 7,
    category: 'it-news',
    author: '개발자 7',
    content: 'IT 소식 내용 7',
    likes: 3,
    createdAt: '24.06.03 14:29:10',
  },
  {
    id: 8,
    category: 'it-news',
    author: '개발자 8',
    content: 'IT 소식 내용 8',
    likes: 13,
    createdAt: '24.06.03 14:30:11',
  },
  {
    id: 9,
    category: 'it-news',
    author: '개발자 9',
    content: 'IT 소식 내용 9',
    likes: 7,
    createdAt: '24.06.03 14:31:12',
  },
  {
    id: 10,
    category: 'it-news',
    author: '개발자 10',
    content: 'IT 소식 내용 10',
    likes: 17,
    createdAt: '24.06.03 14:32:13',
  },

  // 잡담/일상 카테고리
  {
    id: 11,
    category: 'chat',
    author: '개발자 1',
    content: '잡담 내용 1',
    likes: 10,
    createdAt: '24.06.03 14:33:14',
  },
  {
    id: 12,
    category: 'chat',
    author: '개발자 2',
    content: '잡담 내용 2',
    likes: 20,
    createdAt: '24.06.03 14:34:15',
  },
  {
    id: 13,
    category: 'chat',
    author: '개발자 3',
    content: '잡담 내용 3',
    likes: 5,
    createdAt: '24.06.03 14:35:16',
  },
  {
    id: 14,
    category: 'chat',
    author: '개발자 4',
    content: '잡담 내용 4',
    likes: 15,
    createdAt: '24.06.03 14:36:17',
  },
  {
    id: 15,
    category: 'chat',
    author: '개발자 5',
    content: '잡담 내용 5',
    likes: 8,
    createdAt: '24.06.03 14:37:18',
  },
  {
    id: 16,
    category: 'chat',
    author: '개발자 6',
    content: '잡담 내용 6',
    likes: 18,
    createdAt: '24.06.03 14:38:19',
  },
  {
    id: 17,
    category: 'chat',
    author: '개발자 7',
    content: '잡담 내용 7',
    likes: 3,
    createdAt: '24.06.03 14:39:20',
  },
  {
    id: 18,
    category: 'chat',
    author: '개발자 8',
    content: '잡담 내용 8',
    likes: 13,
    createdAt: '24.06.03 14:40:21',
  },
  {
    id: 19,
    category: 'chat',
    author: '개발자 9',
    content: '잡담 내용 9',
    likes: 7,
    createdAt: '24.06.03 14:41:22',
  },
  {
    id: 20,
    category: 'chat',
    author: '개발자 10',
    content: '잡담 내용 10',
    likes: 17,
    createdAt: '24.06.03 14:42:23',
  },

  // 기술 카테고리
  {
    id: 21,
    category: 'tech',
    author: '개발자 1',
    content: '기술 내용 1',
    likes: 10,
    createdAt: '24.06.03 14:43:24',
  },
  {
    id: 22,
    category: 'tech',
    author: '개발자 2',
    content: '기술 내용 2',
    likes: 20,
    createdAt: '24.06.03 14:44:25',
  },
  {
    id: 23,
    category: 'tech',
    author: '개발자 3',
    content: '기술 내용 3',
    likes: 5,
    createdAt: '24.06.03 14:45:26',
  },
  {
    id: 24,
    category: 'tech',
    author: '개발자 4',
    content: '기술 내용 4',
    likes: 15,
    createdAt: '24.06.03 14:46:27',
  },
  {
    id: 25,
    category: 'tech',
    author: '개발자 5',
    content: '기술 내용 5',
    likes: 8,
    createdAt: '24.06.03 14:47:28',
  },
  {
    id: 26,
    category: 'tech',
    author: '개발자 6',
    content: '기술 내용 6',
    likes: 18,
    createdAt: '24.06.03 14:48:29',
  },
  {
    id: 27,
    category: 'tech',
    author: '개발자 7',
    content: '기술 내용 7',
    likes: 3,
    createdAt: '24.06.03 14:49:30',
  },
  {
    id: 28,
    category: 'tech',
    author: '개발자 8',
    content: '기술 내용 8',
    likes: 13,
    createdAt: '24.06.03 14:50:31',
  },
  {
    id: 29,
    category: 'tech',
    author: '개발자 9',
    content: '기술 내용 9',
    likes: 7,
    createdAt: '24.06.03 14:51:32',
  },
  {
    id: 30,
    category: 'tech',
    author: '개발자 10',
    content: '기술 내용 10',
    likes: 17,
    createdAt: '24.06.03 14:52:33',
  },

  // 인턴십/공모전 카테고리
  {
    id: 31,
    category: 'internship',
    author: '개발자 1',
    content: '인턴십 내용 1',
    likes: 10,
    createdAt: '24.06.03 14:53:34',
  },
  {
    id: 32,
    category: 'internship',
    author: '개발자 2',
    content: '인턴십 내용 2',
    likes: 20,
    createdAt: '24.06.03 14:54:35',
  },
  {
    id: 33,
    category: 'internship',
    author: '개발자 3',
    content: '인턴십 내용 3',
    likes: 5,
    createdAt: '24.06.03 14:55:36',
  },
  {
    id: 34,
    category: 'internship',
    author: '개발자 4',
    content: '인턴십 내용 4',
    likes: 15,
    createdAt: '24.06.03 14:56:37',
  },
  {
    id: 35,
    category: 'internship',
    author: '개발자 5',
    content: '인턴십 내용 5',
    likes: 8,
    createdAt: '24.06.03 14:57:38',
  },
  {
    id: 36,
    category: 'internship',
    author: '개발자 6',
    content: '인턴십 내용 6',
    likes: 18,
    createdAt: '24.06.03 14:58:39',
  },
  {
    id: 37,
    category: 'internship',
    author: '개발자 7',
    content: '인턴십 내용 7',
    likes: 3,
    createdAt: '24.06.03 14:59:40',
  },
  {
    id: 38,
    category: 'internship',
    author: '개발자 8',
    content: '인턴십 내용 8',
    likes: 13,
    createdAt: '24.06.03 15:00:41',
  },
  {
    id: 39,
    category: 'internship',
    author: '개발자 9',
    content: '인턴십 내용 9',
    likes: 7,
    createdAt: '24.06.03 15:01:42',
  },
  {
    id: 40,
    category: 'internship',
    author: '개발자 10',
    content: '인턴십 내용 10',
    likes: 17,
    createdAt: '24.06.03 15:02:43',
  },

  // 공지사항 카테고리
  {
    id: 41,
    category: 'notice',
    author: '개발자 1',
    content: '공지사항 내용 1',
    likes: 10,
    createdAt: '24.06.03 15:03:44',
  },
  {
    id: 42,
    category: 'notice',
    author: '개발자 2',
    content: '공지사항 내용 2',
    likes: 20,
    createdAt: '24.06.03 15:04:45',
  },
  {
    id: 43,
    category: 'notice',
    author: '개발자 3',
    content: '공지사항 내용 3',
    likes: 5,
    createdAt: '24.06.03 15:05:46',
  },
  {
    id: 44,
    category: 'notice',
    author: '개발자 4',
    content: '공지사항 내용 4',
    likes: 15,
    createdAt: '24.06.03 15:06:47',
  },
  {
    id: 45,
    category: 'notice',
    author: '개발자 5',
    content: '공지사항 내용 5',
    likes: 8,
    createdAt: '24.06.03 15:07:48',
  },
  {
    id: 46,
    category: 'notice',
    author: '개발자 6',
    content: '공지사항 내용 6',
    likes: 18,
    createdAt: '24.06.03 15:08:49',
  },
  {
    id: 47,
    category: 'notice',
    author: '개발자 7',
    content: '공지사항 내용 7',
    likes: 3,
    createdAt: '24.06.03 15:09:50',
  },
  {
    id: 48,
    category: 'notice',
    author: '개발자 8',
    content: '공지사항 내용 8',
    likes: 13,
    createdAt: '24.06.03 15:10:51',
  },
  {
    id: 49,
    category: 'notice',
    author: '개발자 9',
    content: '공지사항 내용 9',
    likes: 7,
    createdAt: '24.06.03 15:11:52',
  },
  {
    id: 50,
    category: 'notice',
    author: '개발자 10',
    content: '공지사항 내용 10',
    likes: 17,
    createdAt: '24.06.03 15:12:53',
  },
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
      <Title>Community</Title>
      <Navigation>
        <SegmentedControlContainer>
          <SegmentedControl>
            {categories.map(category => (
              <MenuItem
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </MenuItem>
            ))}
          </SegmentedControl>
        </SegmentedControlContainer>
        <Button>
          <ButtonText>새 글 작성하기</ButtonText>
        </Button>
      </Navigation>
      {filteredPosts.map(post => (
        <PostBox key={post.id}>
          <UserContainer>
            <Avatar>
              <AvatarImage src={userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author>{post.author}</Author>
              <CreatedAt>{post.createdAt}</CreatedAt>
            </AuthorContainer>
          </UserContainer>
          <ContentContainer>{post.content}</ContentContainer>
          <Image src="image.png" alt="Content" />
          <LikesContainer>
            <Likes>{post.likes} likes</Likes>
            <LikeImage src="like.png" alt="Like" />
          </LikesContainer>
        </PostBox>
      ))}
    </Container>
  );
};

export default Board;
