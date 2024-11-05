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
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const isReady = question && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setIsUploading(false);
      return;
    }

    if (!question) {
      setError("문의 내용을 입력해주세요.");
      setIsUploading(false);
      return;
    }
    try {
      await setDoc(doc(db, "question", email), {
        email: email,
        question: question,
      });
    } catch (err) {
      console.log(err);
      setError("문의 등록 중 문제가 발생했습니다.");
    } finally {
      setIsUploading(false);
      setShowModal(true);
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
          {error && <ErrorText>{error}</ErrorText>}
          <WriteBtn
            onClick={handleSubmit}
            disabled={!isReady || isUploading}
            $isReady={isReady && !isUploading}
            type="submit"
          >
            {isUploading ? "업로드 중" : "등록하기"}
          </WriteBtn>
          {showModal && (
            <ConfirmModal>
              <ModalContent>
                <p>문의사항이 등록되었습니다.</p>
                <ModalActions>
                  <div />
                  <ConfirmButton onClick={() => setShowModal(false)}>
                    확인
                  </ConfirmButton>
                </ModalActions>
              </ModalContent>
            </ConfirmModal>
          )}
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
`;

// 모달 스타일
const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: #e0e5ea;
  color: #a6abaf;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
