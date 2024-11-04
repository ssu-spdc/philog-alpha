"use client";

import { useState } from "react";


import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle, LabelText } from "@/styles/Texts";

import QuestionInput from "@/app/_component/question/QuestionInput";
import styled from "styled-components";

export default function QuestionPage() {
  const [description, setQuestion] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const isReady = description !== "" ? true : false;

  const handleSubmit = () => {};

  return (
    <Main>
      <MobileDisplay>
        <PageContainer style={{ flexDirection: "column", gap: "20px" }}>
          <SectionTitle style={{ marginBottom: "4px" }}>글쓰기</SectionTitle>
          <div>
            <LabelText>클로버 종류</LabelText>
          </div>
          <QuestionInput
            question={description}
            setQuestion={setQuestion}
          />
          <WriteBtn
            onClick={handleSubmit}
            disabled={!isReady || isUploading}
            $isReady={isReady && !isUploading}
          >
            {isUploading ? "업로드 중" : "등록하기"}
          </WriteBtn>
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}

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
