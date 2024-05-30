import React from 'react';
import { Link } from 'react-router-dom';

import { FirstMainContainer, Logo, StartButton, Text } from './FirstMainStyles';
function FirstMain() {
  return (
    <FirstMainContainer>
      <Logo />
      <Text>테스트 그리고 피드백, 당신의 창조를 세상으로 연결합니다</Text>
      <StartButton component={Link} to="/main" />
    </FirstMainContainer>
  );
}

export default FirstMain;
