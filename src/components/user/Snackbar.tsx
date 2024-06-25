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
  top: 4%;
  right: 2%;
  width: max-conten;
  max-width: max-content;
  background-color: ${({ type }) => (type === 'success' ? 'rgba(40, 179, 129, 0.8)' : 'rgba(245, 91, 102, 0.8)')};
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.7s;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <SnackbarContainer type={type} isVisible={isVisible}>
      <IconWrapper>
        {type === 'success' ? (
          <CheckCircleRoundedIcon style={{ color: 'white' }} />
        ) : (
          <ReportProblemRoundedIcon style={{ color: 'white' }} />
        )}
      </IconWrapper>
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;
