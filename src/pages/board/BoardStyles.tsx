import styled from 'styled-components';

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
  max-width: 1000px;
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
  align-items: center; /* 가운데 정렬 */
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
export const CategoryButton = styled.div<{ active?: boolean }>`
  background: ${props => (props.active ? '#4188fe' : 'transparent')};
  border-radius: 4px;
  height: 40px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  font-weight: 500;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background: #d1e0fc;
    color: #4188fe;
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

// 포스트 박스 스타일
export const PostBox = styled.div`
  background: #ffffff;
  border-radius: 15px;
  width: 100%;
  max-width: 1000px;
  padding: 1vh;
  margin-bottom: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center; /* 가운데 정렬 */
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Avatar = styled.div`
  background: #f7f7f7;
  border-radius: 1000px;
  width: 50.58px;
  height: 50.58px;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Author = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  font-weight: 700;
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

export const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  max-width: 760px;
  height: auto;
  margin-top: 10px;
  object-fit: cover;
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
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const PostContentContainer = styled.div`
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const CommentsContainer = styled.div`
  width: 100%;
  max-width: 280px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

// 다른 기존 스타일들도 유지합니다.
