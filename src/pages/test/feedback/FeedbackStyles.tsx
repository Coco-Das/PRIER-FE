import styled from 'styled-components';

export const FeedbackWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 30px 90px;
`;
export const ProjectDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  gap: 15px;
`;
export const ProjectContainer = styled.div`
  width: 30%;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const StaticContainer = styled.div`
  background-color: #f3f5fb;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  cursor: default;
  box-sizing: border-box;
`;
export const TitleText = styled.span`
  font-weight: 700;
  font-size: 16px;
`;
export const DetailText = styled.p`
  color: #828282;
  font-size: 14px;
`;
export const UniqueText = styled.span`
  font-weight: 700;
  font-size: 25px;

  white-space: nowrap;
  padding-left: 5px;
`;
export const MypageChartIcon = styled.img`
  width: 20%;
  transform: scaleX(-1);
  height: 60%;
  margin-left: auto;
  margin-top: auto;
`;
export const FeedbackContainer = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  background-color: #e8e0f1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  box-sizing: border-box;
`;
export const LinkText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  cursor: pointer;
  &:hover {
    color: #4188fe;
  }
`;
export const AIReportContainer = styled.div`
  background-color: #e1f9f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 20px;
  cursor: default;
  box-sizing: border-box;
`;
export const ResponseDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Img = styled.img`
  object-fit: cover;
  border-radius: 15px;
  width: 50%;
  height: 35%;
  /* border: 1px solid red; */
`;

export const QuestionDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 30px;
  border-radius: 8px;
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff), linear-gradient(90deg, #315af1, #7eb4d2, #b5f4bc);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
`;
export const CommentDiv = styled.div<{ $isEmpty: boolean }>`
  height: auto;
  width: 100%;
  display: ${props => (props.$isEmpty ? 'flex' : 'grid')};
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 열 */
  gap: 15px; /* 아이템 사이의 간격 */
`;
export const CommentWrapper = styled.div`
  width: 100%;
  font-size: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
`;
export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;
