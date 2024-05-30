import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChartIcon } from '../../assets/main_chart.svg';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { GreetingContainer, LinkButton, MainContainer, MainText, OrderButton, PointText, Title } from './MainStyle';
import ProjectPreview from '../../components/user/ProjectPreview';

export default function Main() {
  const [activeButton, setActiveButton] = useState('인기순');
  return (
    <div className="flex-col cursor-pointer" style={{ margin: '1% 7%' }}>
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
      <ProjectPreview />
      <Title>모든 프로젝트</Title>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          <OrderButton active={activeButton === '인기순'} onClick={() => setActiveButton('인기순')}>
            인기순
          </OrderButton>
          <OrderButton active={activeButton === '등록순'} onClick={() => setActiveButton('등록순')}>
            등록순
          </OrderButton>
        </div>
        <TextField
          variant="standard"
          sx={{
            '& .MuiInput-underline:before': {
              borderBottomColor: '#315af1',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#28b381',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: '#315af1',
            },
          }}
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
      <ProjectPreview />
      <span className="flex justify-center mt-6">
        <Pagination count={5} color="primary" size="large" />
      </span>
    </div>
  );
}
