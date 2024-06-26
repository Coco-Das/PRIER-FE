import { styled } from 'styled-components';
import { ReactComponent as ChartIcon } from '../../../assets/main_chart.svg';
import { ReactComponent as GraphIcon } from '../../../assets/Graph.svg';

//프로필
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
`;
export const ProfileImgContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 14rem;
  border: 0.7px solid #e0e0e0;
  border-radius: 50%;
  overflow: hidden;
  &:hover .edit-overlay {
    opacity: 1;
  }
`;

export const StyledProfile = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
export const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 50%;
`;
export const EditingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-radius: 50%;
`;
export const ProfileTextContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-bottom: 10px;
`;
export const ProfileText = styled.h2`
  font-size: 19px;
  font-weight: 600;
  margin-right: 20px;
  cursor: default;
`;
export const ProfileDetail = styled.p`
  font-size: 19px;
  font-weight: 500;
  margin-right: 20px;
  cursor: default;
`;
export const CorrectText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: #5a4d43;
    font-weight: 400;
  }
`;
export const AccountLink = styled.a`
  display: flex;
  font-size: 18px;
  color: #828282;
  cursor: pointer;
`;
export const EditAccountText = styled.p`
  cursor: pointer;
`;
export const StyledInput = styled.input`
  font-size: 18px;
  border-bottom: 1px solid #828282;
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 1.5px solid #4188fe;
    transition: 0.2s;
  }
`;
export const ProfileAccountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 100%;
`;
export const AccountIcon = styled.img`
  width: 2.8rem;
`;
export const AccountGithub = styled.img`
  width: 2.4rem;
  border: none;
  border-radius: 10px;
`;
//자기소개
export const IntroduceContainer = styled.div`
  height: 40%;
  max-height: 40%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  margin-left: 20px;
  padding: 20px;
  background-color: #e6f3ff;
`;
//퀘스트
export const QuestContainer = styled.div`
  height: 54%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-left: 20px;
  padding: 20px;
`;
export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const StepLabel = styled.div<{ completed?: boolean }>`
  font-size: 17px;
  margin-bottom: 8px;
  color: ${({ completed }) => (completed ? '#000' : '#ccc')};
`;

export const StepCircle = styled.div<{ completed?: boolean; color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ completed, color }) => (completed ? color : '#ccc')};
  margin-bottom: 8px;
`;

export const StepLine = styled.div`
  flex: 1;
  height: 1px;
  color: #828282;
  background-color: #828282;
`;

//프로젝트 컨테이너
export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  margin-right: 20px;
  box-sizing: border-box;
`;
//최근 프로젝트 링크
export const LinkProject = styled.div`
  height: 7rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: white;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
  box-sizing: border-box;
`;
//피드백 수
export const FeedbackContainer = styled.div`
  height: 14.5rem;
  display: flex;
  flex-direction: column;
  background-color: #e8e0f1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  box-sizing: border-box;
`;
//통계
export const StaticContainer = styled.div`
  background-color: #f3f5fb;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 23rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  cursor: default;
  box-sizing: border-box;
`;
export const StaticOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 21.5rem;
  border: none;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #828282;
  z-index: 3;
`;

export const AIReportContainer = styled.div`
  background-color: #e1f9f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 23rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 10px 20px;
  cursor: default;
  box-sizing: border-box;
`;
export const AIBestText = styled.h1`
  color: #315af1;
  font-weight: 600;
  font-size: 1.2em;
`;
export const ReviewWrapper = styled.div`
  cursor: defualt;
  display: flex;
  flex-direction: column;
  height: 28.5rem;
  overscroll-behavior: none;
  overflow-y: scroll;
  width: 30%;
  box-sizing: border-box;
  gap: 1rem;
`;
export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 20px;
`;
export const DetailText = styled.p`
  color: #828282;
  font-size: 16px;
`;
export const UniqueText = styled.h1`
  font-weight: 700;
  font-size: 30px;
`;
export const MypageChartIcon = styled(ChartIcon)`
  width: 100px;
  height: 200px;
  transform: scaleX(-1);
  align-self: flex-end;
`;
export const StyledGraphIcon = styled(GraphIcon)`
  width: 45px;
  height: 50px;
`;

export const EmptyContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
  width: 22rem;
  height: 9rem;
  padding: 20px;
  box-sizing: border-box;
`;
