import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, NoPostsMessage } from './BoardStyles';
import { BoardPost } from '../../states/board/BoardStore';
import PaginationComponent from '../../components/board/PaginationComponent';
import NavigationBar from '../../components/board/NavigationBar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import usePagination from '../../hooks/UsePagination';
import { API_BASE_URL } from '../../const/TokenApi';
import { Loading } from '../../components/utils/Loading';

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
  const [title, setTitle] = useState<string>('Community');

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
    try {
      const response = await API_BASE_URL.get('/posts');
      const sortedPosts = response.data.postListDto.sort(
        (a: BoardPost, b: BoardPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPosts(sortedPosts);
      setAllFetched(true);
      console.log('게시물 불러오기 성공');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await API_BASE_URL.get('/posts/my');
      const myPosts = response.data.postListDto.reverse();
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
    try {
      const response = await API_BASE_URL.get('/posts/like/my');
      const likedPosts = response.data.postListDto.reverse();
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

  const fetchData = async () => {
    if (title === 'Community') {
      await fetchPosts();
    } else if (title === '내가 좋아요한 글') {
      await fetchLikedPosts();
    } else if (title === '내가 작성한 글') {
      await fetchMyPosts();
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeCategory, title]);

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
    setPage(1);

    if (activeFilter === 'all') {
      fetchPosts();
    } else if (activeFilter === 'myposts') {
      fetchMyPosts();
    } else if (activeFilter === 'likes') {
      fetchLikedPosts();
    }

    navigate(`/board?category=${category}&filter=${activeFilter}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);

    if (filter === 'all') {
      setAllFetched(false);
    }

    if (filter === 'all') {
      fetchPosts();
    } else if (filter === 'myposts') {
      fetchMyPosts();
    } else if (filter === 'likes') {
      fetchLikedPosts();
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
    navigate(`/board?category=${activeCategory}&filter=${activeFilter}`);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/post/${postId}`);
  };

  const handleBackToList = async () => {
    await fetchData();
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
    <>
      {loading && <Loading />}
      <Container>
        <NavigationBar
          activeCategory={activeCategory}
          activeFilter={activeFilter}
          handleCategoryClick={handleCategoryClick}
          handleFilterClick={handleFilterClick}
          setTitle={setTitle}
          title={title}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          activeSort={activeSort}
          handleSortClick={handleSortClick}
        />
        {!loading && (
          <>
            {postId ? (
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
          </>
        )}
      </Container>
    </>
  );
};

export default Board;
