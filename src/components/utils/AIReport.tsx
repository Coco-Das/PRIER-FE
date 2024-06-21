import { useEffect, useRef } from 'react';
import { useUserStore } from '../../states/user/UserStore';
import { AIBestText, StyledGraphIcon, TitleText } from '../../pages/user/mypage/MyPageStyle';
import { SmallText } from '../user/UserStyle';
import { useLocation } from 'react-router-dom';

const COLOR_MAP = ['#315AF1', '#28B381', '#FFBA6B', '#828282', '#828282'];
const DIRECT_MAP = [null, [-1, -1], [1.2, -1], [1, 1], [-1, 1]];

export default function AIReport() {
  const { pathname } = useLocation();
  const userProfile = useUserStore(state => state.userProfile);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    let $child: HTMLDivElement | null = null;
    const totalKeywords = userProfile.nowProjectKeywordList?.length || 0;

    userProfile.nowProjectKeywordList?.forEach((keyword, index) => {
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
  }, [canvasRef.current, userProfile.nowProjectKeywordList]);

  return (
    <>
      <div className="flex-col items-start w-full">
        <span className="flex items-center">
          <TitleText>AI 분석 Report</TitleText>
          <StyledGraphIcon />
        </span>
        <AIBestText>&quot; {userProfile.nowProjectKeywordList[0].content} &quot;</AIBestText>
        <SmallText>
          &quot; {userProfile.nowProjectKeywordList[0].content} &quot; 라는 단어가 가장 많이 응답되었습니다.
        </SmallText>
      </div>
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '300px',
        }}
        ref={canvasRef}
      ></div>
      {pathname === '/mypage' ? (
        <SmallText>
          &quot; {userProfile.nowProjectKeywordList[0].content}&quot; 라는 키워드가 &nbsp;
          {userProfile.nowProjectKeywordList[0].count}회 제출되었습니다. &quot;
          {userProfile.nowProjectKeywordList[1].content} &quot;가 {userProfile.nowProjectKeywordList[1].count}
          회, 그 외로 &quot;{userProfile.nowProjectKeywordList[2].content}&quot; 등의 키워드가 제출되어 당신의
          프로젝트를 대표했습니다.
        </SmallText>
      ) : (
        <SmallText>
          {userProfile.nowProjectKeywordList[0].content}의 키워드가 {userProfile.nowProjectKeywordList[0].count}회
          제출되었습니다. {userProfile.nowProjectKeywordList[1].content}가 {userProfile.nowProjectKeywordList[1].count}
          회, 그 외로{userProfile.nowProjectKeywordList[2].content},{userProfile.nowProjectKeywordList[3].content} 등의
          키워드가 제출되어 당신의 프로젝트를 대표했습니다.
        </SmallText>
      )}
    </>
  );
}
