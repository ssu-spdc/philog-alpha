"use client";
import { useState, useEffect } from "react";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle } from "@/styles/Texts";

import AllClover from "@/app/_component/rank/AllClover";
import CategoryClover from "@/app/_component/rank/CategoryClover";
import RankCard from "@/app/_component/rank/RankCard";
import CloverTypeButtons from "@/app/_component/write/CloverTypeButtons";

import gold from "@/icons/gold.png";
import silver from "@/icons/silver.png";
import bronze from "@/icons/bronze.png";
import { cloverTypes } from "../_constants/type";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function RankPage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);
  const [allCloverRanks, setAllCloverRanks] = useState([]);
  const [categoryRanks, setCategoryRanks] = useState([]);

  // 전체 랭킹 불러오기
  useEffect(() => {
    const fetchAllCloverRanks = async () => {
      const totalRankRef = doc(db, "ranks", "totalRank");
      const totalRankSnap = await getDoc(totalRankRef);

      if (totalRankSnap.exists()) {
        const totalRankData = totalRankSnap.data();
        setAllCloverRanks(totalRankData.top3 || []);
      }
    };

    fetchAllCloverRanks();
  }, []);

  // 클로버 타입별 랭킹 불러오기
  useEffect(() => {
    const fetchCategoryRanks = async () => {
      const categoryRankRef = doc(
        db,
        "ranks",
        `categoryRanks-${activeButton.type}`
      );
      const categoryRankSnap = await getDoc(categoryRankRef);

      if (categoryRankSnap.exists()) {
        const categoryRankData = categoryRankSnap.data();
        setCategoryRanks(categoryRankData.top3 || []);
        console.log(categoryRankData.top3);
      }
    };

    fetchCategoryRanks();
  }, [activeButton]);

  // RankCard를 3명 이상 채우기 위한 헬퍼 함수
  const fillRankPlaceholders = (rankList, max = 3) => {
    const placeholders = [
      { name: "사용자", count: "-", src: gold },
      { name: "사용자", count: "-", src: silver },
      { name: "사용자", count: "-", src: bronze },
    ];

    return [...rankList, ...placeholders.slice(rankList.length, max)];
  };

  return (
    <Main>
      <MobileDisplay>
        <div style={{ height: "50px" }} />
        <AllClover />
        <div style={{ height: "50px" }} />
        <PageContainer>
          <SectionTitle>전체 랭킹</SectionTitle>
          {fillRankPlaceholders(allCloverRanks).map((user, index) => {
            const rankIcons = [gold, silver, bronze];
            return (
              <RankCard
                key={index}
                name={user.name}
                src={rankIcons[index]}
                alt={`${index + 1} rank`}
                count={user.totalCloverCount || "-"}
              />
            );
          })}
          <div style={{ height: "50px" }} />
          <SectionTitle $nonMargin={true}>클로버 별 랭킹</SectionTitle>
          <CloverTypeButtons
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <div style={{ height: "15px" }} />
          <CategoryClover cloverType={activeButton.label} />
          <div style={{ height: "15px" }} />
          {fillRankPlaceholders(categoryRanks).map((user, index) => {
            const rankIcons = [gold, silver, bronze];
            return (
              <RankCard
                key={index}
                name={user.name || "빈 사용자"}
                src={rankIcons[index]}
                alt={`${index + 1} rank`}
                count={user.cloverCount || "-"}
              />
            );
          })}
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
