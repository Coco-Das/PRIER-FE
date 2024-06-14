import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';

//댓글 불러옴 get
//댓글 등록 post

export const Comment = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  //댓글 불러오기
  const handleGetComments = async () => {
    if (!projectId) return;
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}/comment`);
      const Data = response.data;
      console.log(Data);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [projectId]);

  return <div>리뷰페이지</div>;
};
