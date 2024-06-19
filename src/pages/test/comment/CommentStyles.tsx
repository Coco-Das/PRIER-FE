import styled from 'styled-components';

export const SidebarContainer = styled.div<{ show: boolean }>`
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
  transform: translateX(${props => (props.show ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;
export const Button = styled.button`
  width: 30%;
  /* background-color: #23be87; */
  border: 1.5px solid #23be87;
  font-size: 16px;
  border-radius: 0px 8px 0px 0px;
  border-bottom: none;
  height: 100%;
`;
export const CommentDiv = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;

  /* background-color: #23be87; */
`;
export const CommentWrapper = styled.div`
  width: 100%;
  font-size: 15px;
  height: auto;
  border-radius: 8px;
  box-shadow: 2px;
  border: 1px solid black;
  padding: 10px 20px;
`;
