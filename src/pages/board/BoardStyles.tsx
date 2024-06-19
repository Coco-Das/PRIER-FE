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
  font-size: 28px;
  line-height: 140%;
  font-weight: 800;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1000px;
  align-self: center; /* 가운데 정렬 */
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
  background: #e1f9f0;
  border-radius: 8px;
  padding: 4px;
  gap: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 46px;
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
  padding: 1vh;
  cursor: pointer;
  background-color: ${props => (props.active ? '#ffffff' : 'transparent')};
  border-radius: 5px;
  &:hover {
    background-color: #d1e0fc;
  }
  &:active {
    background-color: #ffffff;
  }
  font-size: 15px;
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
    isActive &&
    css`
      transform: scale(1.02);
      &::before {
        display: block; /* 활성화 시 보이게 */
        background-image: linear-gradient(45deg, #315af1, #23be87, #773cd1);
        filter: hue-rotate(0deg);
        animation: ${huerotate} 3s infinite linear;
      }

      &:hover {
        transform: scale(1.02); /* 클릭 상태일 때는 호버 시 더 커지지 않도록 유지 */
      }
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        transform: scale(1.02); /* 클릭 상태가 아닐 때는 호버 시 커지도록 설정 */
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

export const CreatedAt = styled.div`
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
`;

export const Image = styled.img<{ category?: string }>`
  border-radius: 10px;
  width: 100%;
  max-width: 760px;
  height: auto;
  max-height: 300px; /* 최대 높이 설정 */
  margin-top: 10px;
  object-fit: cover;
  background: ${props => (props.category === 'Notice' ? '#e1f9f0' : '#ffffff')}; // 이미지 배경색 설정
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
`;

export const Likes = styled.div`
  margin-right: 5px;
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
  width: 24px;
  height: 24px;
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
  margin-top: 7px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const CommentAuthor = styled(Author)`
  font-size: 14px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #000;
`;

export const CommentCreatedAt = styled(CreatedAt)`
  font-size: 12px;
  color: #828282;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

export const CommentButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
  background: #4188fe;
  border-radius: 4px;
  height: 40px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background: #d1e0fc;
    color: #4188fe;
  }
`;
