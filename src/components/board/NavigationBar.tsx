import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation,
  Button,
  ButtonText,
  SegmentedControlContainer,
  SegmentedControl,
  MenuItem,
  CategoryButton,
  Title,
  TopContainer,
  BottomContainer,
  FilterBtn,
} from '../../pages/board/BoardStyles';
import SearchInput from './SearchInput';
import styled from 'styled-components';

const categoryLabels: { [key: string]: string } = {
  ALL: '전체',
  ITNEWS: 'IT 소식',
  DAILY: '잡담/일상',
  TECH: '기술',
  INTERNSHIP: '인턴십/공모전',
  NOTICE: '공지사항',
};

interface NavigationBarProps {
  activeCategory: string;
  activeFilter: string;
  handleCategoryClick: (category: string) => void;
  handleFilterClick: (filter: string) => void;
  title: string;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeSort: string;
  handleSortClick: (sort: string) => void;
  setTitle: (title: string) => void;
}

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 3;
  margin-left: 0;
  ${Dropdown}:hover & {
    display: block;
  }
`;

const DropdownOption = styled.div<{ active?: boolean }>`
  color: ${props => (props.active ? '#000' : '#828282')};
  padding: 10px 0;
  text-decoration: none;
  display: block;
  font-size: 15px;
  text-align: center; /* 추가된 부분 */

  background-color: ${props => (props.active ? '#E6E6E6' : 'white')};
  &:hover {
    background-color: #e1f9f0;
    color: #426e5e;
  }

  &:active {
    background: #24be87;
    color: #ffff;
  }
`;

const CustomCategoryButton = styled(CategoryButton)`
  background: ${props => (props.active ? '#24be87' : 'transparent')};
  color: ${props => (props.active ? '#ffff' : '#000')};
  margin: 0;
  width: 100px;
  &:hover {
    background: #d9f2e9;
    color: #426e5e;
  }
  &:active {
    background: #24be87;
    color: #ffff;
  }
`;
const NavigationBar: React.FC<NavigationBarProps> = ({
  activeCategory,
  activeFilter,
  handleCategoryClick,
  handleFilterClick,
  title,
  searchTerm,
  handleSearchChange,
  activeSort,
  handleSortClick,
  setTitle,
}) => {
  const [selectedActivity, setSelectedActivity] = useState('내 활동');

  const handleActivityClick = (activity: string) => {
    setSelectedActivity(activity);
    handleFilterClick(activity === '좋아요한 글' ? 'likes' : 'myposts');
    setTitle(`내가 ${activity}`);
  };

  const handleBoardClick = () => {
    setSelectedActivity('내 활동');
    handleFilterClick('all');
    setTitle('Community');
  };

  const handleTitleClick = () => {
    if (title === '내가 좋아요한 글') {
      handleFilterClick('likes');
      setTitle('내가 좋아요한 글');
    } else if (title === '내가 작성한 글') {
      handleFilterClick('myposts');
      setTitle('내가 작성한 글');
    } else {
      handleFilterClick('all');
      setTitle('Community');
    }
  };

  const handleCategorySelection = (category: string) => {
    handleCategoryClick(category);
    if (title === '내가 좋아요한 글') {
      handleFilterClick('likes');
    } else if (title === '내가 작성한 글') {
      handleFilterClick('myposts');
    } else {
      handleFilterClick('all');
    }
  };

  return (
    <Navigation>
      <TopContainer>
        <Title onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          {title}
        </Title>
      </TopContainer>
      <BottomContainer>
        <SegmentedControlContainer>
          <SegmentedControl>
            {Object.keys(categoryLabels).map(category => (
              <MenuItem
                key={category}
                active={activeCategory === category}
                onClick={() => handleCategorySelection(category)}
              >
                {categoryLabels[category]}
              </MenuItem>
            ))}
          </SegmentedControl>
        </SegmentedControlContainer>
        <Button as={Link} to="/CreateBoard">
          새 글 작성하기
        </Button>
      </BottomContainer>
      <div className="tabs flex flex-row gap-2 items-start justify-start relative">
        <FilterBtn $isActive={activeSort === 'latest'} onClick={() => handleSortClick('latest')}>
          최신순
        </FilterBtn>
        <FilterBtn $isActive={activeSort === 'registration'} onClick={() => handleSortClick('registration')}>
          등록순
        </FilterBtn>
        <FilterBtn $isActive={activeSort === 'popular'} onClick={() => handleSortClick('popular')}>
          인기순
        </FilterBtn>
        <FilterBtn $isActive={activeSort === 'views'} onClick={() => handleSortClick('views')}>
          조회순
        </FilterBtn>
        <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <div className="flex gap-2 ml-auto">
          <CustomCategoryButton active={activeFilter === 'all'} onClick={handleBoardClick} style={{ width: '70px' }}>
            게시판
          </CustomCategoryButton>
          <Dropdown>
            <CustomCategoryButton active={activeFilter === 'likes' || activeFilter === 'myposts'}>
              {selectedActivity}
            </CustomCategoryButton>
            <DropdownContent>
              <DropdownOption active={activeFilter === 'likes'} onClick={() => handleActivityClick('좋아요한 글')}>
                좋아요한 글
              </DropdownOption>
              <DropdownOption active={activeFilter === 'myposts'} onClick={() => handleActivityClick('작성한 글')}>
                작성한 글
              </DropdownOption>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </Navigation>
  );
};

export default NavigationBar;
