"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import styled from "styled-components";

export default function layout({ children }) {
  return (
    <Main>
      <MobileDisplay>
        <TextContainer>
          <StyledH1>
            비밀번호 변경하기
          </StyledH1>
        </TextContainer>
        {children}
      </MobileDisplay>
    </Main>
  );
}

const TextContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 30px;
  gap: 10px;
`;

const StyledH1 = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const StyledH2 = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #c6ccd1;
`;
