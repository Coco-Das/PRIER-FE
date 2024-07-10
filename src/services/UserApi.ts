import axios from 'axios';
import { useCallback } from 'react';
import { useOtherProfileStore, useUserStore } from '../states/user/UserStore';
import { API_BASE_URL, KAKAO_ACCESS_TOKEN } from '../const/TokenApi';

export async function FetchMyPage() {
  try {
    const response = await API_BASE_URL.get('/mypage');
    const userProfile = {
      imgUrl: response.data.profileImgDto.s3Key,
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

    const userProfile = {
      imgUrl: response.data.otherProfileImg,
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
export const SendLog = async (lastLogoutAt: string) => {
  try {
    await API_BASE_URL.put('/logout', { lastLogoutAt: lastLogoutAt });
  } catch (error) {
    console.error('로그아웃 로그 전송 실패', error);
  }
};

export function FetchLogout() {
  const setLogout = useUserStore(state => state.setLogout);
  const now = new Date().toISOString();

  return useCallback(async () => {
    try {
      await SendLog(now);
      await axios.get('https://kapi.kakao.com/v1/user/logout', {
        headers: { Authorization: `Bearer ${KAKAO_ACCESS_TOKEN}` },
      });

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

export const EditImg = async (newImg: File) => {
  try {
    // FormData 객체 생성 및 이미지 데이터 추가
    const formData = new FormData();
    formData.append('media', newImg);
    await API_BASE_URL.put('/users/profile/img', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    FetchMyPage();
  } catch (error) {
    console.error('프로필 이미지 수정 실패', error);
  }
};
export const DeleteImg = async () => {
  try {
    await API_BASE_URL.delete('/users/profile/img');
  } catch (error) {
    console.error('프로필 이미지 삭제 실패', error);
  }
};
export const EditNickName = async (newNickName: string) => {
  try {
    await API_BASE_URL.put(
      '/users/nickname',
      { nickname: newNickName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setNickname = useUserStore.getState().setNickname;
    setNickname(newNickName);
  } catch (error) {
    console.error('닉네임 수정 실패:', error);
    throw error;
  }
};

export const EditBelonging = async (newBelonging: string) => {
  try {
    await API_BASE_URL.put(
      '/users/belonging',
      { belonging: newBelonging },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setBelonging = useUserStore.getState().setBelonging;
    setBelonging(newBelonging);
  } catch (error) {
    console.error('소속 수정 실패', error);
    throw error;
  }
};

export const EditBlog = async (newBlog: string) => {
  try {
    await API_BASE_URL.put(
      '/users/blog',
      { blog_url: newBlog },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setBlog = useUserStore.getState().setBlog;
    setBlog(newBlog);
  } catch (error) {
    console.error('블로그 수정 실패', error);
    throw error;
  }
};

export const EditGithub = async (newGithub: string) => {
  try {
    await API_BASE_URL.put(
      '/users/github',
      { githubUrl: newGithub },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setGithub = useUserStore.getState().setGithub;
    setGithub(newGithub);
  } catch (error) {
    console.error('깃허브 주소 수정 실패', error);
    throw error;
  }
};

export const EditFigma = async (newFigma: string) => {
  try {
    await API_BASE_URL.put(
      '/users/figma',
      { figmaUrl: newFigma },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setFigma = useUserStore.getState().setFigma;
    setFigma(newFigma);
  } catch (error) {
    console.error('피그마 주소 수정 실패', error);
    throw error;
  }
};

export const EditNotion = async (newNotion: string) => {
  try {
    await API_BASE_URL.put(
      '/users/notion',
      { notion_url: newNotion },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const setNotion = useUserStore.getState().setNotion;
    setNotion(newNotion);
  } catch (error) {
    console.error('노션 주소 수정 실패', error);
    throw error;
  }
};

export const EditIntro = async (newIntro: string) => {
  try {
    await API_BASE_URL.put(
      '/users/intro',
      { intro: newIntro },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

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

    return response.data;
  } catch (error) {
    console.error('퀘스트 전송 실패', error);
    throw error;
  }
  return false;
};
