import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../../const/TokenApi';
import PropTypes from 'prop-types';
import {
  Button,
  CommentDiv,
  CommentWrapper,
  DeleteButton,
  EditButton,
  ProfileImg,
  SidebarContainer,
} from './CommentStyles';
import StarRating from '../../../components/utils/StarRating';
import SidebarAlert from '../../../components/utils/SidebarAlert';

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
  profileUrl: string;
}

export const Comment: React.FC<CommentProps> = ({ show, onMouseLeave }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const storedUserId = localStorage.getItem('userId');
  const USER_ID = storedUserId ? Number(storedUserId) : null;
  const commentDivRef = useRef<HTMLDivElement>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [editingScore, setEditingScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 높이 조정
    }
  }, [editingContent]); // editingContent가 변경될 때마다 실행

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

  const filteredComments = comments.filter(comment => (activeTab === 'all' ? true : comment.userId === USER_ID));

  const handleTabChange = (tab: 'all' | 'mine') => {
    setActiveTab(tab);
    if (commentDivRef.current) {
      commentDivRef.current.scrollTop = 0;
    }
  };

  const handleEditClick = (comment: CommentData) => {
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.content);
    setEditingScore(comment.score);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // 초기화
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 높이 조정
      }
    }, 0); // 높이 조정을 강제.
    console.log(editingCommentId);
  };

  const handleSaveClick = async () => {
    if (!projectId || editingCommentId === null) return;
    const commentId = editingCommentId;
    const JsonData = { comment: editingContent, score: editingScore };
    console.log(JsonData);
    try {
      await API_BASE_URL.put(`/projects/${projectId}/comment/${commentId}`, JsonData);
      setEditingCommentId(null);
      handleGetComments(); // 댓글 목록 갱신
    } catch (error) {
      console.error('에러:', error);
    }
  };
  const handleDeleteClick = async (commentId: number) => {
    setCommentToDelete(commentId);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (!projectId || commentToDelete === null) return;
    const commentId = commentToDelete;
    try {
      await API_BASE_URL.delete(`/projects/${projectId}/comment/${commentId}`);
      setCommentToDelete(null);
      setShowAlert(false);
      handleGetComments(); // 댓글 목록 갱신
      console.log('삭제 성공');
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };
  const handleRatingChange = (newScore: number) => {
    setEditingScore(newScore);
  };

  return (
    <SidebarContainer $show={show} onMouseLeave={onMouseLeave}>
      <div style={{ width: '100%', height: '5%', display: 'flex', gap: '15px', paddingLeft: '20px' }}>
        <Button
          onClick={() => handleTabChange('all')}
          style={{
            backgroundColor: activeTab === 'all' ? '#315af1' : 'white',
            color: activeTab === 'all' ? 'white' : '#315af1',
          }}
        >
          전체 댓글
        </Button>
        <Button
          onClick={() => handleTabChange('mine')}
          style={{
            backgroundColor: activeTab === 'mine' ? '#315af1' : 'white',
            color: activeTab === 'mine' ? 'white' : '#315af1',
          }}
        >
          나의 댓글
        </Button>
      </div>
      <CommentDiv style={{ height: '95%' }} ref={commentDivRef}>
        {filteredComments.length === 0 ? (
          <div
            style={{
              color: '#888',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>작성된 댓글이 없습니다</p>
          </div>
        ) : (
          filteredComments.map(comment => (
            <CommentWrapper key={comment.commentId}>
              {USER_ID === comment.userId && (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    gap: '10px',
                  }}
                >
                  {editingCommentId === comment.commentId ? (
                    <>
                      <button onClick={handleSaveClick}>저장</button>
                      <button onClick={() => setEditingCommentId(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <EditButton onClick={() => handleEditClick(comment)}>수정</EditButton>
                      <DeleteButton onClick={() => handleDeleteClick(comment.commentId)}>삭제</DeleteButton>
                    </>
                  )}
                </div>
              )}
              {editingCommentId === comment.commentId ? (
                <textarea
                  ref={textareaRef}
                  value={editingContent}
                  onChange={e => setEditingContent(e.target.value)}
                  style={{ outline: 'none', resize: 'none', overflow: 'hidden', width: '100%' }}
                />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }}></span>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ProfileImg src={comment.profileUrl}></ProfileImg>
                <strong className="ml-1">{comment.userName}</strong>
                {editingCommentId === comment.commentId ? (
                  <StarRating initialScore={editingScore} onRatingChange={handleRatingChange} />
                ) : (
                  <StarRating initialScore={comment.score} readOnly={true} onHover={false} />
                )}
              </div>
            </CommentWrapper>
          ))
        )}
      </CommentDiv>
      {showAlert && (
        <SidebarAlert
          message="삭제하시겠습니까?"
          onCancel={() => {
            setShowAlert(false);
            setCommentToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </SidebarContainer>
  );
};

Comment.propTypes = {
  show: PropTypes.bool.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
