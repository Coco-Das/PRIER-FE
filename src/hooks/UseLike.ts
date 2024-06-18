import { useState } from 'react';
import { API_BASE_URL } from '../const/TokenApi';

interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

const useLike = () => {
  const [likes, setLikes] = useState<{ [key: number]: LikeState }>({});

  const toggleLike = async (postId: number, currentIsLiked: boolean) => {
    try {
      // 좋아요 토글 POST 요청
      await API_BASE_URL.post(`/like/${postId}`);

      // 최신 포스트 데이터를 가져오는 GET 요청
      const response = await API_BASE_URL.get(`/posts/${postId}`);
      if (response.status === 200) {
        const post = response.data;
        setLikes(prevLikes => ({
          ...prevLikes,
          [postId]: {
            isLiked: !currentIsLiked, // 현재 상태 반전
            likeCount: post.likes,
          },
        }));
      } else {
        console.error(`좋아요 후 포스트 데이터를 가져오지 못했습니다.`);
      }
    } catch (error) {
      console.error(`포스트 좋아요 상태를 토글하는 중 오류가 발생했습니다:`, error);
    }
  };

  return { likes, toggleLike, isLikedByMe: (postId: number) => likes[postId]?.isLiked ?? false };
};

export default useLike;
