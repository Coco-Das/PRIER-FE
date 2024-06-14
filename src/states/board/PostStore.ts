// src/states/board/PostStore.ts
import create from 'zustand';
import axios from 'axios';
import { API_BASE_URL } from '../../const/TokenApi';

interface Media {
  metadata: string;
  mediaType: string;
  s3Url: string;
}

interface Comment {
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Post {
  userId: number;
  postId: number;
  title: string;
  content: string;
  nickname: string;
  category: string;
  media: Media[];
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string | null;
  comments: Comment[];
}

interface PostStore {
  post: Post | null;
  fetchPost: (postId: number) => void;
}

export const usePostStore = create<PostStore>(set => ({
  post: null,
  fetchPost: async (postId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      set({ post: response.data });
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  },
}));
