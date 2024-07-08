import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
// import Logo from '../../assets/Logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import Profile from '../user/Profile';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { device } from '../../styles/Media';

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
  margin-left: 24px;
`;

const StyledLogo = styled(Logo)`
  &:hover {
    cursor: pointer;
  }
  height: 100%;
  width: 120px;
  margin-left: 40px;
  margin-bottom: 6px;
  ${device.small} {
    margin-left: 10px;
  }

  ${device.medium} {
    margin-left: 30px;
  }
`;
const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  object-fit: cover;
  ${device.small} {
    width: 2.5rem;
    height: 2.5rem;
  }
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const ProfileImg = sessionStorage.getItem('profileImg');

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
        {ProfileImg ? <StyledImg src={ProfileImg} /> : <></>}
        {profileOpen && <Profile />}
      </UserContainer>
      <SideBar open={sideBarOpen} toggleDrawer={toggleSideBar} currentPath={currentPath} />
    </HeaderContainer>
  );
};
