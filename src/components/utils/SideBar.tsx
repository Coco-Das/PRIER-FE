import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, keyframes } from '@mui/material/styles';
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
    backgroundColor: '#F3F5FB',
    fontFamily: 'Paybooc, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // Drawer height set to 100%
  },
}));

interface CustomListItemButtonProps extends ListItemButtonProps {
  current: boolean;
}

const tilt = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const CustomListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop: any) => prop !== 'current',
})<CustomListItemButtonProps>(({ theme, current }) => ({
  '&:hover': {
    backgroundColor: '#D1E0FC',
    '& img': {
      animation: `${tilt} 0.3s`,
    },
  },
  backgroundColor: current ? '#D1E0FC' : 'inherit',
  padding: '8px 16px', // 버튼 크기 줄이기
}));

const CustomListItemIcon = styled('img')({
  width: 24,
  height: 24,
  marginRight: 20, // 이미지와 텍스트 사이 간격 줄이기
});

const LogoutButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'inherit',
    '& .MuiListItemText-root': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
  '&.Mui-selected': {
    backgroundColor: 'inherit',
    '& .MuiListItemText-root': {
      color: theme.palette.primary.main,
    },
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'inherit',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'inherit',
  },
  '&:active': {
    backgroundColor: 'inherit',
  },
}));

const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer, currentPath }) => {
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const logout = FetchLogout();

  const menuItems = [
    { text: '프로젝트 리스트', path: '/main', icon: sidebar1 },
    { text: '테스트 생성하기', path: '/createtest', icon: sidebar2 },
    { text: '테스트한 프로젝트', path: '/testlist', icon: sidebar3 },
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
        style: {
          position: 'absolute',
          marginTop: '64px',
          height: 'calc(100% - 64px)',
          overflow: 'hidden',
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
      <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
        {showLogoutAlert && (
          <CustomAlert message="정말 로그아웃 하시겠습니까?" onConfirm={handleLogout} onCancel={cancelLogout} />
        )}
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <CustomListItemButton current={currentPath === item.path} onClick={() => handleNavigation(item.path)}>
                <CustomListItemIcon src={item.icon} alt={`${item.text} icon`} />
                <ListItemText primary={item.text} />
              </CustomListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <LogoutButton onClick={confirmLogout}>
                <ListItemText primary="로그아웃" />
              </LogoutButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </CustomDrawer>
  );
};

export default SideBar;
