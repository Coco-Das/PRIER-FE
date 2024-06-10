import React from 'react';
import { PostDetailContainer, PostContentContainer, CommentsContainer } from './BoardStyles';
import { posts as initialPosts } from '../../states/board/BoardStore';
import { comments as initialComments } from '../../states/board/ChatStore';

interface PostDetailProps {
  postId: number;
  onBackToList: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onBackToList }) => {
  const post = initialPosts.find(post => post.boardId === postId);
  const postComments = initialComments.filter(comment => comment.boardId === postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <PostDetailContainer>
      <button onClick={onBackToList}>Back to List</button>
      <PostContentContainer>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </PostContentContainer>
      <CommentsContainer>
        <h2>Comments</h2>
        {postComments.map(comment => (
          <div key={comment.commentId}>
            <p>{comment.content}</p>
            <small>{comment.createdAt}</small>
          </div>
        ))}
      </CommentsContainer>
    </PostDetailContainer>
  );
};

export default PostDetail;
