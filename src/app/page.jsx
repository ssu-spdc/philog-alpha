"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import Card from "@/app/_component/home/Card";
import HomeTop from "@/app/_component/home/HomeTop";
import { SectionTitle, SectionTitleContainer } from "@/styles/Texts";


export default function Home() {
  return (
    <Main>
      <MobileDisplay>
        <HomeTop />
        <SectionTitleContainer>
          <SectionTitle>
            <SectionTitle className="hilight">필로소퍼</SectionTitle>들의 클로버
          </SectionTitle>
        </SectionTitleContainer>
        <Card />
        <Card />
      </MobileDisplay>
    </Main>
  );
}
