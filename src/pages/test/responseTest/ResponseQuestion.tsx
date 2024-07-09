import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import { CustomButton, Question, QuestionDiv, QuestionWrapper, Textarea } from './ResponseQuestionStyles';
import PropTypes from 'prop-types';
import Snackbar from '../../../components/user/Snackbar';

interface Question {
  content: string;
  category: string;
  questionId: number;
  options?: string[];
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
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const optionToValueMap: { [key: string]: string } = {
    '매우 좋음': '50',
    좋음: '40',
    보통: '30',
    나쁨: '20',
    '매우 나쁨': '10',
  };

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
            options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
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

  const handleQuestionSubmit = async () => {
    let valid = true;
    const newErrors: { [key: number]: string } = {};

    for (const question of questions) {
      if (question.category === 'SUBJECTIVE') {
        const response = responses[question.questionId];
        if (!response || response.trim() === '') {
          newErrors[question.questionId] = '응답을 입력해주세요';
          valid = false;
        } else if (response.trim().length < 20) {
          newErrors[question.questionId] = '20자 이상 작성해주세요';
          valid = false;
        }
      } else if (
        question.category === 'OBJECTIVE' &&
        (!responses[question.questionId] || responses[question.questionId].trim() === '')
      ) {
        newErrors[question.questionId] = '객관식 답변을 선택해주세요';
        valid = false;
      }
    }

    if (!valid) {
      setErrors(newErrors);
      setSnackbar({ message: '모든 질문에 유효한 응답을 작성해주세요.', type: 'error' });
      return;
    }

    try {
      const responsePayload = Object.keys(responses).map(questionId => ({
        questionId: Number(questionId),
        content: optionToValueMap[responses[Number(questionId)]] || responses[Number(questionId)],
      }));
      const response = await API_BASE_URL.post(`/projects/${projectId}/responses`, responsePayload);
      console.log(response);
      setSnackbar({ message: '제출되었습니다', type: 'success' });
      setTimeout(() => {
        navigate(`/responsetest/${projectId}`); //제출 후 다시 프로젝트 페이지로
      }, 800);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const TextChange = (questionId: number, value: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };
  const OptionChange = (questionId: number, value: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  return (
    <QuestionWrapper>
      <div
        className="mt-4"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span className="font-extrabold" style={{ color: '#315AF1' }}>
          프로젝트에 대한 솔직한 의견을 남겨주세요
        </span>
      </div>
      <Question className="mt-2">
        {questions.map((question, index) => (
          <QuestionDiv key={question.questionId}>
            {question.category === 'SUBJECTIVE' ? (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + 1}번 문항</span>
                  <span
                    style={{
                      marginLeft: '20px',
                      fontSize: '20px',
                      outline: 'none',
                      fontWeight: 'bold',
                      width: '90%',
                    }}
                  >
                    {question.content}
                  </span>
                </div>

                <AutoResizeTextarea
                  placeholder="20자 이상 작성해주세요."
                  style={{
                    marginTop: '10px',
                    marginLeft: '75px',
                    overflowY: 'auto',
                    width: '90%',
                  }}
                  onChange={e => TextChange(question.questionId, e.target.value)}
                  value={responses[question.questionId] || ''}
                />
                {errors[question.questionId] && (
                  <div style={{ color: 'red', marginLeft: '75px', marginTop: '5px', fontSize: '14px' }}>
                    {errors[question.questionId]}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{index + 1}번 문항</span>
                  <span style={{ marginLeft: '20px', fontSize: '20px', outline: 'none', width: '90%' }}>
                    {question.content}
                  </span>
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
                          name={`question-${question.questionId}`}
                          value={option}
                          checked={responses[question.questionId] === option}
                          onChange={() => OptionChange(question.questionId, option)}
                        />{' '}
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors[question.questionId] && (
                  <div style={{ color: 'red', marginLeft: '75px', marginTop: '5px', fontSize: '14px' }}>
                    {errors[question.questionId]}
                  </div>
                )}
              </div>
            )}
          </QuestionDiv>
        ))}
        <div style={{ width: '100%', display: 'flex', marginBottom: '20px', marginTop: '20px' }}>
          <CustomButton onClick={handleQuestionSubmit} style={{ marginLeft: 'auto', width: '15%' }}>
            제출하기
          </CustomButton>
        </div>
        {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
      </Question>
    </QuestionWrapper>
  );
};
