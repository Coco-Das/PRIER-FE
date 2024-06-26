import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { DeleteImg, EditImg } from '../../services/UserApi';
import DefaultImg from '../../assets/userProfile.png';
import { useUserStore } from '../../states/user/UserStore';

interface CustomAlertProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  padding: 30px;
  width: 30%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-around;
  border: 1px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;
const ModalImgContent = styled.div`
  padding: 30px;
  width: 30%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;
const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border: 0.7px solid #e0e0e0;
  border-radius: 50%;
`;
const StyledProfile = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;

const Menu = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  border: none;
  background-color: #4188fe;
  border-radius: 10px;
  padding: 0.8rem;
  z-index: 10;
`;
const MenuItem = styled.div`
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  padding: 0.5rem;
  border-radius: 7px;
  &:hover {
    background-color: white;
    color: #315af1;
  }
`;
const AccountInput = styled.input`
  position: relative;
  font-size: 16px;
  width: 70%;
  max-width: 70%;
  border-radius: 20px;
  border: 1px solid #315af1;
  padding: 5px 10px;
  background-color: #f3f8ff;
  &:focus {
    outline: none;
  }
`;
const HiddenInput = styled.input`
  display: none;
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

const AccountEdit: React.FC<CustomAlertProps> = ({ message, onConfirm, onCancel, onInput }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [newImg, setNewImg] = useState<File | null>(null);
  const [action, setAction] = useState<'edit' | 'delete' | null>(null);
  const userProfile = useUserStore(state => state.userProfile);
  const UserStore = useUserStore();

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewImg(file);
      setAction('edit');
    }
  };
  const handleDeleteFileClick = async () => {
    setNewImg(null);
    setAction('delete');
  };

  const handleConfirm = async () => {
    if (action === 'edit') {
      try {
        if (newImg) {
          await EditImg(newImg);
        }
        if (onConfirm) onConfirm();
      } catch (error) {
        alert('이미지 수정 중 오류 발생:');
      }
    } else if (action === 'delete') {
      try {
        await DeleteImg();
        UserStore.setImgUrl(DefaultImg);
        if (onConfirm) onConfirm();
      } catch (error) {
        alert('이미지 삭제 중 오류 발생:');
      }
    }
  };
  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <ModalOverlay>
      {message === '프로필 이미지를 변경하시겠습니까?' ? (
        <>
          <ModalImgContent>
            <p>{message}</p>
            <ProfileImgContainer>
              {newImg ? (
                <StyledProfile src={URL.createObjectURL(newImg)} alt="Profile" />
              ) : (
                <StyledProfile src={userProfile.imgUrl} alt="Profile" />
              )}
              <ModeEditOutlineRoundedIcon color="inherit" onClick={handleMenuClick} style={{ position: 'absolute' }} />
              {openMenu ? (
                <Menu onClick={handleMenuClick}>
                  <MenuItem onClick={handleFileButtonClick}>이미지 업로드</MenuItem>
                  <MenuItem onClick={handleDeleteFileClick}>기본 이미지 설정</MenuItem>
                </Menu>
              ) : (
                <></>
              )}
            </ProfileImgContainer>
            <HiddenInput type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
            <span className="flex justify-center items-center gap-5">
              <AgreeButton onClick={handleConfirm}>확인</AgreeButton>
              <DisagreeButton onClick={onCancel}>취소</DisagreeButton>
            </span>
          </ModalImgContent>
        </>
      ) : (
        <>
          <ModalContent>
            <p>{message}</p>
            <AccountInput placeholder="계정 정보를 입력하세요" onChange={onInput}></AccountInput>
            <span className="flex justify-center items-center gap-7">
              <AgreeButton onClick={onConfirm}>확인</AgreeButton>
              <DisagreeButton onClick={onCancel}>취소</DisagreeButton>
            </span>
          </ModalContent>
        </>
      )}
    </ModalOverlay>
  );
};

export default AccountEdit;
