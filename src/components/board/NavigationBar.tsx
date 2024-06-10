import React from 'react';
import { Link } from 'react-router-dom';
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
  ITNews: 'IT 지식',
  Daily: '잡담/일상',
  Tech: '기술',
  InternShip: '인턴십/공모전',
  Notice: '공지사항',
};

interface NavigationBarProps {
  activeCategory: string;
  activeFilter: string;
  handleCategoryClick: (category: string) => void;
  handleFilterClick: (filter: string) => void;
  title: string;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeCategory,
  activeFilter,
  handleCategoryClick,
  handleFilterClick,
  title,
  searchTerm,
  handleSearchChange,
}) => {
  const isNoticeCategory = activeCategory === 'Notice';

  return (
    <Navigation>
      <TopContainer>
        <Title>{title}</Title>
      </TopContainer>
      <BottomContainer>
        <SegmentedControlContainer>
          <SegmentedControl>
            {Object.keys(categoryLabels).map(category => (
              <MenuItem
                key={category}
                active={activeCategory === category}
                onClick={() => {
                  if (activeFilter === 'myposts' && category === 'Notice') {
                    handleFilterClick('all');
                  }
                  handleCategoryClick(category);
                }}
              >
                {categoryLabels[category]}
              </MenuItem>
            ))}
          </SegmentedControl>
        </SegmentedControlContainer>
        <CategoryButtonsContainer>
          <CategoryButton active={activeFilter === 'all'} onClick={() => handleFilterClick('all')}>
            All
          </CategoryButton>
          <CategoryButton active={activeFilter === 'likes'} onClick={() => handleFilterClick('likes')}>
            Likes
          </CategoryButton>
          <CategoryButton
            active={activeFilter === 'myposts'}
            onClick={() => !isNoticeCategory && handleFilterClick('myposts')}
            disabled={isNoticeCategory}
            title={isNoticeCategory ? '공지사항에서는 My Posts를 사용할 수 없습니다.' : ''}
          >
            My Posts
          </CategoryButton>
        </CategoryButtonsContainer>
        <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <Button as={Link} to="/CreateBoard">
          <ButtonText>새 글 작성하기</ButtonText>
        </Button>
      </BottomContainer>
    </Navigation>
  );
};

export default NavigationBar;
