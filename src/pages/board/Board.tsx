import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, NoPostsMessage } from './BoardStyles';
import { posts as initialPosts, BoardPost } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import PostSkeleton from '../../components/board/PostSkeleton';
import NavigationBar from '../../components/board/NavigationBar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostDetailSkeleton from '../../components/board/PostDetailSkeleton';
import usePagination from '../../hooks/UsePagination';

const Board: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BoardPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ITNews');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
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
    setLoading(true);
    setTimeout(() => {
      const sortedPosts = initialPosts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPosts(sortedPosts);
      setLoading(false);
    }, 2000); // 로딩 시간을 조정할 수 있습니다.
  }, []);

  useEffect(() => {
    if (!postId) {
      let updatedPosts = posts;
      if (activeFilter === 'all') {
        updatedPosts = posts.filter(post => post.category === activeCategory);
      } else if (activeFilter === 'likes') {
        updatedPosts = posts.filter(post => post.category === activeCategory && post.likedByUser);
      } else if (activeFilter === 'myposts') {
        updatedPosts = posts.filter(post => post.category === activeCategory && post.memberId === 1); // 임의로 memberId를 1로 설정
      }

      if (searchTerm) {
        updatedPosts = updatedPosts.filter(
          post => post.title.includes(searchTerm) || post.content.includes(searchTerm),
        );
      }

      setFilteredPosts(updatedPosts);
      setPage(1);
    }
  }, [posts, activeCategory, activeFilter, searchTerm, postId]);

  // 좋아요 토글 함수
  const toggleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.boardId === postId ? { ...post, likedByUser: !post.likedByUser } : post)),
    );
  };

  // 카테고리 변경을 처리하는 함수
  const handleCategoryClick = (category: string) => {
    if (activeFilter === 'myposts' && category === 'Notice') {
      setActiveFilter('all');
    }
    setActiveCategory(category);
    navigate(`/board?category=${category}&filter=${activeFilter}`);
  };

  // 필터 변경을 처리하는 함수
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    navigate(`/board?category=${activeCategory}&filter=${filter}`);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/post/${postId}`); // postId를 URL로 전달하여 페이지를 이동합니다.
  };

  const handleBackToList = () => {
    navigate(`/board?category=${activeCategory}&filter=${activeFilter}`); // 상세보기에서 목록으로 돌아가기
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
        <PostDetail postId={Number(postId)} onBackToList={handleBackToList} toggleLike={toggleLike} posts={posts} />
      ) : filteredPosts.length > 0 ? (
        <PostList posts={paginatedPosts} onPostClick={handlePostClick} toggleLike={toggleLike} />
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
