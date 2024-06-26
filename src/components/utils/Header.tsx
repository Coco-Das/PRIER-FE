import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import Profile from '../user/Profile';
import { useUserStore } from '../../states/user/UserStore';

const HeaderContainer = styled.nav`
  position: relative;
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
const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
const UserContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-left: auto;
  margin-right: 20px;
`;

export const Header = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const userProfile = useUserStore(state => state.userProfile);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogoCick = () => {
    navigate('/main');
  };
  const toggleSideBar = (open: boolean) => {
    setSideBarOpen(open);
  };
  const handleMouseEnter = () => {
    setProfileOpen(true);
  };

  const handleMouseLeave = () => {
    setProfileOpen(false);
  };

  return (
    <HeaderContainer onMouseLeave={handleMouseLeave}>
      <StyledMenu onClick={() => toggleSideBar(!sideBarOpen)} />
      <StyledLogo onClick={handleLogoCick} />
      <UserContainer onMouseEnter={handleMouseEnter}>
        <StyledImg src={userProfile.imgUrl} />
        {profileOpen && <Profile />}
      </UserContainer>
      <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} currentPath={currentPath} />
    </HeaderContainer>
  );
};
