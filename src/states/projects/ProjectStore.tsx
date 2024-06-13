import { create } from 'zustand';

interface ProjectState {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

export const useProjectStore = create<ProjectState>(set => ({
  projectId: null,
  setProjectId: id => set({ projectId: id }),
}));
