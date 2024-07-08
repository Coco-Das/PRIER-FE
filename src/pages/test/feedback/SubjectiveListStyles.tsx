import styled from 'styled-components';

export const SubjectiveWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 90px;
  padding-right: 90px;
`;
export const ResponseDiv = styled.div`
  height: auto;

  width: 100%;
  gap: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열로 설정 */
  /* flex-direction: column; */
`;
export const QuestionDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-radius: 8px;
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff), linear-gradient(90deg, #315af1, #7eb4d2, #b5f4bc);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
`;
