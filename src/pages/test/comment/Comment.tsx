import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import PropTypes from 'prop-types';
import { Button, CommentDiv, CommentWrapper, SidebarContainer } from './CommentStyles';

//댓글 불러옴 get
//댓글 등록 post
interface CommentProps {
  show: boolean;
  onMouseLeave?: () => void;
}

interface CommentData {
  commentId: number;
  content: string;
  isMine: boolean;
  score: number;
  userId: number;
  userName: string;
}

export const Comment: React.FC<CommentProps> = ({ show, onMouseLeave }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }
  }, [projectId, setProjectId]);

  //댓글 불러오기
  const handleGetComments = async () => {
    if (!projectId) return;
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}/comment`);
      const Data = response.data;
      setComments(Data);
      console.log(comments);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [show]);

  return (
    <SidebarContainer show={show}>
      <div style={{ width: '100%', height: '5%', display: 'flex' }}>
        <Button>전체 댓글</Button>
        <Button style={{}}>나의 댓글</Button>
      </div>
      <CommentDiv style={{ height: '95%' }}>
        {comments.map(comment => (
          <CommentWrapper key={comment.commentId}>
            <p>
              <strong>{comment.userName}</strong>
            </p>
            <p>{comment.content}</p>
            <p>Score: {comment.score}</p>
          </CommentWrapper>
        ))}
      </CommentDiv>
    </SidebarContainer>
  );
};

Comment.propTypes = {
  show: PropTypes.bool.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
