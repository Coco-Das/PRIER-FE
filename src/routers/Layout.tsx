import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/utils/Header';

export const Layout = () => {
  const location = useLocation();

  const style = {
    height: '100vh',
    overflow: 'scroll',
  };
  const showHeader = location.pathname !== '/login';

  return (
    <div style={style}>
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};
