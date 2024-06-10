// Member 인터페이스 정의
export interface Member {
  memberId: number;
  name: string;
  profilePicture: string;
}

// 멤버 데이터 생성
export const members: Member[] = [
  { memberId: 1, name: 'Alice', profilePicture: 'https://via.placeholder.com/40?text=Alice' },
  { memberId: 2, name: 'Bob', profilePicture: 'https://via.placeholder.com/40?text=Bob' },
  { memberId: 3, name: 'Charlie', profilePicture: 'https://via.placeholder.com/40?text=Charlie' },
  // 추가 멤버 정의
];
