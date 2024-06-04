import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import Main from '../pages/main/Main';
import FirstMain from '../pages/firstmain/FirstMain';
import Login from '../pages/user/login/Login';
import KakaoLoading from '../pages/user/auth/KakaoLoading';
import Store from '../pages/user/store/Store';
import MyPage from '../pages/user/mypage/MyPage';
import Feedback from '../pages/test/feedback/Feedback';
import ResponseTest from '../pages/test/responseTest/ResponseTest';
import TestList from '../pages/test/testList/TestList';
import CreateBoard from '../pages/board/CreateBoard';
import MyBoard from '../pages/board/MyBoard';
import Board from '../pages/board/Board';
import { CreateTest } from '../pages/test/createTest/CreateTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <FirstMain /> },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/firstmain',
        element: <FirstMain />,
      },
      { path: '/login', element: <Login /> },
      { path: '/kakao/callback', element: <KakaoLoading /> },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/createtest',
        element: <CreateTest />,
      },
      {
        path: '/feedback',
        element: <Feedback />,
      },
      {
        path: '/responsetest',
        element: <ResponseTest />,
      },
      {
        path: '/testlist',
        element: <TestList />,
      },
      {
        path: '/createBoard',
        element: <CreateBoard />,
      },
      {
        path: '/Board',
        element: <Board />,
      },
      {
        path: '/MyBoard',
        element: <MyBoard />,
      },
    ],
  },
]);
const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
