import styled from 'styled-components';
import { ReactComponent as Setting } from '../../../assets/Setting.svg';
import { ReactComponent as AddBtn } from '../../../assets/AddBtn.svg';

export const CreateWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  padding: 0px 30px 0px 30px;
`;
export const Project = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
`;
export const Question = styled.div`
  width: 100%;
  gap: 15px;
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
`;

export const ProjectIntro = styled.div`
  width: 35%;
`;
export const Settings = styled.img`
  width: 40px;
`;
export const AddButton = styled(AddBtn)`
  margin-top: 5%;
  &:hover {
    cursor: pointer;
  }
`;
export const QuestionDeleteButton = styled.img`
  width: 25px;
  height: 25px;
  &:hover {
    cursor: pointer;
  }
`;
export const ProjectDiv = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

export const ProjectTextArea = styled.div`
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 설정 */
  }

  &::-webkit-scrollbar-track {
    margin-top: 8px;

    margin-bottom: 8px;
    background: transparent; /* 스크롤바 트랙 배경을 투명하게 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray; /* 스크롤바 thumb 색상 설정 */
    border-radius: 15px; /* 스크롤바 thumb 모서리 둥글게 설정 */
    border: 3px solid transparent; /* 스크롤바 thumb과 트랙 사이의 간격 설정 */
  }
  display: flex;
  flex-direction: column;
  min-height: 90%;
  box-sizing: border-box;
  width: 100%;
  border: 1.5px solid transparent; // 투명한 테두리 설정
  overflow-y: auto;
  border-radius: 15px;
  background: linear-gradient(#fff, #fff), /* 내부 백그라운드 */ linear-gradient(90deg, #aaead3, #773cd1); /* 외부 그라데이션 */
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  padding: 30px;
  p {
    color: #315af1;
  }
`;
export const Textarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  min-height: 150px;
  overflow: hidden;
`;
export const StyledImg = styled.img`
  max-width: 100%;
  width: 300px;
  height: 150px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10px;
  width: 200px;
  max-width: 100%;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgray;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const HiddenInput = styled.input`
  display: none;
`;
export const CustomButton = styled.button`
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
  background-color: #315af1;
  color: white;
  border: none;
  width: 20%;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 10px;
  white-space: nowrap;
  text-align: center;
`;

export const FileCount = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: #315af1;
`;
export const TagDiv = styled.div`
  padding-left: 30px;
  font-size: 15px;
  height: 5%;
  display: flex;
  align-items: center;
`;
export const TagWrapper = styled.div`
  margin-top: 10px;
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const Tag = styled.div<{ $bgColor: string }>`
  padding: 5px 10px;
  position: relative;
  background-color: ${props => props.$bgColor};
  border-radius: 20px;
  font-size: 12px;
`;

export const Input = styled.input`
  width: 30%;
  border-radius: 10px;
  background-color: #f7f7f7;
  height: 100%;
  outline: none;
  padding: 5px 10px;
  &::placeholder {
    text-align: center;
  }
`;
export const OrangeDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 20%;
  background-color: #ffd09b;
  font-size: 15px;
  border: 1px solid #e0e0e0;
  padding: 15px 20px 0px 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
export const OrangeInputDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  input {
    border: 1px solid #ffba6b;
  }
`;
export const BlueDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 37%;
  background-color: #cee7ff;
  font-size: 15px;
  padding: 15px 20px 0px 20px;
  display: flex;
  gap: 10px;
  border: 1px solid #e0e0e0;
  flex-direction: column;
  input {
    border: 1px solid #315af1;
  }
`;
export const BlueInputDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  display: flex;
  align-items: center;
`;
export const GreenDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 14%;
  background-color: #e1f9f0;
  font-size: 15px;
  padding: 5px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid #e0e0e0;
  flex-direction: column;
  input {
    border: 1px solid #23be87;
  }
`;
export const GreenInputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  span {
    width: 15%;
  }
`;
export const QuestionDiv = styled.div`
  width: 90%;
  height: auto;
  padding: 15px 30px;
  border-radius: 8px;
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff), linear-gradient(90deg, #315af1, #7eb4d2, #b5f4bc);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
`;
