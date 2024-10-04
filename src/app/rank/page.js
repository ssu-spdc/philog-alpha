"use client";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { TopTitle } from "@/styles/Texts";

export default function RankPage() {
  return (
    <Main>
      <MobileDisplay>
        <PageContainer>
          {/* <PerCount /> */}
          <TopTitle style={{ textAlign: "center" }}>
            <TopTitle className="lighter">지금까지 모인</TopTitle>
            <br />
            <TopTitle className="hilight">클로버</TopTitle>
          </TopTitle>
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
