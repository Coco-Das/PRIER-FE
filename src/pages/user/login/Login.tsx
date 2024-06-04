import React from 'react';
import {
  CTALink,
  Container,
  IntroText,
  KakaoContainer,
  KakaoText,
  LoginContainer,
  LoginIntro,
  LoginText,
  LoginWrapper,
  RandomText,
  ScrollerItem,
} from './LoginStyle';
import KAKAO from '../../../assets/kakao.png';
import { KAKAO_AUTH_URL } from '../../../services/LoginApi';

function Login() {
  const messages = [
    ' 당신의 프로젝트를, ',
    ' 당신의 아이디어를, ',
    ' 당신의 코드를, ',
    ' 당신의 노력을, ',
    ' 당신의 작업을, ',
    ' 당신의 목표를, ',
    ' 당신의 창작물을, ',
    ' 당신의 열정을, ',
    ' 당신의 도전을, ',
  ];
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <LoginWrapper>
      <Container>
        <LoginIntro>
          <div className="flex">
            <IntroText>
              <RandomText>
                {messages.map((message, index) => (
                  <ScrollerItem key={index}>
                    <CTALink href="#">{message.split(',')[0]}</CTALink>, {message.split(',')[1]}
                  </ScrollerItem>
                ))}
              </RandomText>
              모두에게 선보이세요.
            </IntroText>
          </div>
        </LoginIntro>
        <LoginContainer>
          <LoginText>
            반갑습니다.<br></br>
            <span className="font-bold">프로젝트 리뷰어 &quot; 프리어 &quot; </span>입니다.
          </LoginText>
          <KakaoContainer onClick={handleKakaoLogin}>
            <img src={KAKAO} />
            <KakaoText>카카오로 시작하기</KakaoText>
          </KakaoContainer>
        </LoginContainer>
      </Container>
    </LoginWrapper>
  );
}

export default Login;
