import { API_BASE_URL } from '../const/TokenApi';
import { useAllProjectStore, useNewProjectStore } from '../states/user/UserProjectStore';

//메인 페이지 모든 프로젝트 요청
export async function FetchAllProject(filter: number, page: number) {
  try {
    const response = await API_BASE_URL.get(`/projects?filter=${filter}&page=${page}`);
    console.log('모든 프로젝트 요청 성공', response.data);
    const projectData = {
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      first: response.data.first,
      last: response.data.last,
      size: response.data.size,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: response.data.content.map((project: any) => ({
        projectId: project.projectId,
        title: project.title,
        teamName: project.teamName,
        mainImageUrl: project.mainImageUrl,
        profileImageUrl: project.profileImageUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags: project.tags.map((tag: any) => ({
          tagId: tag.tagId,
          tagName: tag.tagName,
        })),
        score: project.score,
      })),
    };
    useAllProjectStore.getState().setProjects(projectData);
    return projectData;
  } catch (error) {
    console.error('모든 프로젝트 요청 실패', error);
    throw error;
  }
}

//메인 페이지 신규 프로젝트 요청
export async function FetchLatestProject() {
  try {
    const response = await API_BASE_URL.get(`/projects`);
    console.log('신규 프로젝트 요청 성공', response.data);
    const projectData = {
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      first: response.data.first,
      last: response.data.last,
      size: response.data.size,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: response.data.content.map((project: any) => ({
        projectId: project.projectId,
        title: project.title,
        teamName: project.teamName,
        mainImageUrl: project.mainImageUrl,
        profileImageUrl: project.profileImageUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags: project.tags.map((tag: any) => ({
          tagId: tag.tagId,
          tagName: tag.tagName,
        })),
        score: project.score,
      })),
    };
    useNewProjectStore.getState().setProjects(projectData);
    return projectData;
  } catch (error) {
    console.error('신규 프로젝트 요청 실패', error);
    throw error;
  }
}

export async function SearchProject(keyword: string) {
  try {
    const response = await API_BASE_URL.get(`/projects?search=${keyword}`);
    console.log('프로젝트 검색 성공', keyword, response.data);

    const projectData = {
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      first: response.data.first,
      last: response.data.last,
      size: response.data.size,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: response.data.content.map((project: any) => ({
        projectId: project.projectId,
        title: project.title,
        teamName: project.teamName,
        mainImageUrl: project.mainImageUrl,
        profileImageUrl: project.profileImageUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags: project.tags.map((tag: any) => ({
          tagId: tag.tagId,
          tagName: tag.tagName,
        })),
        score: project.score,
      })),
    };
    useAllProjectStore.getState().searchProject(projectData);
    return response.data.content;
  } catch (error) {
    console.error('프로젝트 검색 실패', error);
    throw error;
  }
}
