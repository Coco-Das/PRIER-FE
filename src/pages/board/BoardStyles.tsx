import styled, { css, keyframes } from 'styled-components';

// 전체 컨테이너 스타일
export const Container = styled.div`
  background: #f3f6fd;
  min-height: 1024px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 30px; /* 양 옆에 30px 공간 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 타이틀 스타일
export const Title = styled.div`
  color: #4188fe;
  text-align: left;
  font-size: 24px; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 600;
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
`;

// 네비게이션 스타일
export const Navigation = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-self: center; /* 가운데 정렬 */
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 버튼 스타일
export const Button = styled.div`
  background: #bb68fd;
  border-radius: 8px;
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-top: -10px;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
  &:hover {
    background-color: #cc9af5;
    color: #9723f6;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 버튼 텍스트 스타일
export const ButtonText = styled.div`
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
`;
// 세그먼트 컨트롤 컨테이너 스타일
export const SegmentedControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
  align-items: flex-start;
  justify-content: flex-start;
`;

// 세그먼트 컨트롤 스타일
export const SegmentedControl = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 46px;
  border-bottom: solid 1px;
  padding: 0 0px;
`;
// 카테고리 버튼 컨테이너 스타일
export const CategoryButtonsContainer = styled(SegmentedControlContainer)`
  display: flex;
  align-items: center;
`;

// 카테고리 버튼 스타일
export const CategoryButton = styled.div<{ active?: boolean; disabled?: boolean }>`
  background: ${props => (props.active ? '#4188fe' : 'transparent')};
  border-radius: 4px;
  height: 40px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${props => (props.active ? '#ffffff' : props.disabled ? '#d3d3d3' : '#000000')};
  font-weight: 500;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-left: 5px;

  &:hover {
    background: ${props => (props.disabled ? 'transparent' : '#d1e0fc')};
    color: ${props => (props.disabled ? '#d3d3d3' : '#4188fe')};
  }
`;

// 메뉴 아이템 스타일
interface MenuItemProps {
  active: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  padding: 1vh 1.1vh;
  cursor: pointer;
  background-color: transparent;
  border-bottom: ${props => (props.active ? '4px solid #000000' : '')};
  color: ${props => (props.active ? '#000000' : '#828282')};
  font-size: 15px;
  transition: all 0.3s;
  margin-top: 4px;
  &:hover {
    color: #000000;
  }
`;
const huerotate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

export const BackgroundContainer = styled.div<{ isActive?: boolean }>`
  position: relative;
  border-radius: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  transition: transform 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 21px;
    border: 2px solid transparent;
    background-clip: border-box;
    z-index: -1;
    display: none; /* 기본적으로 숨기기 */
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        transform: scale(1.02); /* 클릭 상태가 아닐 때는 호버 시 커지도록 설정 */
        &::before {
          display: block; /* 호버 시 보이게 */
          background-image: linear-gradient(45deg, #315af1, #23be87, #773cd1);
          filter: hue-rotate(0deg);
          animation: ${huerotate} 3s infinite linear;
        }
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      transform: scale(1); /* 클릭 상태일 때는 원래 크기로 유지 */
      &::before {
        display: none; /* 클릭 상태일 때 배경 숨기기 */
      }
    `}
`;

export const PostListPostBox = styled.div<{ category?: string }>`
  background: ${props => (props.category === 'NOTICE' ? '#e1f9f0' : '#ffffff')};
  padding: 1vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  border-radius: 20px;
  z-index: 0;
  min-height: 150px; // 최소 높이 설정
`;
// 기존 스타일 유지하면서 필요한 스타일 추가
export const PostBox = styled.div<{ category?: string }>`
  background: ${props => (props.category === 'NOTICE' ? '#e1f9f0' : '#ffffff')};
  border: none;
  padding: 1vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center; /* 가운데 정렬 */
  border-radius: 15px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Avatar = styled.div<{ category?: string }>`
  background: #f7f7f7;
  border-radius: 1000px;
  width: 50.58px;
  height: 50.58px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const AvatarImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Author = styled.div<{ category?: string }>`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
  cursor: pointer;
`;

export const TimeViews = styled.div`
  color: #828282;
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
`;

export const ContentContainer = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  margin-top: 10px;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: flex-start;
`;

export const StyledImage = styled.img<{ widthRatio: number; heightRatio: number; category?: string }>`
  border-radius: 10px;
  width: ${props => (props.widthRatio > props.heightRatio ? 'auto' : '400px')};
  height: ${props => (props.widthRatio > props.heightRatio ? 'auto' : 'auto')};
  max-width: 100%;
  max-height: 100%;
  margin-top: 10px;
  object-fit: cover;
  background: ${props => (props.category === 'Notice' ? '#e1f9f0' : '#ffffff')};
`;
export const Image = styled.img<{ category?: string }>`
  border-radius: 10px;
  width: 500px;
  height: auto; /* 최대 높이 설정 */
  margin-top: 10px;
  object-fit: cover;
  background: ${props => (props.category === 'Notice' ? '#e1f9f0' : '#ffffff')}; // 이미지 배경색 설정
`;

export const HoverButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: none;
  font-size: 12px;
  width: 70px;
  ${ImageContainer}:hover & {
    display: block;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  z-index: 0;
`;
export const ListLikesContainer = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin-bottom: 10px;
  z-index: 1;
`;

export const Likes = styled.div`
  margin-right: 5px;
  z-index: 0;
`;

export const LikeButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease-in-out;
  z-index: 0;

  &:active {
    transform: scale(0.9);
  }
`;

export const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const NoPostsMessage = styled.div`
  font-size: 16px;
  color: #828282;
  text-align: center;
  margin-top: 20px;
`;

// 기존 스타일들을 유지하면서 새로운 스타일 추가
export const PostDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start;
  gap: 20px; /* 추가: 콘텐츠와 댓글 컨테이너 사이의 간격 */
`;

export const PostContentContainer = styled(PostBox)`
  width: 100%;
  max-width: 730px;
  padding: 3vh 2vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => (props.category === 'NOTICE' ? '#e1f9f0' : '#ffffff')};
  height: 100%;
  min-height: 200px;
  border-radius: 20px;

  align-self: start;
`;

export const LikeBackContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentsContainer = styled(PostBox)`
  width: 100%;
  max-width: 430px;
  align-self: flex-start;
  padding: 3vh 2vh;
  margin-top: 0; /* 추가: 상단 마진 제거 */
`;

export const Backto = styled.img`
  width: 25px;
  height: 15px;
  margin-top: 5px;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  align-self: start;
  margin-top: 1px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const CommentAuthor = styled(Author)`
  font-size: 14px;
  margin-bottom: 2px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #000;
  width: 300px;
  word-wrap: break-word; /* 줄 바꿈 설정 */
  white-space: pre-wrap; /* 공백과 줄바꿈 문자 유지 */
  overflow-wrap: break-word; /* 긴 단어 줄 바꿈 */
  word-break: break-word; /* 단어가 너무 길 경우 줄 바꿈 */
`;

export const CommentCreatedAt = styled(TimeViews)`
  font-size: 12px;
  color: #828282;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid #ccc;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 14px;
  margin-top: 10px;
`;

export const CommentButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  height: 38px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  cursor: ${props => (props.disabled ? '' : '#pointer')};
  &:hover {
    background-color: ${props => (props.disabled ? '#fff' : '#d1e0fc')};
    color: ${props => (props.disabled ? '#ccc' : '#4188fe')};
  }
`;

export const FilterBtn = styled.button<{ $isActive: boolean }>`
  background-color: ${props => (props.$isActive ? '#315af1' : 'white')};
  color: ${props => (props.$isActive ? 'white' : 'black')};
  height: 100%;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 10px;
  &:hover {
    background-color: ${props => (props.$isActive ? '#315af1' : '#e0e0e0')};
  }
`;
