// Snackbar.tsx
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const SnackbarContainer = styled.div<{ type: 'success' | 'error'; isVisible: boolean }>`
  position: fixed;
  top: 5%;
  right: 5%;
  width: 25%;
  background-color: #504f4f;
  color: white;
  font-weight: 300;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 10;
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.5s;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
`;

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for the slide-out animation to complete
    }, 2500); // Show the snackbar for 2.5 seconds before starting the slide-out animation

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <SnackbarContainer type={type} isVisible={isVisible}>
      <IconWrapper>
        {type === 'success' ? (
          <CheckCircleRoundedIcon style={{ color: '#28B381' }} />
        ) : (
          <ReportProblemRoundedIcon style={{ color: '#F9A5AB' }} />
        )}
      </IconWrapper>
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;
