import styled from 'styled-components';

export const SidebarContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  /* padding: 20px; */
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  transform: translateX(${props => (props.$show ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;
export const Button = styled.button`
  padding: 5px 10px;
  /* background-color: #23be87; */
  border: 1px solid #315af1;
  font-size: 12px;
  border-radius: 20px;
  font-weight: bold;
  height: 90%;
`;
export const DeleteButton = styled.img`
  width: 14px;
  height: 16px;
  &:hover {
    cursor: pointer;
  }
`;
export const EditButton = styled.img`
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
`;
export const CommentDiv = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
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
