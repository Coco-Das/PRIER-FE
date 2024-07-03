import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import sidebar1 from '../../assets/sidebar1.svg';
import sidebar2 from '../../assets/sidebar2.svg';
import sidebar3 from '../../assets/sidebar3.svg';
import sidebar4 from '../../assets/sidebar4.svg';
import sidebar5 from '../../assets/sidebar5.svg';
import sidebar6 from '../../assets/sidebar6.svg';
import CustomAlert from '../../components/utils/CustomAlert'; // 경로 업데이트
import { FetchLogout } from '../../services/UserApi'; // 로그아웃 API 호출 함수 임포트

interface SideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  currentPath: string;
}

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#FFFFFF', // 사이드바 메뉴 배경 색상 흰색
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100% - 70px)',
    width: '4.5rem', // 너비를 줄여서 이미지만 들어갈 정도로 설정
    padding: '.75rem',
    borderRadius: '10px',
    boxShadow: '0 10px 10px 0 rgba(5, 4, 62, 0.25)',
    overflow: 'visible', // 호버 시 텍스트가 잘 보이도록 설정
    marginLeft: '5px', // 사이드바 마진 레프트 추가
    transition: 'transform 0.3s ease-in-out', // 애니메이션 효과 추가
    transform: 'translateY(-100%)', // 기본적으로 위로 숨김 처리
    '&.MuiDrawer-open': {
      transform: 'translateY(0)', // 열릴 때 아래로 내려옴
    },
  },
}));

const CustomListItemButton = styled('div')(({ theme }) => ({
  color: '#000000', // 텍스트 색상 검정색
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.5rem',
  height: '3rem',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'visible',
  '&:hover, &:focus': {
    backgroundColor: '#E6F3FF', // 호버 시 색상
    outline: 0,
    '& span': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  '&:active': {
    backgroundColor: '#D1E0FC', // 클릭 시 색상
    outline: 0,
  },
  '& img': {
    fontSize: '1.375rem',
  },
  '& span': {
    position: 'absolute',
    backgroundColor: '#E6F3FF',
    boxShadow: '0 2px 5px 0 rgba(5, 4, 62, 0.25)',

    whiteSpace: 'nowrap',
    padding: '.5rem 1rem',
    borderRadius: '6px',
    left: 'calc(100% + 1.5rem)',
    transformOrigin: 'center left',
    transform: 'scale(0)',
    opacity: 0,
    transition: 'opacity .15s ease, transform .15s ease',
    '&:before': {
      content: '""',
      display: 'block',
      width: '12px',
      height: '12px',
      position: 'absolute',
      backgroundColor: '#E6F3FF',
      left: '-5px',
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderRadius: '3px',
    },
  },
}));

const LogoutButton = styled('div')(({ theme }) => ({
  color: '#000000', // 텍스트 색상 검정색
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.5rem', // 메뉴 높이 수정
  height: '3rem', // 메뉴 높이 수정
  borderRadius: '8px',
  position: 'relative',
  overflow: 'visible', // 호버 시 텍스트가 잘 보이도록 설정
  '&:hover, &:focus': {
    backgroundColor: '#E6F3FF', // 호버 시 색상
    outline: 0,
    '& span': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  '&:active': {
    backgroundColor: '#D1E0FC', // 클릭 시 색상
    outline: 0,
  },
  '& span': {
    position: 'absolute',
    backgroundColor: '#E6F3FF',
    whiteSpace: 'nowrap',
    padding: '.5rem 1rem',
    borderRadius: '6px',
    left: 'calc(100% + 1.5rem)',
    transformOrigin: 'center left',
    boxShadow: '0 2px 5px 0 rgba(5, 4, 62, 0.25)',

    transform: 'scale(0)',
    opacity: 0,
    transition: 'opacity .15s ease, transform .15s ease',
    '&:before': {
      content: '""',
      display: 'block',
      width: '12px',
      height: '12px',
      position: 'absolute',
      backgroundColor: '#E6F3FF',
      left: '-5px',
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderRadius: '3px',
    },
  },
}));

const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer, currentPath }) => {
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const logout = FetchLogout();

  const menuItems = [
    { text: '프로젝트 리스트', path: '/main', icon: sidebar1 },
    { text: '테스트 생성하기', path: '/createtest', icon: sidebar2 },
    { text: '테스트한 프로젝트', path: `/testlist/${localStorage.getItem('userId')}`, icon: sidebar3 },
    { text: '커뮤니티', path: '/board', icon: sidebar4 },
    { text: '상점', path: '/store', icon: sidebar5 },
    { text: '마이페이지', path: '/mypage', icon: sidebar6 },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleDrawer(false); // 메뉴를 닫기 위해 추가
  };

  const confirmLogout = () => {
    setShowLogoutAlert(true);
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  const handleLogout = useCallback(async () => {
    setShowLogoutAlert(false);
    try {
      await logout();
      navigate('/firstmain');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }, [logout, navigate]);

  return (
    <CustomDrawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        className: open ? 'MuiDrawer-open' : '',
        style: {
          position: 'absolute',
          marginTop: '64px',
          height: 'calc(100% - 70px)',
          overflow: 'visible', // 호버 시 텍스트가 잘 보이도록 설정
        },
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          style: {
            backgroundColor: 'transparent',
          },
          onClick: () => toggleDrawer(false),
        },
      }}
      variant="temporary"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
        {showLogoutAlert && (
          <CustomAlert message="정말 로그아웃 하시겠습니까?" onConfirm={handleLogout} onCancel={cancelLogout} />
        )}
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <CustomListItemButton onClick={() => handleNavigation(item.path)}>
                <img src={item.icon} alt={`${item.text} icon`} />
                <span>{item.text}</span>
              </CustomListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <LogoutButton onClick={confirmLogout}>
                <h1 style={{ fontSize: '10px', textAlign: 'center', margin: '0' }}>
                  LOG
                  <br />
                  OUT
                </h1>
                <span>로그아웃</span>
              </LogoutButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </CustomDrawer>
  );
};

export default SideBar;
