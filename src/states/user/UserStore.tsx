import { create } from 'zustand';
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
  setLogout: () => void;
}

const initialProfile: UserProfile = {
  nickname: '',
  belonging: '',
  rank: '',
  email: '',
  blog: '',
  github: '',
  figma: '',
  notion: '',
  intro: '',
  quest: '0',
  statistic: '',
  AIReport: [],
};
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
    quest: '0',
    statistic: '',
    AIReport: [],
  },
  setUserProfile: (profile: UserProfile) => {
    sessionStorage.setItem('nickname', profile.nickname);
    set({ userProfile: profile });
  },
  setLogout: () => {
    sessionStorage.removeItem('nickname');
    set({ userProfile: initialProfile });
  },
}));
