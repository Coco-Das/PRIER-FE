import { useCallback } from 'react';

const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // 한국 시간으로 변환
    const koreaOffset = 18 * 60; // 한국 시간대 UTC+9
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const koreaDate = new Date(utc + koreaOffset * 60000);

    const diffInMs = now.getTime() - koreaDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return `방금 전`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      // 날짜 포맷
      const year = koreaDate.getFullYear().toString().slice(-2); // 마지막 두 자리 연도
      const month = ('0' + (koreaDate.getMonth() + 1)).slice(-2); // 두 자리 월
      const day = ('0' + koreaDate.getDate()).slice(-2); // 두 자리 일

      // 시간 포맷
      const hours = koreaDate.getHours();
      const minutes = ('0' + koreaDate.getMinutes()).slice(-2); // 두 자리 분
      const period = hours >= 12 ? '오후' : '오전';
      const formattedHours = ('0' + (hours % 12 || 12)).slice(-2); // 12시간 포맷

      return `${year}.${month}.${day} ${period} ${formattedHours}:${minutes}`;
    }
  }, []);

  return formatDate;
};

export default useFormatDate;
