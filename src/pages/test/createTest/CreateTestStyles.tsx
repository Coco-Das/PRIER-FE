import styled from 'styled-components';
import { ReactComponent as Setting } from '../../../assets/Setting.svg';

export const CreateWrapper = styled.div`
  height: 91vh;
  width: 100%;
  display: flex;
  padding: 0px 30px 0px 30px;
`;

export const ProjectDiv = styled.div`
  height: 100%;
  width: 65%;
  display: flex;
  flex-direction: column;
`;

export const ProjectIntro = styled.div`
  height: 100%;
  width: 35%;
`;
export const Settings = styled(Setting)``;

export const ProjectTextArea = styled.div`
  position: relative;
  height: 85%;
  margin-top: 10px;
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
  overflow: hidden;
`;

export const ImageUploadContainer = styled.div`
  margin-top: 20px;
`;

export const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  max-height: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
export const StyledInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 0.875rem;
`;
export const StyledImg = styled.img`
  margin-top: 10px;
  max-width: 100%;
  width: 400px;
  height: 300px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
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
