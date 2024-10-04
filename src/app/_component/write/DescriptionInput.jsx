import React from "react";
import { LabelText } from "@/styles/Texts";
import { FlexContainer } from "@/styles/Containers";
import styled from "styled-components";

export default function DescriptionInput({ description, setDescription }) {
  return (
    <FlexContainer style={{ gap: 10 }}>
      <LabelText>설명</LabelText>
      <DescriptionTextArea
        placeholder="설명을 입력해주세요. (140자)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </FlexContainer>
  );
}

const DescriptionTextArea = styled.textarea`
  width: 320px;
  height: 130px;
  font-size: 14px;
  border-radius: 10px;
  background: #f6f7f9;
  resize: none;
  border: none;
  outline: none;
  padding: 10px;

  &::placeholder {
    color: #c6ccd1;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-size: 14px;
  }
`;
