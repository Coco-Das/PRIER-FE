import styled from 'styled-components';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.nav`
  height: 64px; // 16px * 4
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  border-bottom: 1px solid black;
  width: 100%;
`;
const StyledMenu = styled(Menu)`
  &:hover {
    cursor: pointer;
  }
  margin-left: 20px;
`;

const StyledLogo = styled(Logo)`
  &:hover {
    cursor: pointer;
  }
  height: 100%;
  margin-left: 40px;
`;
const StyledUser = styled(User)`
  &:hover {
    cursor: pointer;
  }
  height: 100%;
  margin-left: auto;
  margin-right: 20px;
`;
const MenuContainer = styled.div`
  display: flex;
  z-index: 5;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  text-align: center;
  position: absolute;
  top: 4rem;
  right: 0.25rem;
  p {
    &:hover {
      cursor: pointer;
    }
  }
  z-index: 100;
`;

export const Header = () => {
  const navigate = useNavigate();
  const handleLogoCick = () => {
    navigate('/menu');
  };
  return (
    <HeaderContainer>
      <StyledMenu />
      <StyledLogo />
      <StyledUser />
    </HeaderContainer>
  );
};
