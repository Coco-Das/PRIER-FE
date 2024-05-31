import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  currentPath: string;
}

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#F3F5FB',
    fontFamily: 'Paybooc, sans-serif',
  },
}));

interface CustomListItemButtonProps extends ListItemButtonProps {
  current: boolean;
}

const CustomListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop: any) => prop !== 'current',
})<CustomListItemButtonProps>(({ theme, current }) => ({
  '&:hover': {
    backgroundColor: '#D1E0FC',
  },
  backgroundColor: current ? '#D1E0FC' : 'inherit',
}));

const Spacer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer, currentPath }) => {
  const navigate = useNavigate();
  const menuItems = [
    { text: '프로젝트 리스트', path: '/main' },
    { text: '테스트 생성하기', path: '/createtest' },
    { text: 'IT 소식', path: '/board' },
    { text: '잡담/일상', path: '/board' },
    { text: '기술', path: '/board' },
    { text: '인턴/공모전', path: '/board' },
    { text: '공지사항', path: '/board' },
    { text: '마이페이지', path: '/mypage' },
    { text: '로그아웃', path: '/login' },
  ];
  const handleNavigation = (path: string) => {
    navigate(path);
    toggleDrawer(false); // 메뉴를 닫기 위해 추가
  };
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
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <CustomListItemButton current={currentPath === item.path} onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.text} />
              </CustomListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </CustomDrawer>
  );
};

export default SideBar;
