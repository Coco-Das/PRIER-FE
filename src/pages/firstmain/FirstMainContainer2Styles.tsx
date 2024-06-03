import styled from 'styled-components';
import * as React from 'react';
import { ReactComponent as ProjectImg1 } from '../../assets/ProjectImg1.svg';
import { ReactComponent as ProjectImg2 } from '../../assets/ProjectImg2.svg';

export const Text2 = styled.h1`
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(245, 91, 102, 1) 0%,
    rgba(193, 99, 232, 1) 50.01000165939331%,
    rgba(187, 104, 253, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 3rem;
`;
export const Text3 = styled.h1`
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(250, 246, 143, 1) 0%,
    rgba(99, 208, 232, 1) 50.01000165939331%,
    rgba(109, 88, 233, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 3rem;
`;

export const Project1 = styled(ProjectImg1)`
  position: absolute;
  left: 12rem;
  top: 20rem;
`;
export const Project2 = styled(ProjectImg2)`
  position: absolute;
  right: 12rem;
  top: 35rem;
`;
