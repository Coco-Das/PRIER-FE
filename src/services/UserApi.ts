import axios from 'axios';
import { useCallback } from 'react';
import { useOtherProfileStore, useUserStore } from '../states/user/UserStore';
import { API_BASE_URL, KAKAO_ACCESS_TOKEN } from '../const/TokenApi';

export async function FetchMyPage() {
  try {
    const response = await API_BASE_URL.get('/mypage');
    console.log('마이페이지 정보 요청 성공', response.data);
    const userProfile = {
      nickname: response.data.nickname,
      belonging: response.data.belonging,
      rank: response.data.rank,
      email: response.data.email,
      blog: response.data.blogUrl,
      github: response.data.githubUrl,
      figma: response.data.figmaUrl,
      notion: response.data.notionUrl,
      intro: response.data.intro,
      firstQuest: response.data.firstQuest,
      secondQuest: response.data.secondQuest,
      thirdQuest: response.data.thirdQuest,
      nowProjectId: response.data.nowProjectId,
      nowProjectName: response.data.nowProjectName,
      nowProjectTeamName: response.data.nowProjectTeamName,
      nowProjectFeedbackCount: response.data.nowProjectFeedbackCount,
      nowProjectScore: response.data.nowProjectScore,
      nowProjectStaticPercentage: response.data.nowProjectStaticPercentage,
      nowProjectKeywordList: response.data.nowProjectKeywordList,
      myPageCommentDtoList: response.data.myPageCommentDtoList,
      balance: response.data.balance,
    };
    useUserStore.getState().setUserProfile(userProfile);
    return response.data;
  } catch (error) {
    console.error('마이페이지 정보 요청 실패:', error);
    throw error;
  }
}
export async function LinkUserProfile(userId: number) {
  try {
    const response = await API_BASE_URL.get(`/mypage/${userId}`);
    console.log('유저 프로필 정보 요청 성공', response.data);
    const userProfile = {
      nickname: response.data.nickname,
      belonging: response.data.belonging,
      rank: response.data.rank,
      email: response.data.email,
      blog: response.data.blogUrl,
      github: response.data.githubUrl,
      figma: response.data.figmaUrl,
      notion: response.data.notionUrl,
      intro: response.data.intro,
      firstQuest: response.data.firstQuest,
      secondQuest: response.data.secondQuest,
      thirdQuest: response.data.thirdQuest,
      nowProjectId: response.data.nowProjectId,
      nowProjectName: response.data.nowProjectName,
      nowProjectTeamName: response.data.nowProjectTeamName,
      nowProjectFeedbackCount: response.data.nowProjectFeedbackCount,
      nowProjectScore: response.data.nowProjectScore,
      nowProjectStaticPercentage: response.data.nowProjectStaticPercentage,
      nowProjectKeywordList: response.data.nowProjectKeywordList,
      myPageCommentDtoList: response.data.myPageCommentDtoList,
      balance: response.data.balance,
    };
    useOtherProfileStore.getState().setOtherProfile(userProfile);
  } catch (error) {
    console.error('유저 프로필 정보 요청 실패', error);
  }
}

export function FetchLogout() {
  const setLogout = useUserStore(state => state.setLogout);

  return useCallback(async () => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v1/user/logout', {
        headers: { Authorization: `Bearer ${KAKAO_ACCESS_TOKEN}` },
      });
      console.log('로그아웃 요청 성공', response.data);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('kakaoAccessToken');
      localStorage.removeItem('userId');

      setLogout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      throw error;
    }
  }, [setLogout]);
}

export const EditNickName = async (newNickName: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/nickname',
      { nickname: newNickName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('닉네임 수정 요청 성공', response.data);
    const setNickname = useUserStore.getState().setNickname;
    setNickname(newNickName);
  } catch (error) {
    console.error('닉네임 수정 실패:', error);
    throw error;
  }
};

export const EditBelonging = async (newBelonging: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/belonging',
      { belonging: newBelonging },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('소속 수정 성공', response.data);
    const setBelonging = useUserStore.getState().setBelonging;
    setBelonging(newBelonging);
  } catch (error) {
    console.error('소속 수정 실패', error);
    throw error;
  }
};
export const EditEmail = async (newEmail: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/email',
      { email: newEmail },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('메일 수정 성공', response.data);
    const setEmail = useUserStore.getState().setEmail;
    setEmail(newEmail);
  } catch (error) {
    console.error('메일 수정 실패', error);
    throw error;
  }
};

export const EditBlog = async (newBlog: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/blog',
      { blog_url: newBlog },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('블로그 수정 성공', response.data);
    const setBlog = useUserStore.getState().setBlog;
    setBlog(newBlog);
  } catch (error) {
    console.error('블로그 수정 실패', error);
    throw error;
  }
};

export const EditGithub = async (newGithub: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/github',
      { githubUrl: newGithub },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('깃허브 주소 수정 성공', response.data);
    const setGithub = useUserStore.getState().setGithub;
    setGithub(newGithub);
  } catch (error) {
    console.error('깃허브 주소 수정 실패', error);
    throw error;
  }
};

export const EditFigma = async (newFigma: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/figma',
      { figmaUrl: newFigma },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('피그마 주소 수정 성공', response.data);
    const setFigma = useUserStore.getState().setFigma;
    setFigma(newFigma);
  } catch (error) {
    console.error('피그마 주소 수정 실패', error);
    throw error;
  }
};

export const EditNotion = async (newNotion: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/notion',
      { notion_url: newNotion },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('노션 주소 수정 성공', response.data);
    const setNotion = useUserStore.getState().setNotion;
    setNotion(newNotion);
  } catch (error) {
    console.error('노션 주소 수정 실패', error);
    throw error;
  }
};

export const EditIntro = async (newIntro: string) => {
  try {
    const response = await API_BASE_URL.put(
      '/users/intro',
      { intro: newIntro },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('자기소개 수정 성공', response.data);
    const setIntro = useUserStore.getState().setIntro;
    setIntro(newIntro);
  } catch (error) {
    console.error('자기소개 수정 실패', error);
    throw error;
  }
};

export const SendQuest = async (sequence: string) => {
  const date = new Date().toISOString().split('T')[0];
  try {
    const response = await API_BASE_URL.put(`/quests/${date}/${sequence}`);
    console.log('퀘스트 전송 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('퀘스트 전송 실패', error);
    throw error;
  }
  return false;
};
