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
import { API_BASE_URL } from '../../const/TokenApi';
import DeleteAlert from '../board/DeleteAlert';

interface CommentMenuProps {
  commentId: number;
  postId: number;
  title: string;
  onEditClick: (commentId: number) => void;
  onDeleteSuccess: () => void;
  insidePostBox?: boolean;
  commentContent: string;
  fetchPost: () => void; // fetchPost 추가
  setSnackbar: (snackbar: { message: string; type: 'success' | 'error' } | null) => void; // 스낵바 상태 설정 함수
}

const CommentMenu: React.FC<CommentMenuProps> = ({
  commentId,
  postId,
  title,
  onEditClick,
  onDeleteSuccess,
  insidePostBox,
  commentContent,
  fetchPost,
  setSnackbar,
}) => {
  const [showAlert, setShowAlert] = React.useState(false);

  const handleDelete = async () => {
    try {
      await API_BASE_URL.delete(`/posts/${postId}/comment/${commentId}`);
      onDeleteSuccess();
      await fetchPost();
      setSnackbar({ message: '댓글이 삭제되었습니다.', type: 'error' });
    } catch (error) {
      console.error('Failed to delete the comment:', error);
      setSnackbar({ message: '댓글 삭제 중 오류가 발생했습니다.', type: 'error' });
    }
  };

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const truncatedContent = commentContent.length > 5 ? `${commentContent.slice(0, 5)}...` : commentContent;

  return (
    <>
      {showAlert && (
        <DeleteAlert
          message={`'${truncatedContent}' 댓글을 삭제하시겠습니까?`}
          onConfirm={handleDelete}
          onCancel={() => setShowAlert(false)}
          insidePostBox={insidePostBox}
        />
      )}
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'none', color: 'neutral', sx: { zIndex: 1 } } }}
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end" sx={{ zIndex: 2, border: 'none' }}>
          <MenuItem onClick={() => onEditClick(commentId)}>
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

export default CommentMenu;
