import { create } from 'zustand';
//메인페이지
interface AllProjectState {
  totalPages: number; //총 페이지 수
  totalElements: number; //이건 총 몇 개인지 알려주는거
  first: boolean; //첫 페이지 여부
  last: boolean; //마지막 페이지 여부
  size: number; // 한 페이지에 최대 몇 개 들어가는지
  content: Content[];
  setProjects: (projects: AllProjectState) => void;
}
interface Content {
  projectId: number;
  title: string;
  teamName: string;
  mainImageUrl: string;
  tags: Tag[];
  score: number;
}
interface Tag {
  tagId: number;
  tagName: string;
}

export const useAllProjectStore = create<AllProjectState>(set => ({
  totalPages: 0,
  totalElements: 0,
  first: false,
  last: false,
  size: 0,
  content: [],
  setProjects: projects => set(projects),
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
