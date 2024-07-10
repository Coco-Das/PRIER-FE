import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API_BASE_URL } from '../../const/TokenApi';
import { useProjectStore } from '../../states/projects/ProjectStore';

interface CustomAlertProps {
  //   onConfirm?: () => void;
  onCancel?: () => void;
  onMouseLeave: () => void;
  top: number;
  left: number;
  onExtend: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  font-size: 18px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(255, 255, 255, 0.8); */
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  z-index: 5;
`;

const ModalContent = styled.div<{ top: number; left: number }>`
  /* padding: 30px 30px 0px 30px; */
  position: absolute;
  width: 30%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* align-items: center; */
  /* justify-content: space-around; */
  /* border: 1px solid transparent;
  border-radius: 20px; */
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  /* background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box; */
`;

const AgreeButton = styled.button`
  background-color: #4188fe;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  &:hover {
    background-color: #315af1;
    transition: 0.3s;
  }
`;
const BalloonSVG = styled.svg`
  width: 100%;
  position: relative;
  height: 100%;
`;

const BalloonContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const DisagreeButton = styled.button`
  background-color: #ffffff;
  color: #315af1;
  border: 1px solid #315af1;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  height: 100%;
  &:hover {
    background-color: #f3f8ff;
    transition: 0.3s;
  }
`;

const ExtendsBtn = styled(AgreeButton)<{ $point: number; $used: number }>`
  /* height: 40%; */
  width: 20%;
  ${props =>
    props.$point < props.$used &&
    `
    pointer-events: none;
    background-color:#cccccc;
    
  `}
`;

const CustomModal: React.FC<CustomAlertProps> = ({ onCancel, top, left, onMouseLeave, onExtend }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [weeks, setWeeks] = useState(0);
  const [point, setPoint] = useState(0);
  const [used, setUsed] = useState(0);
  const setProjectId = useProjectStore(state => state.setProjectId);
  const navigate = useNavigate();

  const handlePlus = () => {
    setWeeks(prevCount => {
      const newCount = prevCount + 1;
      setUsed(newCount * 250);
      return newCount;
    });
  };

  const handleMinus = () => {
    setWeeks(prevCount => {
      if (prevCount === 0) {
        setUsed(0);
        return 0;
      } else {
        const newCount = prevCount - 1;
        setUsed(newCount * 250);
        return newCount;
      }
    });
  };

  const handleGetPoint = async () => {
    try {
      const response = await API_BASE_URL.get('/points');
      setPoint(response.data);
    } catch (error) {
      ('');
    }
  };

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }
    handleGetPoint();
  }, [projectId]);

  const handleExtend = async () => {
    try {
      const response = await API_BASE_URL.post(`/projects/${projectId}/extend?weeks=${weeks}`);
      onExtend();
      navigate(`/responsetest/${projectId}`);
    } catch (error) {
      ('');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent top={top} left={left} onMouseLeave={onMouseLeave}>
        <BalloonSVG viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#315af1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#23be87', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M10 10 H290 A10 10 0 0 1 300 20 V150 A10 10 0 0 1 290 160 H160 L150 180 L140 160 H10 A10 10 0 0 1 0 150 V20 A10 10 0 0 1 10 10 Z"
            fill="white"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
        </BalloonSVG>
        <BalloonContent>
          <div
            style={{
              height: '65%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingTop: '10px',
            }}
          >
            <p>내 포인트: {point}</p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              기간 연장:
              <button
                style={{
                  marginLeft: '10px',
                  marginRight: '5px',
                  borderRadius: '40%',
                  height: '30px',
                  width: '30px',
                  backgroundColor: '#315af1',
                  color: 'white',
                }}
                onClick={handleMinus}
              >
                -
              </button>
              {weeks}주
              <button
                style={{
                  marginLeft: '5px',
                  borderRadius: '40%',
                  height: '30px',
                  width: '30px',
                  backgroundColor: '#315af1',
                  color: 'white',
                }}
                onClick={handlePlus}
              >
                +
              </button>
              <span style={{ marginLeft: '20px' }}>{used > 0 && <span>(-{used})</span>}</span>
            </p>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px',
              height: '15%',
              justifyContent: 'center',
            }}
          >
            <div style={{ justifyContent: 'space-around', display: 'flex', height: '100%' }}>
              <DisagreeButton style={{ width: '20%', height: '100%' }} onClick={onCancel}>
                취소
              </DisagreeButton>
              <ExtendsBtn $point={point} $used={used} onClick={handleExtend}>
                확인
              </ExtendsBtn>
            </div>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', height: '14%' }}>
            {point < used && (
              <Link to={'/store'} className="underline mt-2 font-bold" style={{ fontSize: '13px', color: ' #315af1' }}>
                충전하러 가기 &rarr;
              </Link>
            )}
          </div>
        </BalloonContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModal;
