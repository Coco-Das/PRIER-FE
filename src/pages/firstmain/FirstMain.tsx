import React from 'react';

import { FirstMainContainer, Logo, StartButton, Text } from './FirstMainStyles';
function FirstMain() {
  return (
    <FirstMainContainer>
      <Logo />
      <Text>테스트 그리고 피드백, 당신의 창조를 세상으로 연결합니다</Text>
      <StartButton to="/main" />
    </FirstMainContainer>
  );
}

export default FirstMain;
