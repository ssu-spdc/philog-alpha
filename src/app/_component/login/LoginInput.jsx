import React from "react";
import { FlexContainer } from "@/styles/Containers";
import styled from "styled-components";

export default function CommonInput({
  label,
  placeholder,
  value,
  onChange,
  type,
}) {
  return (
    <FlexContainer style={{ gap: 10, marginBottom: 15 }}>
      <LoginLabel>{label}</LoginLabel>
      <StyledTextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </FlexContainer>
  );
}

const LoginLabel = styled.div`
  font-size: 14px;
`;

const StyledTextArea = styled.input`
  width: 320px;
  height: 56px;
  font-size: 16px;
  border-radius: 10px;
  background: #f6f7f9;
  resize: none;
  border: none;
  outline: none;
  padding: 10px;
  line-height: 56px;

  &::placeholder {
    color: #c6ccd1;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    font-size: 16px;
  }
`;
