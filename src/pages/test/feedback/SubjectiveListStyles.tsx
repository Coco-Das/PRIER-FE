import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 90px;
  padding-right: 90px;
`;
export const SubjectiveWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ResponseDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const QuestionDiv = styled.div<{ $isOdd: boolean }>`
  background-color: ${props => (props.$isOdd ? '#23BE87' : '#315AF1')};
  color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  width: 70%;
  text-align: left;
  position: relative;
  align-self: ${props => (props.$isOdd ? 'flex-start' : 'flex-end')};

&:before {
  content: '';
  position: absolute;
  top: 20px;
  ${props => (props.$isOdd ? 'left' : 'right')}: -20px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-${props => (props.$isOdd ? 'right' : 'left')}-color: ${props => (props.$isOdd ? '#23BE87' : '#315AF1')};
}
`;
