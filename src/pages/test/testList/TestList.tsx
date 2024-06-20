import React, { useState } from 'react';
import { FilterBtn, ListWrapper } from './TestListStyles';

function TestList() {
  const [filter, setFilter] = useState<'latest' | 'oldest' | 'active'>('latest');
  const handleFilterChange = (filter: 'latest' | 'oldest' | 'active') => {
    setFilter(filter);
  };
  return (
    <ListWrapper>
      <span className="ml-4 font-extrabold mt-3" style={{ wordBreak: 'break-word', color: '#315AF1' }}>
        누구의? 프로젝트
      </span>
      <div className="ml-5 mt-2" style={{ display: 'flex', gap: '15px', width: '90%', height: '100%' }}>
        <FilterBtn>최신순</FilterBtn>
        <FilterBtn>등록순</FilterBtn>
        <FilterBtn>진행중인 프로젝트만 보기</FilterBtn>
      </div>
    </ListWrapper>
  );
}

export default TestList;
