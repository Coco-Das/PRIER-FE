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
  imgUrl: string;
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
  nowProjectId: number | null;
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
  setImgUrl: (imgUrl: string) => void;
  setNickname: (nickname: string) => void;
  setBelonging: (belonging: string) => void;
  setEmail: (email: string) => void;
  setBlog: (blog: string) => void;
  setGithub: (github: string) => void;
  setFigma: (figma: string) => void;
  setNotion: (notion: string) => void;
  setIntro: (intro: string) => void;
  setQuest: (quest: '1' | '2' | '3') => void;
}

const initialProfile: UserProfile = {
  imgUrl: '',
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
  nowProjectId: null,
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
    sessionStorage.setItem('profileImg', profile.imgUrl);
    set({ userProfile: profile });
  },
  setLogout: () => {
    sessionStorage.removeItem('nickname');
    set({ userProfile: initialProfile });
  },
  setImgUrl: (imgUrl: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, imgUrl },
    }));
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
  setEmail: (email: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, email },
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
  setQuest: (quest: '1' | '2' | '3') => {
    set(state => {
      const updatedProfile = { ...state.userProfile };
      if (quest === '1') updatedProfile.firstQuest = true;
      if (quest === '2') updatedProfile.secondQuest = true;
      if (quest === '3') updatedProfile.thirdQuest = true;
      return { userProfile: updatedProfile };
    });
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
  imgUrl: string;
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
  nowProjectId: number | null;
  nowProjectName: string | null;
  nowProjectTeamName: string | null;
  nowProjectFeedbackCount: number | null;
  nowProjectScore: number | null;
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
  imgUrl: '',
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
