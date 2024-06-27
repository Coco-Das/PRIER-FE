import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import { DetailText, MypageChartIcon, StaticContainer, TitleText, UniqueText } from './TestListStyles';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Project {
  projectId: number;
}

const ProjectStatistics = ({ project }: { project: Project }) => {
  const [percents, setPercents] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchProjectStatistics();
  }, [project.projectId]);

  return (
    <StaticContainer>
      <TitleText>통계</TitleText>
      <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
        <UniqueText>긍정의 응답</UniqueText>
        <UniqueText className="ml-2">{loading ? <Skeleton width={60} /> : `${Math.round(percents)}%`}</UniqueText>
      </div>
      <DetailText className="mt-2"> {loading ? <Skeleton width={30} /> : `총 ${count}개의 응답`}</DetailText>
      <MypageChartIcon />
    </StaticContainer>
  );
};

export default ProjectStatistics;
