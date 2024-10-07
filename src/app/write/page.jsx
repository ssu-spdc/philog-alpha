"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PerCount from "@/app/_component/write/PerCount";
import PhotoInput from "@/app/_component/write/PhotoInput";
import CloverTypeButtons from "@/app/_component/write/CloverTypeButtons";
import DescriptionInput from "@/app/_component/write/DescriptionInput";
import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle, LabelText } from "@/styles/Texts";
import styled from "styled-components";
import { cloverTypes } from "../_constants/type";

export default function WritePage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const router = useRouter();

  const isReady = photo && activeButton && description;

  const handleSubmit = () => {
    const formData = {
      cloverType: activeButton.type,
      description,
      photo,
    };
    router.push(`/`);
    // 디버깅 (추후 제거)
    console.log(formData);
  };

  return (
    <Main>
      <MobileDisplay>
        <PageContainer style={{ flexDirection: "column", gap: "20px" }}>
          <PerCount />
          <SectionTitle style={{ marginBottom: "4px" }}>글쓰기</SectionTitle>
          <PhotoInput photo={photo} setPhoto={setPhoto} />
          <div>
            <LabelText>클로버 종류</LabelText>
            <CloverTypeButtons
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
          <WriteBtn
            onClick={handleSubmit}
            disabled={!isReady}
            $isReady={isReady}
          >
            등록하기
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
