import { styled } from 'styled-components';
import { ReactComponent as UserIcon } from '../../../assets/userProfile.svg';
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
  margin-left: 10px;
  margin-bottom: 10px;
`;
export const IntroduceContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  margin-left: 15px;
  padding: 20px;
  background-color: #e6f3ff;
`;
export const QuestContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-left: 15px;
  padding: 20px;
`;
export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  width: 70%;
  margin-right: 20px;
`;
export const ReviewContainer = styled.div``;
