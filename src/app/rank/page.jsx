"use client";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle } from "@/styles/Texts";

import AllClover from "@/app/_component/rank/AllClover";
import CategoryClover from "@/app/_component/rank/CategoryClover";
import RankCard from "@/app/_component/rank/RankCard";
import CloverTypeButtons from "@/app/_component/write/CloverTypeButtons";

import gold from "@/icons/gold.png";
import silver from "@/icons/silver.png";
import bronze from "@/icons/bronze.png";
import { useState } from "react";
import { cloverTypes } from "../_constants/type";

export default function RankPage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);

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
          <SectionTitle $nonMargin={true}>클로버 별 랭킹</SectionTitle>
          <CloverTypeButtons
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <div style={{ height: "15px" }} />
          <CategoryClover cloverType={activeButton.label} />
          <div style={{ height: "15px" }} />
          <RankCard name="박요셉" src={gold} alt="gold rank" count={22} />
          <RankCard name="박요셉" src={silver} alt="silver rank" count={15} />
          <RankCard name="박요셉" src={bronze} alt="bronze rank" count={7} />
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
