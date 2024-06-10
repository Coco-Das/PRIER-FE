import { styled } from 'styled-components';
import { ReactComponent as UserIcon } from '../../../assets/userProfile.svg';
import { ReactComponent as ChartIcon } from '../../../assets/main_chart.svg';
import { ReactComponent as GraphIcon } from '../../../assets/Graph.svg';
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
`;
export const StyledUserIcon = styled(UserIcon)``;
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
  display: flex;
  font-size: 18px;
  color: #315af1;
  cursor: pointer;
`;
export const StyledInput = styled.input`
  font-size: 18px;
  background-color: #f3f8ff;
  border-bottom: 1px solid #828282;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;
export const ProfileAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
`;
export const AccountIcon = styled.img`
  width: 30px;
`;
export const IntroduceContainer = styled.div`
  width: 100%;
  height: 40%;
  max-height: 40%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  margin-left: 15px;
  padding: 20px;
  background-color: #e6f3ff;
`;
export const QuestContainer = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-left: 15px;
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

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-right: 20px;
`;
export const LinkProject = styled.div`
  width: 260px;
  max-width: 260px;
  height: auto;
  border: none;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
`;
export const FeedbackContainer = styled.div`
  background-color: #e8e0f1;
  height: 50%;
  width: 260px;
  max-width: 260px;
  border: none;
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
`;
export const StaticContainer = styled.div`
  background-color: #f3f5fb;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 80%;
  max-width: 320px;
  border: none;
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  cursor: default;
`;
export const AIReportContainer = styled.div`
  background-color: #e1f9f0;
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: 320px;
  height: 80%;
  border: none;
  border-radius: 15px;
  padding: 20px;
  cursor: default;
`;

export const ReviewWrapper = styled.div`
  cursor: defualt;
  display: flex;
  flex-direction: column;
  width: 25%;
  max-width: 25%;
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
`;
export const StyledGraphIcon = styled(GraphIcon)`
  margin: 0px;
  width: 45px;
`;
