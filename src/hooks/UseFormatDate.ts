import { useCallback } from 'react';

const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);

    // 날짜 포맷
    const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리 연도
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 두 자리 월
    const day = ('0' + date.getDate()).slice(-2); // 두 자리 일

    // 시간 포맷
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // 두 자리 분
    const seconds = ('0' + date.getSeconds()).slice(-2); // 두 자리 초
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = ('0' + (hours % 12 || 12)).slice(-2); // 12시간 포맷

    return `${year}.${month}.${day} ${period} ${formattedHours}:${minutes}:${seconds}`;
  }, []);

  return formatDate;
};

export default useFormatDate;
