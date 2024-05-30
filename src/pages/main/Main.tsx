import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChartIcon } from '../../assets/main_chart.svg';
import { ReactComponent as TeamProfile } from '../../assets/MainAvatar.svg';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import {
  GreetingContainer,
  LinkButton,
  MainContainer,
  MainText,
  PointText,
  ProjectContainer,
  Title,
} from './MainStyle';

export default function Main() {
  return (
    <div className="flex-col" style={{ margin: '1% 7%' }}>
      <MainContainer>
        <GreetingContainer>
          <ChartIcon style={{ width: '18%' }} />
          <div className="flex flex-col" style={{ marginTop: '3%', marginLeft: '4%' }}>
            <PointText className="mt-2">반갑습니다 {}개발자1님</PointText>
            <MainText>
              새로운 아이디어를 시험해보고, 실제 사용자의 피드백으로 완성도를 높이세요. <br></br>
              여기, 사용자와 함께 성장하는 첫 걸음을 내딛을 수 있는 공간입니다.
            </MainText>
            <LinkButton>
              <Link to="createTest">지금 바로 등록하기</Link>
            </LinkButton>
          </div>
        </GreetingContainer>
      </MainContainer>
      <Title>신규 프로젝트</Title>
      <ProjectContainer>
        <TeamProfile />
      </ProjectContainer>
      <Title>모든 프로젝트</Title>
      <div className="flex justify-between">
        <div>
          <button>인기순</button>
          <button>등록순</button>
        </div>
        <TextField
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}
