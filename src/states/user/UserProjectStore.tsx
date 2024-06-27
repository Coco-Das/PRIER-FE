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
  profileImageUrl: string;
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

interface NewProjectState extends ProjectData {
  setProjects: (projects: ProjectData) => void;
}
export const useNewProjectStore = create<NewProjectState>(set => ({
  totalPages: 0,
  totalElements: 0,
  first: false,
  last: false,
  size: 0,
  content: [],
  setProjects: projects => set(() => projects),
}));
