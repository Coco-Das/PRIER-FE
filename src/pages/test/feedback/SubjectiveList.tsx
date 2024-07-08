import { useLocation, useParams } from 'react-router-dom';
import { QuestionDiv, ResponseDiv, SubjectiveWrapper } from './SubjectiveListStyles';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';

interface Response {
  content: string;
}
const SubjectiveList = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { questionId } = useParams<{ questionId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const location = useLocation();
  const { questionContent } = location.state || {};
  const [subresponse, setSubresponses] = useState<Response[]>([]);
  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  useEffect(() => {
    getList();
  }, [projectId, questionId]);

  const getList = async () => {
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}/${questionId}/responses`);
      const Data = response.data;
      setSubresponses(Data);
      //   console.log(subresponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubjectiveWrapper>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        &quot; {questionContent} &quot;에 대한 응답 전체보기
      </span>
      <ResponseDiv className="my-5">
        {subresponse.map((res, index) => (
          <QuestionDiv key={index}>
            <p style={{ marginLeft: '20px', fontSize: '18px', padding: '20px' }}>{res.content}</p>
          </QuestionDiv>
        ))}
      </ResponseDiv>
    </SubjectiveWrapper>
  );
};

export default SubjectiveList;
