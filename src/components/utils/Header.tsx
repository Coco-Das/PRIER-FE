import styled from 'styled-components';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as User } from '../../assets/user.svg';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.nav`
  height: 64px; // 16px * 4
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  width: 100%;
  border-image: linear-gradient(90deg, #315af1, #23be87, #773cd1) 1;
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

export const Header = () => {
  const navigate = useNavigate();
  const handleLogoCick = () => {
    navigate('/main');
  };
  return (
    <HeaderContainer>
      <StyledMenu />
      <StyledLogo onClick={handleLogoCick} />
      <StyledUser />
    </HeaderContainer>
  );
};
