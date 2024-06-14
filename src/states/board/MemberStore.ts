// Member 인터페이스 정의
export interface Member {
  userId: number;
  nickname: string;
  profilePicture: string;
}

// 멤버 데이터 생성
export const members: Member[] = [
  { userId: 1, nickname: '이인지', profilePicture: 'https://via.placeholder.com/40?text=Alice' },
  { userId: 2, nickname: 'Bob', profilePicture: 'https://via.placeholder.com/40?text=Bob' },
  { userId: 3, nickname: 'Charlie', profilePicture: 'https://via.placeholder.com/40?text=Charlie' },
  // 추가 멤버 정의
];
