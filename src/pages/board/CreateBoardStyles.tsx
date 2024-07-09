import styled from 'styled-components';

export const Container = styled.div`
  background: #f3f6fd;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  overflow-y: auto;
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 100%;
  max-width: 730px;
`;

export const Header = styled.div`
  top: 0;
  width: 100%;
  max-width: 1000px;
  background: #f3f6fd;
  z-index: 1;
  padding: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: right;
`;

export const PostBox = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 1000px;
  padding: 1vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  border-radius: 15px;
  margin-bottom: 1rem;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Avatar = styled.div`
  background: #f7f7f7;
  border-radius: 1000px;
  width: 50.58px;
  height: 50.58px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 50%;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5vh;
`;

export const Author = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
`;

export const Button = styled.div`
  background: #bb68fd;
  border-radius: 8px;
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100px;
  margin-bottom: 30px;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    background-color: #cc9af5;
    color: #9723f6;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ButtonText = styled.div`
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 5px;
  height: auto;
  overflow: visible;
`;

export const Title = styled.input`
  padding: 10px 10px 10px 0px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 20px;
  outline: none; // 포커스 시 보더 제거
  font-weight: 600;
`;

export const ContentText = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  height: 400px; /* 기본 높이 설정 */
  overflow-y: visible; /* 스크롤 숨김 */
  resize: none; /* 크기 조절 불가 */
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10px;
  width: 400px;
  max-width: 100%;
`;

export const StyledImg = styled.img`
  max-width: 100%;
  width: 400px;
  height: 300px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 20px;
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

export const FileCount = styled.div`
  color: #004dff;
  border: none;
  width: 150px;
  height: 30px;
  //color: #fff;
  border-radius: 5px;
  font-weight: 500;
  padding: 4px 0;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  margin-top: 10px;
  outline: none;
  white-space: nowrap;

  font-size: 14px;
`;

export const CreateWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

// 기본 버튼 스타일
export const Btn1 = styled.button`
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  font-weight: 500;
  padding: 0 15px;
  background: transparent;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin-left: 5px;
  outline: none;
  white-space: nowrap;

  font-size: 15px;
`;

// btn-1 스타일을 확장
export const CustomButton = styled(Btn1)`
  background: #004dff;
  border: none;
  overflow: hidden;
`;
