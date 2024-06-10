import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, NoPostsMessage } from './BoardStyles';
import { posts as initialPosts, Post } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import PostSkeleton from '../../components/board/PostSkeleton';
import NavigationBar from '../../components/board/NavigationBar';
import PostList from './PostList';
import PostDetail from './PostDetail';

const Board: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'it-news';
  const initialFilter = queryParams.get('filter') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>(
    initialFilter === 'all' ? 'Community' : initialFilter === 'likes' ? 'Likes' : 'My Posts',
  );
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // 좋아요 토글 함수
  const toggleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.boardId === postId ? { ...post, likedByUser: !post.likedByUser } : post)),
    );
  };

  // 카테고리 변경을 처리하는 함수
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (activeFilter !== 'likes' && activeFilter !== 'myposts') {
      setActiveFilter('all'); // 카테고리 변경 시 필터를 초기화
      setTitle('Community');
    }
    navigate(
      `/board?category=${category}&filter=${
        activeFilter !== 'likes' && activeFilter !== 'myposts' ? 'all' : activeFilter
      }
      `,
    );
  };

  // 필터 변경을 처리하는 함수
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setTitle(filter === 'all' ? 'Community' : filter === 'likes' ? 'Likes' : 'My Posts');
    navigate(`/board?category=${activeCategory}&filter=${filter}`);
  };

  // 데이터 로딩 및 정렬
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 2000); // 로딩 시간을 조정할 수 있습니다.
  }, []);

  useEffect(() => {
    let updatedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (activeFilter === 'all') {
      updatedPosts = updatedPosts.filter(post => post.category === activeCategory);
    } else if (activeFilter === 'likes') {
      updatedPosts = updatedPosts.filter(post => post.likedByUser && post.category === activeCategory);
    }

    setFilteredPosts(updatedPosts);
  }, [activeCategory, activeFilter, posts]);

  const handlePostClick = (postId: number) => {
    navigate(`/board/post/${postId}?category=${activeCategory}&filter=${activeFilter}`); // postId를 URL로 전달하여 페이지를 이동합니다.
  };

  const handleBackToList = () => {
    navigate(`/board?category=${activeCategory}&filter=${activeFilter}`); // 상세보기에서 목록으로 돌아가기
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
      ) : postId ? (
        <PostDetail postId={Number(postId)} onBackToList={handleBackToList} />
      ) : filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} onPostClick={handlePostClick} toggleLike={toggleLike} />
      ) : (
        <NoPostsMessage>해당 포스트가 없습니다.</NoPostsMessage>
      )}
      <PaginationComponent />
    </Container>
  );
};

export default Board;
