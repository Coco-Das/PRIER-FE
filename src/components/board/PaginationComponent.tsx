import React from 'react';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const PaginationWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

interface PaginationComponentProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, page, onChange }) => (
  <PaginationWrapper>
    <Pagination count={count} page={page} onChange={onChange} color="primary" size="large" />
  </PaginationWrapper>
);

export default PaginationComponent;
