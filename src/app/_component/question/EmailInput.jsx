import React from "react";
import { LabelText } from "@/styles/Texts";
import { FlexContainer } from "@/styles/Containers";
import styled from "styled-components";

export default function EmailInput({
  email,
  setEmail,
  type = "email",
  label = "답변받을 이메일",
  placeholder = "이메일을 입력해주세요",
}) {
  return (
    <FlexContainer style={{ gap: 10 }}>
      <LabelText>{label}</LabelText>
      <EmailTextArea
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={140}
        type={type}
      />
    </FlexContainer>
  );
}

const EmailTextArea = styled.input`
  width: 320px;
  /* display: flex; */
  height: 55px;
  font-size: 14px;
  border-radius: 10px;
  background: #f6f7f9;
  resize: none;
  border: none;
  outline: none;
  padding: 10px;
  line-height: 20px;

  &::placeholder {
    color: #c6ccd1;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-size: 14px;
  }
`;
