import React from 'react';
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
import { API_BASE_URL } from '../../const/TokenApi';
import DeleteAlert from '../board/DeleteAlert'; // Import CustomAlert

interface PositionedMenuProps {
  postId: number;
  title: string; // Add title prop
  insidePostBox?: boolean;
}

const PostMenu: React.FC<PositionedMenuProps> = ({ postId, title, insidePostBox }) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false);

  const handleEditClick = () => {
    navigate(`/modifyboard/${postId}`);
  };

  const handleDelete = async () => {
    try {
      await API_BASE_URL.delete(`/posts/${postId}`);
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const truncatedTitle = title.length > 5 ? `${title.slice(0, 5)}...` : title;

  return (
    <>
      {showAlert && (
        <DeleteAlert
          message={`해당 게시물을 삭제하시겠습니까?`}
          onConfirm={handleDelete}
          onCancel={() => setShowAlert(false)}
          insidePostBox={insidePostBox}
        />
      )}
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'none', color: 'neutral', sx: { zIndex: 1 } } }} // z-index 설정
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end" sx={{ zIndex: 2, border: 'none' }}>
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
    </>
  );
};

export default PostMenu;
