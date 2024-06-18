import { create } from 'zustand';
//메인페이지
interface Tag {
  tagId: number;
  tagName: string;
}

interface Content {
  projectId: number;
  title: string;
  teamName: string;
  mainImageUrl: string;
  tags: Tag[];
  score: number;
}

interface ProjectData {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Content[];
}

interface AllProjectState extends ProjectData {
  setProjects: (projects: ProjectData) => void;
  searchProject: (projects: ProjectData) => void;
}
export const useAllProjectStore = create<AllProjectState>(set => ({
  totalPages: 0,
  totalElements: 0,
  first: false,
  last: false,
  size: 0,
  content: [],
  setProjects: projects => set(() => projects),
  searchProject: projects => set(() => projects),
}));

//마이페이지
interface RecentProjectState {
  projectId: number;
  title: string;
  teamName: string;
  score: number;
  feedbackAmount: number;
  setProjects: (projects: RecentProjectState) => void;
}
export const RecentProjectStore = create<RecentProjectState>(set => ({
  projectId: 0,
  title: '',
  teamName: '',
  score: 0,
  feedbackAmount: 0,
  setProjects: projects => set(projects),
}));

//리뷰
interface MyReviewState {
  commentId: number;
  projectTitle: string;
  teamName: string;
  content: string;
  score: number;
}
interface ReviewsState {
  reviews: MyReviewState[];
  setReview: (reviews: MyReviewState[]) => void;
}
export const MyReviewStore = create<ReviewsState>(set => ({
  reviews: [],
  setReview: reviews => set({ reviews }),
}));
