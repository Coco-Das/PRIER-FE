import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Button,
  ButtonText,
  SegmentedControlContainer,
  SegmentedControl,
  MenuItem,
  CategoryButtonsContainer,
  CategoryButton,
  Title,
  TopContainer,
  BottomContainer,
} from '../../pages/board/BoardStyles';
import SearchInput from './SearchInput';

const categoryLabels: { [key: string]: string } = {
  'it-news': 'IT 지식',
  chat: '잡담/일상',
  tech: '기술',
  internship: '인턴십/공모전',
  notice: '공지사항',
};

interface NavigationBarProps {
  activeCategory: string;
  activeFilter: string;
  handleCategoryClick: (category: string) => void;
  handleFilterClick: (filter: string) => void;
  title: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeCategory,
  activeFilter,
  handleCategoryClick,
  handleFilterClick,
  title,
}) => {
  const navigate = useNavigate();

  const handleNavClick = (category: string) => {
    if (activeFilter === 'likes' || activeFilter === 'myposts') {
      handleCategoryClick(category);
      navigate(`/board?category=${category}&filter=${activeFilter}`);
    } else {
      handleCategoryClick(category);
      handleFilterClick('all'); // 카테고리 변경 시 필터를 초기화
      navigate(`/board?category=${category}&filter=all`);
    }
  };

  const handleFilterNavClick = (filter: string) => {
    handleFilterClick(filter);
    navigate(`/board?category=${activeCategory}&filter=${filter}`);
  };

  return (
    <Navigation>
      <TopContainer>
        <Title>{title}</Title>
      </TopContainer>
      <BottomContainer>
        <SegmentedControlContainer>
          <SegmentedControl>
            {Object.keys(categoryLabels).map(category => (
              <MenuItem key={category} active={activeCategory === category} onClick={() => handleNavClick(category)}>
                {categoryLabels[category]}
              </MenuItem>
            ))}
          </SegmentedControl>
        </SegmentedControlContainer>
        <CategoryButtonsContainer>
          <CategoryButton active={activeFilter === 'all'} onClick={() => handleFilterNavClick('all')}>
            All
          </CategoryButton>
          <CategoryButton active={activeFilter === 'likes'} onClick={() => handleFilterNavClick('likes')}>
            Likes
          </CategoryButton>
          <CategoryButton active={activeFilter === 'myposts'} onClick={() => handleFilterNavClick('myposts')}>
            My Posts
          </CategoryButton>
        </CategoryButtonsContainer>
        <SearchInput />
        <Button as={Link} to="/CreateBoard">
          <ButtonText>새 글 작성하기</ButtonText>
        </Button>
      </BottomContainer>
    </Navigation>
  );
};

export default NavigationBar;
