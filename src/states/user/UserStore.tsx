import create from 'zustand';
interface UserProfile {
  nickname: string;
  belonging: string;
  rank: string;
  email: string;
  blog: string;
  github: string;
  figma: string;
  notion: string;
  intro: string;
  quest: string;
  statistic: string;
  AIReport: string[] | null;
}
interface UserStore {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export const useUserStore = create<UserStore>(set => ({
  userProfile: {
    nickname: '개발자1',
    belonging: '',
    rank: '',
    email: '',
    blog: '',
    github: '',
    figma: '',
    notion: '',
    intro: '',
    quest: '',
    statistic: '',
    AIReport: [],
  },
  setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
}));
