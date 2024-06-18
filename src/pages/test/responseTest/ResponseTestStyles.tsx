import styled from 'styled-components';
import { ReactComponent as DeleteBtn } from '../../../assets/DeleteBtn.svg';
import { ReactComponent as EditBtn } from '../../../assets/EditBtn.svg';

export const CreateWrapper = styled.div`
  width: 100%;
  height: auto;
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

export const ProjectDiv = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProjectIntro = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

export const ProjectTextArea = styled.div`
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
  min-height: 100px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid red;
`;
export const StyledImg = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

export const ImageWrapper = styled.div`
  gap: 15px;
  display: inline-block;
  width: 100%;
  height: auto;
  flex-direction: column;
  display: flex;
  align-items: center;
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

export const DeleteButton = styled(DeleteBtn)`
  width: 20px;
  height: 20px;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;
export const EditButton = styled(EditBtn)`
  width: 20px;
  height: 20px;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const TagWrapper = styled.div<{ $isMine: boolean }>`
  margin-top: ${props => (props.$isMine ? '10px' : '60px')};
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 5px;
`;

export const Tag = styled.div<{ $bgColor: string }>`
  padding: 5px 10px;
  position: relative;
  background-color: ${props => props.$bgColor};
  border-radius: 20px;
  font-size: 12px;
`;

export const OrangeDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 17%;
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
  gap: 10px;
  font-weight: bold;
`;
export const BlueDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 30%;
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
  overflow-y: auto;
`;
export const BlueInputDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  span {
    color: #828282;
    font-weight: bold;
  }
`;
export const GreenDiv = styled.div`
  margin-left: 30px;
  border-radius: 8px;
  height: 10%;
  background-color: #e1f9f0;
  font-size: 15px;
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  border: 1px solid #e0e0e0;
  input {
    border: 1px solid #23be87;
  }
`;

export const WhiteDiv = styled.div`
  height: 20%;
  font-size: 15px;
  padding: 15px 20px 0px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  /* gap: 10px; */
  flex-direction: column;
  margin-left: 30px;
`;
