import React from 'react';
import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  margin-top: 5px;
  position: relative;
  margin-left: 20px;

  input {
    position: relative;
    background: none;
    border: none;
    outline: none;
    width: 160px;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    line-height: 18px;
    margin: 5px 0px 5px 0;
    font-size: 18px;
    -webkit-appearance: none;
    transition: all 0.6s ease;
    cursor: pointer;

    & + div {
      position: relative;
      height: 28px;
      width: 100%;
      margin: -28px 0 0 0;

      svg {
        display: block;
        position: absolute;
        height: 28px;
        width: 160px;
        right: 0;
        top: 0;
        fill: none;
        stroke: #315af1;
        stroke-width: 1.5px;
        stroke-dashoffset: 212.908 + 100;
        stroke-dasharray: 59 212.908;
        transition: all 0.6s ease;
      }
    }

    &:focus {
      width: 160px;
      padding: 0 4px;
      cursor: text;

      & + div {
        svg {
          stroke-dasharray: 150 212.908;
          stroke-dashoffset: 300;
        }
      }

      ~ button {
        display: block;
      }
    }
  }

  button {
    display: none; /* 기본 상태에서는 숨김 */
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #315af1;
    z-index: 2; /* z-index를 높여 input 위에 표시 */
  }

  input:focus ~ button {
    display: block; /* 입력창이 포커스될 때 버튼 표시 */
  }
`;

const SearchInput: React.FC<{
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchTerm, handleSearchChange }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <SearchInputWrapper className="search">
        <input type="text" value={searchTerm} onChange={handleSearchChange} ref={inputRef} className="ml-5px" />
        <div>
          <svg>
            <use xlinkHref="#path" />
          </svg>
        </div>
      </SearchInputWrapper>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 28" id="path">
          <path
            d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562"
            transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"
          ></path>
        </symbol>
      </svg>
    </>
  );
};

export default SearchInput;
