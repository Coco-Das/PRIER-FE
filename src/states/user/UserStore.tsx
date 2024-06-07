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
  setNickname: (nickname: string) => void;
  setBelonging: (belonging: string) => void;
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
  setNickname: (nickname: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, nickname },
    }));
    sessionStorage.setItem('nickname', nickname);
  },
  setBelonging: (belonging: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, belonging },
    }));
  },
  setBlog: (blog: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, blog },
    }));
  },
  setGithub: (github: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, github },
    }));
  },
  setFigma: (figma: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, figma },
    }));
  },
  setNotion: (notion: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, notion },
    }));
  },
  setIntro: (intro: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, intro },
    }));
  },
}));
