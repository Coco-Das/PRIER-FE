import styled from 'styled-components';

export const Container = styled.div`
  background: #f3f6fd;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  overflow-y: auto; /* Container에 스크롤을 추가합니다 */
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
`;

// 포스트 박스 스타일
export const PostBox = styled.div`
  background: #ffffff;
  border-radius: 15px;
  width: 100%;
  max-width: 1000px;
  min-height: 450px;
  padding: 1vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  margin-bottom: 1rem;
  max-height: 1000px; /* 최대 높이를 1000px로 제한합니다 */
  overflow: hidden; /* PostBox 자체에는 스크롤을 숨깁니다 */
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
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10vh;
`;

export const Author = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
`;
// 버튼 스타일
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
`;

// 버튼 텍스트 스타일
export const ButtonText = styled.div`
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 5px;
  height: 100%;
  overflow: hidden; /* ContentContainer의 스크롤을 숨깁니다 */
`;

export const Title = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 20px;
`;

export const ContentText = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  height: 100%;
  resize: vertical;
  max-height: calc(1000px - 200px); /* 최대 높이를 1000px에서 나머지 요소들의 높이를 뺀 값으로 설정합니다 */
  overflow-y: auto; /* 스크롤이 생기도록 설정합니다 */
`;
