import React from "react";
import styled from "styled-components";
import { cloverTypes } from "@/app/_constants/type";

export default function CloverTypeButtons({ activeButton, setActiveButton }) {
  return (
    <BtnContainer>
      {cloverTypes.map((cloverType) => (
        <SelectButton
          key={cloverType.type}
          $isActive={activeButton.type === cloverType.type}
          onClick={() => setActiveButton(cloverType)}
        >
          {cloverType.label}
        </SelectButton>
      ))}
    </BtnContainer>
  );
}

const BtnContainer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const SelectButton = styled.button`
  display: flex;
  height: 38px;
  padding: 7px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 48px;
  border: none;
  cursor: pointer;
  font-size: 18px;

  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#A6ABAF")};
  background-color: ${({ $isActive }) => ($isActive ? "#7CE28D" : "#F6F7F9")};

  &:focus {
    outline: none;
  }
`;
