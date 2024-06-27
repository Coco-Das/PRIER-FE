import { useState } from 'react';

const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    paginatedData,
    totalPageCount: Math.ceil(data.length / itemsPerPage),
    handlePageChange,
    setPage,
  };
};

export default usePagination;
