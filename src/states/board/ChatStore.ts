// 댓글 인터페이스 정의
export interface Comment {
  commentId: number;
  boardId: number;
  memberId: number;
  content: string;
  createdAt: string;
}

// 랜덤 댓글 생성 함수
const generateRandomComments = (numComments: number, boardIds: number[]): Comment[] => {
  const comments: Comment[] = [];
  let commentId = 1;

  for (let i = 0; i < numComments; i++) {
    const boardId = boardIds[Math.floor(Math.random() * boardIds.length)];
    comments.push({
      commentId: commentId++,
      boardId: boardId,
      memberId: Math.ceil(Math.random() * 10),
      content: `댓글 내용 ${i + 1}`,
      createdAt: new Date().toISOString(),
    });
  }

  return comments;
};

// 게시물 ID 목록
const boardIds = Array.from({ length: 25 }, (_, i) => i + 1);

// 각 게시물에 하나 이상의 댓글이 있도록 댓글 수를 게시물 수의 2배로 설정
export const comments: Comment[] = generateRandomComments(50, boardIds);
