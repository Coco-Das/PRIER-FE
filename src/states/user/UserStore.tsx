import { create } from 'zustand';
interface ProjectKeyword {
  content: string;
  count: number;
}

interface Comment {
  projectId: number;
  commentId: number;
  projectName: string;
  teamName: string;
  content: string;
  score: number;
}
interface UserProfile {
  nickname: string;
  belonging: string | null;
  rank: string;
  email: string;
  blog: string | null;
  github: string | null;
  figma: string | null;
  notion: string | null;
  intro: string | null;
  firstQuest: boolean;
  secondQuest: boolean;
  thirdQuest: boolean;
  nowProjectId: number;
  nowProjectName: string;
  nowProjectTeamName: string;
  nowProjectFeedbackCount: number;
  nowProjectScore: number;
  nowProjectStaticPercentage: string;
  nowProjectKeywordList: ProjectKeyword[];
  myPageCommentDtoList: Comment[];
  balance: number;
}

interface UserStore {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  setLogout: () => void;
  setNickname: (nickname: string) => void;
  setBelonging: (belonging: string) => void;
  setBlog: (blog: string) => void;
  setGithub: (github: string) => void;
  setFigma: (figma: string) => void;
  setNotion: (notion: string) => void;
  setIntro: (intro: string) => void;
  setQuest: (quest: string) => void;
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
  firstQuest: false,
  secondQuest: false,
  thirdQuest: false,
  nowProjectId: 0,
  nowProjectName: '',
  nowProjectTeamName: '',
  nowProjectFeedbackCount: 0,
  nowProjectScore: 0,
  nowProjectStaticPercentage: '',
  nowProjectKeywordList: [],
  myPageCommentDtoList: [],
  balance: 0,
};
export const useUserStore = create<UserStore>(set => ({
  userProfile: initialProfile,
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
  setQuest: (quest: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, quest },
    }));
  },
}));

//남의 프로필 스토어
interface OtherProjectKeyword {
  content: string;
  count: number;
}

interface OtherComment {
  projectId: number;
  commentId: number;
  projectName: string;
  teamName: string;
  content: string;
  score: number;
}

interface OtherProfile {
  nickname: string;
  belonging: string | null;
  rank: string;
  email: string;
  blog: string | null;
  github: string | null;
  figma: string | null;
  notion: string | null;
  intro: string | null;
  firstQuest: boolean;
  secondQuest: boolean;
  thirdQuest: boolean;
  nowProjectId: number;
  nowProjectName: string;
  nowProjectTeamName: string;
  nowProjectFeedbackCount: number;
  nowProjectScore: number;
  nowProjectStaticPercentage: string;
  nowProjectKeywordList: OtherProjectKeyword[];
  myPageCommentDtoList: OtherComment[];
  balance: number;
}

interface OtherProfileStore {
  otherProfile: OtherProfile;
  setOtherProfile: (profile: OtherProfile) => void;
}

const initialOtherProfile: OtherProfile = {
  nickname: '',
  belonging: '',
  rank: '',
  email: '',
  blog: '',
  github: '',
  figma: '',
  notion: '',
  intro: '',
  firstQuest: false,
  secondQuest: false,
  thirdQuest: false,
  nowProjectId: 0,
  nowProjectName: '',
  nowProjectTeamName: '',
  nowProjectFeedbackCount: 0,
  nowProjectScore: 0,
  nowProjectStaticPercentage: '',
  nowProjectKeywordList: [],
  myPageCommentDtoList: [],
  balance: 0,
};

export const useOtherProfileStore = create<OtherProfileStore>(set => ({
  otherProfile: initialOtherProfile,
  setOtherProfile: (profile: OtherProfile) => {
    set({ otherProfile: profile });
  },
}));
