import { styled } from 'styled-components';

export const ProjectContainer = styled.div`
  border: none;
  border-radius: 15px;
  padding: 3px;
  width: max-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;
export const LinkText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
`;
export const ProfileContainer = styled.div`
  position: absolute;
  top: 64px;
  right: 10px;
  border: 1px solid none;
  border-radius: 20px;
  background-color: white;
  width: 30%;
  padding: 25px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
`;
export const Title = styled.h1`
  color: #315af1;
  font-weight: 500;
  font-size: 22px;
`;
export const MiddleText = styled.h2`
  font-size: 18px;
`;
export const PointText = styled.p`
  color: #315af1;
  font-size: 16px;
`;
export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2%;
`;

export const Filler = styled.div<{ percentage: number }>`
  height: 10px;
  width: ${({ percentage }) => percentage}%;
  background-color: #4285f4;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`;

export interface ProgressBarProps {
  percentage: number;
}
