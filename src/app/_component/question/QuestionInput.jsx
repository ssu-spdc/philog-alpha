import React from "react";
import { LabelText } from "@/styles/Texts";
import { FlexContainer } from "@/styles/Containers";
import styled from "styled-components";

export default function QuestionInput({ question, setQuestion }) {
  return (
    <FlexContainer style={{ gap: 10 }}>
      <LabelText>문의내용</LabelText>
      <QuestionTextArea
        placeholder="문의내용을 입력해주세요."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={140}
      />
    </FlexContainer>
  );
}

const QuestionTextArea = styled.textarea`
  width: 320px;
  height: 130px;
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
