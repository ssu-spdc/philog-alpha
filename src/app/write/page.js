"use client";

import PerCount from "@/components/PerCount";
import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";

export default function WritePage() {
  return (
    <Main>
      <MobileDisplay>
        <PageContainer>
          <PerCount />
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
