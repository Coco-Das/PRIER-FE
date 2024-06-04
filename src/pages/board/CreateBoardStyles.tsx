import styled from 'styled-components';

export const Container = styled.div`
  background: #f3f6fd;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
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
  margin-bottom: 3rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
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
`;

export const Author = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
`;
