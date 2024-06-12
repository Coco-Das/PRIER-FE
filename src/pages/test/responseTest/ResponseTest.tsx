import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BlueDiv,
  CreateWrapper,
  CustomButton,
  DeleteButton,
  FileCount,
  GreenDiv,
  HiddenInput,
  ImageWrapper,
  Input,
  OrangeDiv,
  OrangeInputDiv,
  ProjectDiv,
  ProjectIntro,
  ProjectTextArea,
  StyledImg,
  TagDiv,
  BlueInputDiv,
  Textarea,
  GreenInputDiv,
  Project,
  TagWrapper,
  Tag,
  WhiteDiv,
} from './ResponseTestStyles';
import { API_BASE_URL } from '../../../const/TokenApi';

interface Question {
  id: number;
  type: 'subjective' | 'objective';
  content: string;
  options?: string[]; // 객관식 질문의 선택지(고정)
  selectedOption?: string; // 사용자가 선택한 선택지
}
interface Tag {
  tag: string;
  color: string;
}

export const ResponseTest = () => {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [introduce, setIntroduce] = useState('');
  const [goal, setGoal] = useState('');
  const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0'];

  //태그 색상 랜덤 설정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  //정보 가져오기
  const handleGetInfo = async () => {
    try {
      const response = await API_BASE_URL.get('http://13.209.76.145:8080/api/projects');
      console.log(response.data);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <CreateWrapper>
      <Project>
        <ProjectDiv>
          <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ml-4 font-bold">
              안녕하세요 <span>닉네임님</span>, <span style={{ color: '#315AF1' }}>어디팀</span>의{' '}
              <span style={{ color: '#23BE87' }}>무슨</span> 프로젝트 입니다.
            </span>
          </div>
          <ProjectTextArea className="mt-2">
            <p className="font-extrabold">프로젝트 소개</p>

            <p className="font-extrabold">프로젝트 목표</p>
          </ProjectTextArea>
        </ProjectDiv>
        <ProjectIntro>
          <TagWrapper>
            {tags.map((tagIndex, index) => (
              <Tag key={index} bgColor={tagIndex.color}>
                {tagIndex.tag}
              </Tag>
            ))}
          </TagWrapper>
          <OrangeDiv style={{ marginTop: '60px' }}>
            <span className="font-bold">개발일정</span>
            <OrangeInputDiv />
            <OrangeInputDiv style={{ height: '27%' }}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>진행단계 :</div>
            </OrangeInputDiv>
          </OrangeDiv>
          <BlueDiv className="mt-2">
            <span className="font-bold">팀소개</span>
          </BlueDiv>
          <GreenDiv className="mt-2">
            <GreenInputDiv>
              <span className="font-bold">배포 링크</span>
            </GreenInputDiv>
          </GreenDiv>
          <WhiteDiv className="mt-2">
            <span className="font-bold">댓글 달기</span>
          </WhiteDiv>
          <CustomButton style={{ height: '6%', marginLeft: 'auto', width: '30%' }}>테스트폼 참여하기</CustomButton>
        </ProjectIntro>
      </Project>
    </CreateWrapper>
  );
};
