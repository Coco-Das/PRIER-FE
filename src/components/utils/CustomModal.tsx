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
  padding: 30px;
  position: absolute;
  padding-bottom: 0px;
  width: 30%;
  height: 40%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-around; */
  border: 1px solid transparent;
  border-radius: 20px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;

const AgreeButton = styled.button`
  background-color: #4188fe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  &:hover {
    background-color: #315af1;
    transition: 0.3s;
  }
`;

const DisagreeButton = styled.button`
  background-color: #ffffff;
  color: #315af1;
  border: 1px solid #315af1;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
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
  console.log(top, left);
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
      console.log(response.data);
      setPoint(response.data);
    } catch (error) {
      console.log(error);
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
      console.log(projectId, weeks);
      onExtend();
      navigate(`/responsetest/${projectId}`);
      console.log('연장 요청 성공', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent top={top} left={left} onMouseLeave={onMouseLeave}>
        <div
          style={{
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
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
                // marginRight: '5px',
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
            <span style={{ marginLeft: '20px' }}>(-{used})</span>
          </p>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'flex-end',
            marginTop: '20px',
            // alignItems: 'center',
            height: '25%',
          }}
        >
          <div style={{ justifyContent: 'space-around', display: 'flex' }}>
            <DisagreeButton style={{ width: '20%', fontSize: '16px' }} onClick={onCancel}>
              취소
            </DisagreeButton>
            <ExtendsBtn $point={point} $used={used} onClick={handleExtend} style={{ fontSize: '16px' }}>
              확인
            </ExtendsBtn>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            {point < used && (
              <Link to={'/store'} className="underline mt-2 font-bold" style={{ fontSize: '15px', color: ' #315af1' }}>
                충전하러 가기 &rarr;
              </Link>
            )}
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModal;
