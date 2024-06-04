import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  CreateContainer,
  PostBox,
  UserContainer,
  Avatar,
  AvatarImage,
  AuthorContainer,
  Author,
  Button,
  ButtonText,
  ContentContainer,
  Title,
  ContentText,
} from './CreateBoardStyles';
import userAvatar from '../../assets/user.svg';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function CreateBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Container>
      <CreateContainer>
        <div className="flex justify-end mb-2">
          <Select
            placeholder="카테고리"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 110,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
            className="ml-auto"
          >
            <Option value="it-news">IT 지식</Option>
            <Option value="chat">잡담/일상</Option>
            <Option value="tech">기술</Option>
            <Option value="internship">인턴십/공모전</Option>
            <Option value="notice">공지사항</Option>
          </Select>
        </div>
        <PostBox>
          <UserContainer>
            <Avatar>
              <AvatarImage src={userAvatar} alt="Avatar" />
            </Avatar>
            <AuthorContainer>
              <Author>개발자1</Author>
            </AuthorContainer>
          </UserContainer>
          <ContentContainer>
            <Title placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
            <ContentText placeholder="내용을 입력하세요" value={content} onChange={e => setContent(e.target.value)} />
          </ContentContainer>
        </PostBox>
        <Button as={Link} to="/CreateBoard" className="ml-auto">
          <ButtonText>완료</ButtonText>
        </Button>
      </CreateContainer>
    </Container>
  );
}

export default CreateBoard;
