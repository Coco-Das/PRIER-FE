import * as React from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const shine = keyframes`
  100% {
    background-position: right -40px top 0;
  }
`;

// 기본 스켈레톤 박스 스타일링
const SkeletonPostBox = styled.div`
  background: #ffffff;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 1vh;
  margin-bottom: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-self: center;
`;

// 유저 컨테이너 스타일링
const SkeletonUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 2px;
`;

// 애니메이션이 적용된 스켈레톤 컴포넌트
const SkeletonLoading = styled.div`
  background-color: #e2e5e7;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  background-size: 40px 100%;
  background-repeat: no-repeat;
  background-position: left -40px top 0;
  animation: ${shine} 1s ease infinite;
`;

const SkeletonAvatar = styled(SkeletonLoading)`
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 2px;
  width: 45px;
  height: 45px;
`;

const SkeletonText = styled(SkeletonLoading)<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  border-radius: 5px;
  margin-bottom: 1px;
  margin-top: 3px;
`;

const SkeletonImage = styled(SkeletonLoading)`
  width: 100%;
  border-radius: 5px;
  margin-top: 5px;
  height: 40px;
`;

const SkeletonContentContainer = styled.div`
  margin-top: 14.5px;
`;

const SkeletonLikesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5px;
`;

// PostSkeleton 컴포넌트
const PostSkeleton: React.FC = () => {
  return (
    <SkeletonPostBox>
      <SkeletonUserContainer>
        <SkeletonAvatar />
        <div>
          <SkeletonText width="80px" height="20px" />
          <SkeletonText width="170px" height="18px" />
        </div>
      </SkeletonUserContainer>
      <SkeletonContentContainer>
        <SkeletonText height="18px" />
        <SkeletonImage />
      </SkeletonContentContainer>
      <SkeletonLikesContainer>
        <SkeletonText width="100px" height="22px" />
      </SkeletonLikesContainer>
    </SkeletonPostBox>
  );
};

export default PostSkeleton;
