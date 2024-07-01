import React, { useEffect } from 'react';
import '../src/styles/App.css';
import Routers from './routers/Router';
import { SendLog } from './services/UserApi';
function App() {
  useEffect(() => {
    // 페이지가 로드될 때 세션에 isReloading 값을 설정합니다.
    sessionStorage.setItem('isReloading', 'true');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeUnload = async (event: any) => {
      const isReloading = sessionStorage.getItem('isReloading') === 'true';

      // 세션 스토리지에서 isReloading 값을 확인하여 새로고침이 아닌 경우에만 서버에 시간을 보냅니다.
      if (!isReloading) {
        const leaveTime = new Date().toISOString();
        await SendLog(leaveTime);
      }

      // 새로고침 여부를 true로 설정
      sessionStorage.setItem('isReloading', 'true');

      // 기본 동작을 방지하는 설정 (필요에 따라 추가)
      event.preventDefault();
      event.returnValue = '';
    };

    const handleLoad = () => {
      // 페이지가 다시 로드될 때 isReloading 값을 false로 설정합니다.
      sessionStorage.setItem('isReloading', 'false');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
