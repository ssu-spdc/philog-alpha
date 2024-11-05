"use client";

import { useState } from "react";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle } from "@/styles/Texts";

import QuestionInput from "@/app/_component/question/QuestionInput";
import EmailInput from "@/app/_component/question/EmailInput";
import styled from "styled-components";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/../lib/firebase";

export default function QuestionPage() {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  // const [error, setError] = useState(null);

  const isReady = question && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    // setError(null);

    // 필드가 비어있는지 확인
    if (!email || !question) {
      // setError("이메일과 문의 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await setDoc(doc(db, "question", email), {
        email: email,
        question: question,
      });

      // router.push("/");
      setIsUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main>
      <MobileDisplay>
        <PageContainer
          style={{ flexDirection: "column", gap: "20px", marginTop: "20px" }}
        >
          <SectionTitle style={{ marginBottom: "4px" }}>문의하기</SectionTitle>

          <EmailInput email={email} setEmail={setEmail} />

          <QuestionInput question={question} setQuestion={setQuestion} />
          <WriteBtn
            onClick={handleSubmit}
            disabled={!isReady || isUploading}
            $isReady={isReady && !isUploading}
            type="submit"
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
