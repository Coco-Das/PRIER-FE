import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/utils/Header';

export const Layout = () => {
  const location = useLocation();

  const style: React.CSSProperties = {
    height: '100vh',
    overflowY: 'auto',
    boxSizing: 'border-box',
  };
  const hideHeaderPaths = ['/login', '/firstmain', '/', '/api/kakao/callback'];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div style={style}>
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};
