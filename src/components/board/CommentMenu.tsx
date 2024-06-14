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
import axios from 'axios'; // Import axios
import { API_BASE_URL } from '../../const/TokenApi'; // Axios 인스턴스 가져오기

interface CommentMenuProps {
  commentId: number;
  postId: number; // Add postId prop
  onEditClick: (commentId: number) => void;
  onDeleteSuccess: () => void; // Add a callback for successful deletion
}

const CommentMenu: React.FC<CommentMenuProps> = ({ commentId, postId, onEditClick, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await API_BASE_URL.delete(`/posts/${postId}/comment/${commentId}`);
      onDeleteSuccess(); // Notify parent component about successful deletion
    } catch (error) {
      console.error('Failed to delete the comment:', error);
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
        <MenuItem onClick={() => onEditClick(commentId)}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          수정하기
        </MenuItem>
        <MenuItem variant="soft" color="danger" onClick={handleDelete}>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>
          삭제하기
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default CommentMenu;
