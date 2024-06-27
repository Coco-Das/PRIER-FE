import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import {
  AIReportContainer,
  CommentDiv,
  CommentWrapper,
  DetailText,
  FeedbackContainer,
  FeedbackWrapper,
  Img,
  MypageChartIcon,
  ProfileImg,
  ProjectContainer,
  ProjectDiv,
  QuestionDiv,
  ResponseDiv,
  StaticContainer,
  TitleText,
  UniqueText,
} from './FeedbackStyles';
import { API_BASE_URL } from '../../../const/TokenApi';
import { Link } from 'react-router-dom';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import StarRating from '../../../components/utils/StarRating';
import FeedbackAIReport from '../../../components/utils/FeedbackAIReport';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ChartIcon from '../../../assets/MainChart.png';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SubjectiveQuestion {
  questionId: number;
  summary: string;
  feedbackCount: number;
  category: 'SUBJECTIVE';
  questionContent: string;
}

interface ObjectiveQuestion {
  questionId: number;
  veryGood: number;
  good: number;
  soso: number;
  bad: number;
  veryBad: number;
  feedbackCount: number;
  category: 'OBJECTIVE';
  questionContent: string;
}
type Question = SubjectiveQuestion | ObjectiveQuestion;

interface CommentData {
  commentId: number;
  content: string;
  isMine: boolean;
  score: number;
  userId: number;
  userName: string;
  profileUrl: string;
}

function Feedback() {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [mainImgUrl, setMainImgUrl] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [amount, setAmount] = useState<number[]>([]);
  const [percents, setPercents] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  const handleGetInfo = async () => {
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}/responses`);
      const response1 = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;
      const Data1 = response1.data;
      // console.log(Data1);
      // console.log(Data);
      setTitle(Data.title);
      setTeamName(Data.teamName);
      setIntroduce(Data.introduce);
      setMainImgUrl(Data.projectImage);
      setPercents(Data.percentage);
      setAverageScore(Data.averageScore);
      setAmount(Data1.amount);
      setTeamDescription(Data1.teamDescription);

      const sortedData = Data.commentWithProfileDtoList.sort(
        (a: CommentData, b: CommentData) => b.commentId - a.commentId,
      );
      setComments(sortedData);

      setKeywords(Data.keyWordResponseDtoList);

      const subjectiveQuestions = Data.chatGpt.map((q: any) => ({
        questionId: q.question_id,
        summary: q.summary,
        feedbackCount: q.feedbackCount,
        questionContent: q.questionContent,
        category: 'SUBJECTIVE' as const,
      }));

      const objectiveQuestions = Data.responseObjectiveDtoList.map((q: any) => ({
        questionId: q.questionId,
        veryGood: q.veryBad,
        good: q.bad,
        soso: q.soso,
        bad: q.good,
        veryBad: q.veryGood,
        feedbackCount: q.feedbackCount,
        questionContent: q.questionContent,
        category: 'OBJECTIVE' as const,
      }));

      const allQuestions = [...subjectiveQuestions, ...objectiveQuestions];
      allQuestions.sort((a, b) => a.questionId - b.questionId);

      setQuestions(allQuestions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, [projectId]);

  // if (!title || !teamName || !introduce) {
  //   return <div>Loading...</div>;
  // }
  const calculatePercent = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const renderObjectiveQuestionChart = (question: ObjectiveQuestion) => {
    const data = {
      labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
      datasets: [
        {
          label: '응답',
          data: [question.veryGood, question.good, question.soso, question.bad, question.veryBad],
          backgroundColor: [
            '#315AF1', // 진한 파란색
            '#315AF170', // 중간 회색
            '#B0B0B0', // 더 연한 회색
            '#D3D3D3', // 더 연한 회색
            '#E0E0E0', // 거의 흰색에 가까운 회색
          ],
        },
      ],
    };

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw as number;
              return `${value}표`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    };

    return <Pie data={data} options={options} />;
  };

  const renderPositiveResponseChart = (percent: number) => {
    const data = {
      labels: ['긍정 응답', '부정 응답'],
      datasets: [
        {
          data: [percent, 100 - percent],
          backgroundColor: ['#315AF1', '#E0E0E0'],
        },
      ],
    };

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw as number;
              return `${value}%`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    };

    return <Pie data={data} options={options} />;
  };

  return (
    <FeedbackWrapper>
      <ProjectDiv>
        <ProjectContainer>
          <span style={{ color: '#315AF1', fontWeight: 'bold' }}>
            프로젝트: {loading ? <Skeleton width={120} /> : title}
          </span>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            팀: {loading ? <Skeleton width={120} /> : teamName}
          </span>
          <p
            className="mt-2"
            style={{
              fontSize: '14px',
              color: '#828282',
              fontWeight: 'bold',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1, // 원하는 줄 수로 조정
              lineHeight: '1.2em', // 줄 높이 설정
              maxHeight: '3.6em', // lineHeight * WebkitLineClamp
            }}
          >
            {loading ? <Skeleton width={70} /> : teamDescription}
          </p>
          {loading ? (
            <Skeleton height={120} width="50%" />
          ) : (
            mainImgUrl && <Img className="mt-2" src={mainImgUrl} alt={title} />
          )}

          <span className="mt-2" style={{ fontSize: '18px', fontWeight: 'bold' }}>
            상세:{' '}
          </span>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              height: '20%',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              lineHeight: '1.2em',
              maxHeight: '3.6em',
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton width={300} /> <Skeleton width={150} /> <Skeleton width={200} />{' '}
              </div>
            ) : (
              teamDescription
            )}
          </p>
          <Link
            to={`/responsetest/${projectId}`}
            style={{
              marginLeft: 'auto',
              paddingRight: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              marginTop: 'auto',
              color: '#828282',
            }}
          >
            <span className="underline">자세히 보기 &gt;</span>
          </Link>
        </ProjectContainer>
        <AIReportContainer>
          <FeedbackAIReport keyWordResponseDtoList={keywords} />
        </AIReportContainer>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%', gap: '15px' }}>
          <FeedbackContainer>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', gap: '5px' }}>
              <TitleText>제출된 피드백</TitleText>
              <UniqueText>{loading ? <Skeleton width={50} /> : amount[2]}</UniqueText>
            </div>
            <div
              style={{
                display: 'flex',
                width: '70%',
                alignItems: 'center',
              }}
            >
              <DetailText>
                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton width={200} height={20} />
                    <Skeleton width={150} height={20} />
                  </div>
                ) : (
                  <>
                    {amount[0]} 명의 유저에게 댓글과 별점을 받았습니다.
                    <br />
                    {amount[1]}명의 유저가 상세 응답에 응했습니다.
                  </>
                )}
              </DetailText>
            </div>
          </FeedbackContainer>
          <StaticContainer>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex ', alignItems: 'center' }}>
                <TitleText>통계</TitleText>
                <UniqueText className="ml-3" style={{ fontSize: '25px' }}>
                  {loading ? <Skeleton width={150} height={35} /> : `긍정의 응답 ${Math.round(percents)}%`}
                </UniqueText>
              </div>
              <DetailText className="ml-3 mb-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
                {loading ? <Skeleton width={160} height={20} /> : `평점 ${averageScore}점의 별점을 받았습니다`}
              </DetailText>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '150px', height: '150px', marginTop: '25px', marginLeft: '40px' }}>
                {loading ? <Skeleton width="100%" height={120} /> : renderPositiveResponseChart(Math.round(percents))}
              </div>
              <div
                style={{
                  width: 'auto',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '12px',
                  justifyContent: 'flex-end',
                  lineHeight: '16px',
                  color: '#828282',
                  marginLeft: '10px',
                }}
              >
                <p>
                  {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton width={100} height={15} />
                      <Skeleton width={100} height={15} />
                    </div>
                  ) : (
                    <>
                      긍정적 응답: {Math.round(percents)}%
                      <br />
                      부정적 응답: {Math.round(100 - percents)}%
                    </>
                  )}
                </p>
              </div>
              <MypageChartIcon src={ChartIcon} />
            </div>
          </StaticContainer>
        </div>
      </ProjectDiv>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        상세 응답 분석
      </span>
      <ResponseDiv>
        {loading ? (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>응답을 불러오는 중입니다.</p>
          </div>
        ) : questions.length === 0 ? (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>작성됩 응답이 없습니다.</p>
          </div>
        ) : (
          questions.map((question, index) => {
            const totalResponses =
              question.category === 'OBJECTIVE'
                ? question.veryGood + question.good + question.soso + question.bad + question.veryBad
                : 0;

            return (
              <QuestionDiv key={question.questionId} className="mt-4">
                {question.category === 'SUBJECTIVE' ? (
                  <div>
                    <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                      {index + 1}번 문항
                      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <span
                          style={{
                            marginLeft: '20px',
                            fontSize: '22px',
                            outline: 'none',
                            width: 'auto',
                          }}
                        >
                          {question.questionContent}
                        </span>
                        <span className="ml-5" style={{ fontSize: '12px', color: '#828282' }}>
                          응답 {question.feedbackCount}개
                        </span>
                      </div>
                    </div>
                    {question.feedbackCount > 0 && (
                      <p style={{ marginLeft: '60px', fontSize: '18px', padding: '20px' }}>{question.summary}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'inline-flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                      {index + 1}번 문항
                      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <span
                          style={{
                            marginLeft: '20px',
                            fontSize: '22px',
                            outline: 'none',
                            width: 'auto',
                          }}
                        >
                          {question.questionContent}
                        </span>
                        <span className="ml-5" style={{ fontSize: '12px', color: '#828282' }}>
                          응답 {question.feedbackCount}개
                        </span>
                      </div>
                    </div>
                    {question.feedbackCount > 0 && (
                      <div
                        style={{ marginLeft: '60px', fontSize: '18px', outline: 'none', width: '80%', padding: '20px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <div style={{ width: '150px' }}>{renderObjectiveQuestionChart(question)}</div>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              fontSize: '12px',
                              justifyContent: 'flex-end',
                              marginLeft: '50px',
                              lineHeight: '16px',
                              color: '#828282',
                            }}
                          >
                            <p>매우 좋음: {calculatePercent(question.veryGood, totalResponses)}%</p>
                            <p>좋음: {calculatePercent(question.good, totalResponses)}%</p>
                            <p>보통: {calculatePercent(question.soso, totalResponses)}%</p>
                            <p>나쁨: {calculatePercent(question.bad, totalResponses)}%</p>
                            <p>매우 나쁨: {calculatePercent(question.veryBad, totalResponses)}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </QuestionDiv>
            );
          })
        )}
      </ResponseDiv>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        댓글
      </span>
      <CommentDiv $isEmpty={loading || comments.length === 0}>
        {loading ? (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>댓글을 불러오는 중입니다.</p>
          </div>
        ) : comments.length === 0 ? (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>작성된 댓글이 없습니다.</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentWrapper key={comment.commentId}>
              <p
                title={comment.content}
                dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }}
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  lineHeight: '1.2em',
                  maxHeight: '3.6em',
                  overflow: 'hidden',
                }}
              ></p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <ProfileImg src={comment.profileUrl}></ProfileImg>
                <strong className="ml-1">{comment.userName}</strong>
                <StarRating initialScore={comment.score} readOnly={true} onHover={false} />
              </div>
            </CommentWrapper>
          ))
        )}
      </CommentDiv>
    </FeedbackWrapper>
  );
}

export default Feedback;
