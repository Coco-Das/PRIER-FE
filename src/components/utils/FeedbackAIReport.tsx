import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { AIBestText, StyledGraphIcon, TitleText } from '../../pages/user/mypage/MyPageStyle';

const COLOR_MAP = ['#315AF1', '#28B381', '#FFBA6B', '#828282', '#828282'];
const DIRECT_MAP = [null, [-1, -1], [1.2, -1], [1, 1], [-1, 1]];
const AIOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20rem;
  border: none;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #828282;
  font-size: 18px;
  z-index: 3;
`;

interface Keyword {
  content: string;
  count: number;
}

interface AIReportProps {
  keyWordResponseDtoList: Keyword[];
}
const SmallText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
`;

const FeedbackAIReport: React.FC<AIReportProps> = ({ keyWordResponseDtoList }) => {
  const { pathname } = useLocation();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    let $child: HTMLDivElement | null = null;
    const totalKeywords = keyWordResponseDtoList.length;

    keyWordResponseDtoList.forEach((keyword, index) => {
      if (!canvasRef.current) {
        return;
      }

      const count = totalKeywords - index;
      const $keyword = document.createElement('div');
      $keyword.textContent = `"${keyword.content}"`;
      $keyword.style.fontSize = `${16 + 8 * (count / 5)}px`; // count에 따라 글꼴 크기 조정
      $keyword.style.color = COLOR_MAP[index % COLOR_MAP.length] ?? '';
      $keyword.style.position = 'absolute';

      const { width, height } = canvasRef.current.getBoundingClientRect();
      $keyword.style.top = `${height / 2}px`;
      $keyword.style.left = `${width / 2}px`;
      $keyword.style.transform = 'translate(-50%, -50%)';

      if ($child) {
        const { width: iw, height: ih } = $child.getBoundingClientRect();
        const DIRECT = DIRECT_MAP[index % DIRECT_MAP.length];

        if (DIRECT) {
          $keyword.style.top = `${height / 2 + ih * DIRECT[1]}px`;
          $keyword.style.left = `${width / 2 + iw * DIRECT[0]}px`;
        }
      }

      $child = $keyword;
      canvasRef.current.append($keyword);
    });

    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [canvasRef.current, keyWordResponseDtoList]);

  const getDefaultContent = (index: number) => {
    const defaults = ['새롭다', '좋다', '유용하다'];
    return defaults[index] || '';
  };

  const getDefaultCount = (index: number) => {
    const defaults = [3, 2, 1];
    return defaults[index] || 1;
  };

  return (
    <>
      {keyWordResponseDtoList && keyWordResponseDtoList.length > 2 ? (
        <>
          <div className="flex-col items-start w-full">
            <span className="flex items-center">
              <TitleText>AI 분석 Report</TitleText>
              <StyledGraphIcon />
            </span>

            <AIBestText>&quot; {keyWordResponseDtoList[0]?.content || ''} &quot;</AIBestText>
            <SmallText>
              &quot; {keyWordResponseDtoList[0]?.content || ''} &quot; 라는 단어가 가장 많이 응답되었습니다.
            </SmallText>
          </div>
          <div className="relative w-[400px] h-[300px]" ref={canvasRef}></div>
          {pathname === '/mypage' ? (
            <SmallText>
              &quot; {keyWordResponseDtoList[0]?.content || ''}&quot; 라는 키워드가 &nbsp;
              {keyWordResponseDtoList[0]?.count || 0}회 제출되었습니다. &quot;
              {keyWordResponseDtoList[1]?.content || ''} &quot;가 {keyWordResponseDtoList[1]?.count || 0}회, 그 외로
              &quot;
              {keyWordResponseDtoList[2]?.content || ''}&quot; 등의 키워드가 제출되어 당신의 프로젝트를 대표했습니다.
            </SmallText>
          ) : (
            <SmallText>
              {keyWordResponseDtoList[0]?.content || ''}의 키워드가 {keyWordResponseDtoList[0]?.count || 0}회
              제출되었습니다. {keyWordResponseDtoList[1]?.content || ''}가 {keyWordResponseDtoList[1]?.count || 0}회, 그
              외로 {keyWordResponseDtoList[2]?.content || ''}, {keyWordResponseDtoList[3]?.content || ''} 등의 키워드가
              제출되어 당신의 프로젝트를 대표했습니다.
            </SmallText>
          )}
        </>
      ) : (
        <>
          <div className="flex-col items-start w-full relative h-[23rem]">
            <span className="flex items-center w-full ">
              <TitleText>AI 분석 Report</TitleText>
              <StyledGraphIcon />
            </span>
            <SmallText>
              &quot; {keyWordResponseDtoList[0]?.content || getDefaultContent(0)} &quot; 라는 키워드가 &nbsp;{' '}
              {keyWordResponseDtoList[0]?.count || getDefaultCount(0)}회 제출되었습니다. &quot;{' '}
              {keyWordResponseDtoList[1]?.content || getDefaultContent(1)} &quot;가{' '}
              {keyWordResponseDtoList[1]?.count || getDefaultCount(1)} 회, 그 외로 &quot;
              {keyWordResponseDtoList[2]?.content || getDefaultContent(2)} &quot; 등의 키워드가 제출되어 당신의
              프로젝트를 대표했습니다.
            </SmallText>
            <AIOverlay>상세응답의 개수가 부족합니다</AIOverlay>
          </div>
          <div className="relative w-[400px] h-[300px]"></div>
        </>
      )}
    </>
  );
};

export default FeedbackAIReport;
