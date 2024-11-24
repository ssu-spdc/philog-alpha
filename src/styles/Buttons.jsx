import styled from "styled-components";

const CloverButton = styled.div`
  height: 32px;
  width: 51px;
  background-color: #f1fff4;
  border-radius: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteBtn = styled.button`
  width: 320px;
  height: 56px;
  border-radius: 10px;
  background: ${({ $isReady }) => ($isReady ? "#7CE28D" : "#e0e5ea")};
  font-size: 18px;
  font-weight: bold;
  color: ${({ $isReady }) => ($isReady ? "#ffffff" : "#A6ABAF")};
  cursor: ${({ $isReady }) => ($isReady ? "pointer" : "not-allowed")};
  border: none;

  &:disabled {
    background: #e0e5ea;
    color: #a6abaf;
    cursor: not-allowed;
  }
`;


export { CloverButton, WriteBtn };
