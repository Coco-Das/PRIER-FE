import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import { DetailText, MypageChartIcon, StaticContainer, TitleText, UniqueText } from './TestListStyles';

interface Project {
  projectId: number;
}

const ProjectStatistics = ({ project }: { project: Project }) => {
  const [percents, setPercents] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchProjectStatistics = async () => {
      try {
        const response = await API_BASE_URL.get(`/projects/${project.projectId}/responses`);
        const Data = response.data;
        // console.log(Data);
        setPercents(Data.percentage); //퍼센트
        setCount(Data.feedbackCount);
      } catch (error) {
        console.error('Failed to fetch project statistics', error);
      }
    };

    fetchProjectStatistics();
  }, [project.projectId]);

  return (
    <StaticContainer>
      <TitleText>통계</TitleText>
      <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
        <UniqueText>긍정의 응답</UniqueText>
        <UniqueText className="ml-2">{percents !== null ? `${Math.round(percents)}%` : '...'}</UniqueText>
      </div>
      <DetailText className="mt-2">총 {count !== null ? `${count}` : '...'}개의 응답</DetailText>
      <MypageChartIcon />
    </StaticContainer>
  );
};

export default ProjectStatistics;
