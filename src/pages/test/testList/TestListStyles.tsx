import styled from 'styled-components';
import { ReactComponent as ChartIcon } from '../../../assets/main_chart.svg';

export const ListWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0px 30px 20px 30px;
`;

export const FilterBtn = styled.button<{ $isActive: boolean }>`
  background-color: ${props => (props.$isActive ? '#315af1' : 'white')};
  color: ${props => (props.$isActive ? 'white' : 'black')};
  height: 100%;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  &:hover {
    background-color: ${props => (props.$isActive ? '#315af1' : '#e0e0e0')};
  }
`;

export const ListDiv = styled.div`
  width: 90%;
  height: 300px;
  display: flex;
  padding: 20px 40px;
  border: 1px solid #a9b5bc;
  border-radius: 15px;
  font-size: 18px;
  gap: 15px;
`;
export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;
export const Img = styled.img`
  object-fit: cover;
  border-radius: 15px;
  width: 100%;
  height: 70%;
  /* border: 1px solid red; */
`;
export const DivWrapper = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const PurpleDiv = styled.div`
  background-color: #b193d040;
  border: 1px solid #e0e0e0;
  gap: 8px;
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  border-radius: 8px;
  padding: 20px 30px;
  padding-bottom: 0px;
  position: relative;
`;
export const GreenDiv = styled.div`
  background-color: #e1f9f0;
  border: 1px solid #e0e0e0;
  gap: 15px;
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  border-radius: 8px;
  padding: 20px 30px;
  /* padding-bottom: 0px; */
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
export const TagWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  position: absolute;
  flex-wrap: nowrap;
  width: 100%;
  top: 70%;
  left: 0%;
  gap: 5px;
`;
export const Tag = styled.div<{ $bgColor: string }>`
  padding: 5px 10px;
  position: relative;
  background-color: ${props => props.$bgColor};
  border-radius: 20px;
  font-size: 12px;
`;
export const StaticContainer = styled.div`
  background-color: #f3f5fb;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  cursor: default;
  box-sizing: border-box;
`;
export const TitleText = styled.h2`
  font-weight: 700;
`;
export const DetailText = styled.p`
  color: #828282;
  font-size: 16px;
`;
export const UniqueText = styled.h1`
  font-weight: 700;
  font-size: 25px;
`;
export const MypageChartIcon = styled(ChartIcon)`
  width: 100px;
  height: 200px;
  transform: scaleX(-1);
  align-self: flex-end;
`;
