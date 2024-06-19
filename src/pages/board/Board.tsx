import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, NoPostsMessage } from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import NavigationBar from '../../components/board/NavigationBar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostSkeleton from '../../components/board/PostSkeleton';
import usePagination from '../../hooks/UsePagination';
import { API_BASE_URL } from '../../const/TokenApi';

const Board: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BoardPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ITNEWS');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [USER_ID, setUserId] = useState<number | null>(null);

  const POSTS_PER_PAGE = 3;
  const {
    currentPage,
    paginatedData: paginatedPosts,
    totalPageCount,
    handlePageChange,
    setPage,
  } = usePagination(filteredPosts, POSTS_PER_PAGE);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await API_BASE_URL.get('/posts');
        const sortedPosts = response.data.sort(
          (a: BoardPost, b: BoardPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      setLoading(true);
      try {
        const response = await API_BASE_URL.get(`/posts/my`);
        const myPosts = response.data.filter((post: BoardPost) => post.category === activeCategory).reverse();
        setFilteredPosts(myPosts);
      } catch (error) {
        console.error('Error fetching my posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLikedPosts = async () => {
      setLoading(true);
      try {
        const response = await API_BASE_URL.get(`/posts/like/my`);
        const likedPosts = response.data.filter((post: BoardPost) => post.category === activeCategory).reverse();
        setFilteredPosts(likedPosts);
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!postId && USER_ID !== null) {
      if (activeFilter === 'likes') {
        fetchLikedPosts();
        return;
      } else if (activeFilter === 'myposts') {
        fetchMyPosts();
        return;
      } else {
        let updatedPosts = posts.filter(post => post.category === activeCategory);

        if (searchTerm) {
          updatedPosts = updatedPosts.filter(
            post => post.title.includes(searchTerm) || post.content.includes(searchTerm),
          );
        }

        setFilteredPosts(updatedPosts);
        setPage(1);
      }
    }
  }, [posts, activeCategory, activeFilter, searchTerm, postId, USER_ID]);

  const handleCategoryClick = (category: string) => {
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
    switch (activeFilter) {
      case 'likes':
        return 'Likes';
      case 'myposts':
        return 'My Posts';
      default:
        return 'Community';
    }
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
        <></>
      ) : postId ? (
        <PostDetail postId={Number(postId)} onBackToList={handleBackToList} />
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
