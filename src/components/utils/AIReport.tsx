import { useEffect, useRef } from 'react';
import { useUserStore } from '../../states/user/UserStore';

const COLOR_MAP = ['#315AF1', '#28B381', '#FFBA6B', '#828282', '#828282'];
const DIRECT_MAP = [null, [-1, -1], [1.2, -1], [1, 1], [-1, 1]];

export default function AIReport() {
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
      $keyword.textContent = `"${keyword}"`;
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
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '300px',
      }}
      ref={canvasRef}
    ></div>
  );
}
