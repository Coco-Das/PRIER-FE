import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_BASE_URL } from '../../const/TokenApi'; // Axios 인스턴스 가져오기

interface PositionedMenuProps {
  postId: number;
}

const PostMenu: React.FC<PositionedMenuProps> = ({ postId }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifyboard/${postId}`);
  };

  const handleDeleteClick = async () => {
    try {
      await API_BASE_URL.delete(`/posts/${postId}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/board'); // 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'none', color: 'neutral', sx: { zIndex: 10 } } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end" sx={{ zIndex: 20, border: 'none' }}>
        <MenuItem onClick={handleEditClick}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          수정하기
        </MenuItem>
        <MenuItem variant="soft" color="danger" onClick={handleDeleteClick}>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>
          삭제하기
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default PostMenu;
