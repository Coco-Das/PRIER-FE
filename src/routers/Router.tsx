import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import Main from '../pages/main/Main';
import FirstMain from '../pages/firstmain/FirstMain';
import Login from '../pages/user/login/Login';
import KakaoLoading from '../pages/user/auth/KakaoLoading';
import Store from '../pages/user/store/Store';
import MyPage from '../pages/user/mypage/MyPage';
import Feedback from '../pages/test/feedback/Feedback';
import { ResponseTest } from '../pages/test/responseTest/ResponseTest';
import TestList from '../pages/test/testList/TestList';
import CreateBoard from '../pages/board/CreateBoard';
import ModifyBoard from '../pages/board/ModifyBoard';
import Board from '../pages/board/Board';
import { CreateTest } from '../pages/test/createTest/CreateTest';
import { ResponseQuestion } from '../pages/test/responseTest/ResponseQuestion';

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
      { path: 'api/kakao/callback', element: <KakaoLoading /> },
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
        path: '/responsetest/:projectId',
        element: <ResponseTest />,
      },
      {
        path: '/responsequestions',
        element: <ResponseQuestion />,
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
        path: '/modifyBoard/:postId',
        element: <ModifyBoard />,
      },
      {
        path: '/board',
        element: <Board />,
      },
      // postId를 URL 파라미터로 받기 위해 Board 컴포넌트에서 PostDetail을 렌더링
      {
        path: '/board/post/:postId',
        element: <Board />,
      },
    ],
  },
]);

const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
