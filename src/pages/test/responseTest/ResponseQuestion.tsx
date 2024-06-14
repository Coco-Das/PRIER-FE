import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import { CustomButton, Question, QuestionDiv, Textarea } from './ResponseQuestionStyles';
import PropTypes from 'prop-types';

interface Question {
  content: string;
  category: string;
  id: string;
  options?: string[]; // 객관식 질문의 선택지(고정)
}
interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}
const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return <Textarea ref={textareaRef} value={value} {...props} />;
};
AutoResizeTextarea.propTypes = {
  value: PropTypes.string,
};

export const ResponseQuestion = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  //정보 가져오기
  const handleGetQuestions = async () => {
    if (!projectId) return;
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;
      console.log(Data);
      const updatedQuestions = Data.questions.map((question: Question) => {
        if (question.category === 'OBJECTIVE' && !question.options) {
          return {
            ...question,
            options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'], // 기본 선택지 설정
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      console.log(questions);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  useEffect(() => {
    handleGetQuestions();
  }, [projectId]);

  if (!questions) {
    console.log(projectId);
    return <div>Loading...</div>;
  }
  const handleQuestionSubmit = async () => {
    try {
      const response = await API_BASE_URL.post(`/projects/${projectId}/responses`);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const TextChange = (questionId: string, value: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };
  const OptionChange = (questionId: string, value: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  return (
    <Question>
      {questions.map((question, index) => (
        <QuestionDiv key={question.id} className="mt-4">
          {question.category === 'SUBJECTIVE' ? (
            <div>
              <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                {index + 1}번 문항
                <input
                  style={{
                    marginLeft: '20px',
                    fontSize: '20px',
                    outline: 'none',
                    fontWeight: 'bold',
                    width: '80%',
                  }}
                  value={question.id}
                  readOnly
                />
              </div>
              <AutoResizeTextarea
                placeholder="주관식 답변을 입력하세요..."
                style={{
                  marginTop: '10px',
                  marginLeft: '75px',
                  overflowY: 'auto',
                  width: '80%',
                }}
                onChange={e => TextChange(question.id, e.target.value)}
                // value={responses[question.id] || ''}
              />
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                {index + 1}번 문항
                <input
                  style={{ marginLeft: '20px', fontSize: '20px', outline: 'none', width: '80%' }}
                  readOnly
                  value={question.content}
                />
              </div>
              <div
                style={{
                  marginLeft: '75px',
                  marginTop: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10rem',
                  marginBottom: '40px',
                  fontSize: '20px',
                  width: '85%',
                }}
              >
                {question.options?.map((option, i) => (
                  <div key={i}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        // checked={responses[question.id] === option}
                        onChange={() => OptionChange(question.id, option)}
                      />{' '}
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </QuestionDiv>
      ))}
      <div style={{ width: '100%', display: 'flex' }}>
        <CustomButton onClick={handleQuestionSubmit} style={{ marginLeft: 'auto', width: '15%' }}>
          제출하기
        </CustomButton>
      </div>
    </Question>
  );
};
