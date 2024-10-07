"use client";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle } from "@/styles/Texts";

import AllClover from "@/app/_component/rank/AllClover";
import RankCard from "@/app/_component/rank/RankCard";

import gold from "@/icons/gold.png";
import silver from "@/icons/silver.png";
import bronze from "@/icons/bronze.png";

export default function RankPage() {
  return (
    <Main>
      <MobileDisplay>
        <div style={{ height: "50px" }} />
        <AllClover />
        <div style={{ height: "50px" }} />
        <PageContainer>
          <SectionTitle>전체 랭킹</SectionTitle>
          <RankCard name="박요셉" src={gold} alt="gold rank" count={22} />
          <RankCard name="박요셉" src={silver} alt="silver rank" count={15} />
          <RankCard name="박요셉" src={bronze} alt="bronze rank" count={7} />
          <div style={{ height: "50px" }} />
          <SectionTitle>클로버 별 랭킹</SectionTitle>
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
