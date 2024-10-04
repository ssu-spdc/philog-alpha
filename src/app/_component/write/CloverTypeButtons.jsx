import React from "react";
import styled from "styled-components";
import { cloverTypes } from "@/app/_constants/type";
import { LabelText } from "@/styles/Texts";

export default function CloverTypeButtons({ activeButton, setActiveButton }) {
  return (
    <div>
      <LabelText>클로버 종류</LabelText>
      <BtnContainer>
        {cloverTypes.map((cloverType) => (
          <SelectButton
            key={cloverType.type}
            $isActive={activeButton === cloverType.type}
            onClick={() => setActiveButton(cloverType.type)}
          >
            {cloverType.label}
          </SelectButton>
        ))}
      </BtnContainer>
    </div>
  );
}

const BtnContainer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
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
