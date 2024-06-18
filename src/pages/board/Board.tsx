// src/pages/Board.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, NoPostsMessage } from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import PostSkeleton from '../../components/board/PostSkeleton';
import NavigationBar from '../../components/board/NavigationBar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostDetailSkeleton from '../../components/board/PostDetailSkeleton';
import usePagination from '../../hooks/UsePagination';
import { API_BASE_URL } from '../../const/TokenApi';

const Board: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BoardPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ITNEWS');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [USER_ID, setUserId] = useState<number | null>(null); // USER_ID를 상태로 관리
  const navigate = useNavigate();

  const POSTS_PER_PAGE = 3;
  const {
    currentPage,
    paginatedData: paginatedPosts,
    totalPageCount,
    handlePageChange,
    setPage,
  } = usePagination(filteredPosts, POSTS_PER_PAGE);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await API_BASE_URL.get('/posts');
        const sortedPosts = response.data.posts.sort(
          (a: BoardPost, b: BoardPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setPosts(sortedPosts);
        setUserId(response.data.userId); // USER_ID 설정
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!postId && USER_ID !== null) {
      // USER_ID가 설정된 후에 필터링
      let updatedPosts = posts;
      if (activeFilter === 'all') {
        updatedPosts = posts.filter(post => post.category === activeCategory);
      } else if (activeFilter === 'likes') {
        updatedPosts = posts.filter(post => post.category === activeCategory && post.isLikedByMe);
      } else if (activeFilter === 'myposts') {
        updatedPosts = posts.filter(post => post.category === activeCategory && post.userId === USER_ID);
      }

      if (searchTerm) {
        updatedPosts = updatedPosts.filter(
          post => post.title.includes(searchTerm) || post.content.includes(searchTerm),
        );
      }

      setFilteredPosts(updatedPosts);
      setPage(1);
    }
  }, [posts, activeCategory, activeFilter, searchTerm, postId, USER_ID]); // USER_ID 의존성 추가

  const handleCategoryClick = (category: string) => {
    if (activeFilter === 'myposts' && category === 'NOTICE') {
      setActiveFilter('all');
    }
    setActiveCategory(category);
    navigate(`/board?category=${category}&filter=${activeFilter}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    navigate(`/board?category=${activeCategory}&filter=${filter}`);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/post/${postId}`);
  };

  const handleBackToList = () => {
    navigate(`/board?category=${activeCategory}&filter=${activeFilter}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getTitle = () => {
    if (activeFilter === 'all') return 'Community';
    if (activeFilter === 'likes') return 'Likes';
    if (activeFilter === 'myposts') return 'My Posts';
    return 'Board';
  };

  const isDetailPage = location.pathname.includes('post');

  return (
    <Container>
      <NavigationBar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        handleCategoryClick={handleCategoryClick}
        handleFilterClick={handleFilterClick}
        title={getTitle()}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {loading && !postId ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : postId ? (
        <PostDetail
          postId={Number(postId)}
          onBackToList={handleBackToList}
          toggleLike={function (postId: number): void {
            throw new Error('Function not implemented.');
          }}
        />
      ) : filteredPosts.length > 0 ? (
        <PostList posts={paginatedPosts} onPostClick={handlePostClick} userId={USER_ID} />
      ) : searchTerm ? (
        <NoPostsMessage>{searchTerm} (이)가 포함된 게시물이 없습니다.</NoPostsMessage>
      ) : (
        <NoPostsMessage>해당 게시물이 없습니다.</NoPostsMessage>
      )}
      {!postId && filteredPosts.length > POSTS_PER_PAGE && (
        <PaginationComponent count={totalPageCount} page={currentPage} onChange={handlePageChange} />
      )}
    </Container>
  );
};

export default Board;
