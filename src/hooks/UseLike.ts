// src/hooks/useLike.ts
import { useState } from 'react';
import { API_BASE_URL } from '../const/TokenApi';

const useLike = () => {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const toggleLike = async (postId: number, liked: boolean) => {
    try {
      const response = liked
        ? await API_BASE_URL.delete(`/like/${postId}`)
        : await API_BASE_URL.post(`/like/${postId}`);

      if (response.status === 200) {
        setLikes(prevLikes => ({ ...prevLikes, [postId]: !liked }));
      } else {
        console.error(`Failed to ${liked ? 'unlike' : 'like'} the post`);
      }
    } catch (error) {
      console.error(`Error ${liked ? 'unliking' : 'liking'} the post:`, error);
    }
  };

  return { likes, toggleLike };
};

export default useLike;
