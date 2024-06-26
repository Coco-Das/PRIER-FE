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
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<string>('latest');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [USER_ID, setUserId] = useState<number | null>(null);
  const [allFetched, setAllFetched] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Community'); // 추가된 상태

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

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await API_BASE_URL.get('/posts');
      const sortedPosts = response.data.sort(
        (a: BoardPost, b: BoardPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPosts(sortedPosts);
      setAllFetched(true);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const response = await API_BASE_URL.get('/posts/my');
      const myPosts = response.data.reverse();
      const filteredMyPosts =
        activeCategory === 'ALL' ? myPosts : myPosts.filter((post: BoardPost) => post.category === activeCategory);
      setPosts(filteredMyPosts);
    } catch (error) {
      console.error('Error fetching my posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedPosts = async () => {
    setLoading(true);
    try {
      const response = await API_BASE_URL.get('/posts/like/my');
      const likedPosts = response.data.reverse();
      const filteredLikedPosts =
        activeCategory === 'ALL'
          ? likedPosts
          : likedPosts.filter((post: BoardPost) => post.category === activeCategory);
      setPosts(filteredLikedPosts);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFilter === 'all') {
      fetchPosts();
    } else if (activeFilter === 'myposts') {
      fetchMyPosts();
    } else if (activeFilter === 'likes') {
      fetchLikedPosts();
    }
  }, [activeCategory, activeFilter, activeSort]);

  useEffect(() => {
    const applySearchFilter = (posts: BoardPost[]) => {
      if (searchTerm) {
        return posts.filter(
          post =>
            post.title.includes(searchTerm) ||
            post.content.includes(searchTerm) ||
            (activeCategory !== 'NOTICE' && post.nickname.includes(searchTerm)),
        );
      }
      return posts;
    };

    const applySort = (posts: BoardPost[]) => {
      if (activeSort === 'latest') {
        return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (activeSort === 'registration') {
        return posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (activeSort === 'popular') {
        return posts.sort((a, b) => {
          if (b.likes === a.likes) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b.likes - a.likes;
        });
      } else if (activeSort === 'views') {
        return posts.sort((a, b) => {
          if (b.views === a.views) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b.views - a.views;
        });
      }
      return posts;
    };

    let updatedPosts = posts;

    if (activeCategory !== 'ALL') {
      updatedPosts = posts.filter(post => post.category === activeCategory);
    } else {
      updatedPosts = posts.filter(post => post.category !== 'NOTICE');
    }

    const filteredAndSortedPosts = applySort(applySearchFilter(updatedPosts));
    setFilteredPosts(filteredAndSortedPosts);
  }, [posts, activeCategory, activeFilter, searchTerm, postId, USER_ID, activeSort]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    navigate(`/board?category=${category}&filter=${activeFilter}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setAllFetched(false);
    }
    navigate(`/board?category=${activeCategory}&filter=${filter}`);
  };

  const handleSortClick = (sort: string) => {
    setActiveSort(sort);
    setPage(1);
    if (activeFilter === 'all') {
      fetchPosts();
    } else if (activeFilter === 'myposts') {
      fetchMyPosts();
    } else if (activeFilter === 'likes') {
      fetchLikedPosts();
    }
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
        setTitle={setTitle} // 수정된 부분
        title={title} // 수정된 부분
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        activeSort={activeSort}
        handleSortClick={handleSortClick}
      />
      {loading && !postId ? (
        <></>
      ) : postId ? (
        <PostDetail postId={Number(postId)} onBackToList={handleBackToList} />
      ) : filteredPosts.length > 0 ? (
        <PostList posts={paginatedPosts} onPostClick={handlePostClick} userId={USER_ID} activeSort={activeSort} />
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
