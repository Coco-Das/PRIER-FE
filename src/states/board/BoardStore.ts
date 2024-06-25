// BoardStore.ts

export interface Media {
  metadata: string;
  mediaType: string;
  s3Url: string;
}

export interface BoardPost {
  views: number;
  postId: number;
  nickname: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByUser: boolean;
  images?: string[]; // 이미지 배열
  media?: Media[]; // media 속성 추가
  userId: number;
  isLikedByMe: false;
}

// 예시 데이터 (필요에 따라 추가)
export const initialPosts: BoardPost[] = [
  // 초기 데이터 정의
];
