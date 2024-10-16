"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import styled from "styled-components";

export default function layout({ children }) {
  return (
    <Main>
      <MobileDisplay>
        <TextContainer>
          <StyledH1>
            클로버를
            <br />
            모아 볼까요?
          </StyledH1>
          <StyledH2>[윤리적 문제 해결] 이벤트</StyledH2>
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
  margin-bottom: 20px;
  gap: 10px;
`;

const StyledH1 = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

const StyledH2 = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #c6ccd1;
`;
