import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../const/TokenApi';
import { DetailText, MypageChartIcon, StaticContainer, TitleText, UniqueText } from './TestListStyles';

interface Project {
  projectId: number;
  title: string;
  teamName: string;
  mainImageUrl: string;
  score: number;
  devStartDate: string;
  status: string;
  link: string;
}

const ProjectStatistics = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const [percents, setPercents] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchProjectStatistics = async () => {
      try {
        const response = await API_BASE_URL.get(`/projects/${project.projectId}/responses`);
        const Data = response.data;
        console.log(Data);
        setAverageScore(Data.averageScore); //평균 평점
        setPercents(Data.percentage); //퍼센트
        setCount(Data.feedbackCount);
      } catch (error) {
        console.error('Failed to fetch project statistics', error);
      }
    };

    fetchProjectStatistics();
  }, [project.projectId]);

  return (
    <StaticContainer onClick={() => navigate(`/feedback/${project.projectId}`)}>
      <TitleText>통계</TitleText>
      <UniqueText>평점</UniqueText>
      <UniqueText>{percents !== null ? `${percents}%` : '...'}</UniqueText>
      <DetailText>총 {count !== null ? `${count}` : '...'}개의 응답</DetailText>
      <MypageChartIcon></MypageChartIcon>
    </StaticContainer>
  );
};

export default ProjectStatistics;
