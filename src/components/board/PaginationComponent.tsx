import React from 'react';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const PaginationWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PaginationComponent = () => (
  <PaginationWrapper>
    <Pagination count={5} color="primary" size="large" />
  </PaginationWrapper>
);

export default PaginationComponent;
