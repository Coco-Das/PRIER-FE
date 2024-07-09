import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import { QuestionDiv, ResponseDiv, SubjectiveWrapper, Wrapper } from './SubjectiveListStyles';

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        질문 &quot; <span style={{ color: '#23BE87' }}>{questionContent}</span> &quot;에 대한 응답 전체보기
      </span>
      <SubjectiveWrapper>
        <ResponseDiv className="my-5">
          {subresponse.map((res, index) => (
            <QuestionDiv key={index} $isOdd={index % 2 === 0}>
              <p style={{ marginLeft: '20px', fontSize: '18px', padding: '20px' }}>{res.content}</p>
            </QuestionDiv>
          ))}
        </ResponseDiv>
      </SubjectiveWrapper>
    </Wrapper>
  );
};

export default SubjectiveList;
