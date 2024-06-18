import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const ListWrapper = styled.ul`
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  position: absolute;
  border-radius: 0px 0px 10px 10px;
  border: 1px solid #ffba6b;
  border-top: none;
  width: 100%;
`;

const List = styled.li`
  text-align: center;
  padding: 5px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;
interface DropDownProps {
  onSelect: (item: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ onSelect }) => {
  const items = ['배포 완료', '개발 중', '기획'];
  return (
    <ListWrapper>
      {items.map((item, index) => (
        <List key={index} onClick={() => onSelect(item)}>
          {item}
        </List>
      ))}
    </ListWrapper>
  );
};

DropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const Container = styled.div<{ $isDropdownView: boolean }>`
  background-color: #f7f7f7;
  height: 100%;
  width: 120px;
  border-radius: 10px;
  border: 1px solid #ffba6b;
  position: relative; /* relative로 설정하여 드롭다운의 위치를 조정 */
  ${({ $isDropdownView }) =>
    $isDropdownView &&
    css`
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
`;
const DropDownButton = styled.button`
  height: 100%;
  width: 100%;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

interface DropDownContainerProps {
  onSelect: (item: string) => void;
  select?: string;
}

export const DropDownContainer: React.FC<DropDownContainerProps> = ({ onSelect, select }) => {
  const [isDropdownView, setDropdownView] = useState(false);

  const [selectedItem, setSelectedItem] = useState('선택');

  useEffect(() => {
    if (select) {
      setSelectedItem(select);
    } else {
      setSelectedItem('선택');
    }
  }, [select]);

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setDropdownView(false);
    onSelect(item); //부모 컴포넌트로 전달
  };

  return (
    <Container onBlur={handleBlurContainer} $isDropdownView={isDropdownView}>
      <DropDownButton onClick={handleClickContainer}>
        {selectedItem}
        {isDropdownView ? '▲' : '▼'}
      </DropDownButton>
      {isDropdownView && <DropDown onSelect={handleSelectItem} />}
    </Container>
  );
};

DropDownContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  select: PropTypes.string,
};
