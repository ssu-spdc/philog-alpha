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

import { getDoc, doc, writeBatch, increment } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function RankPage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);
  const [allCloverRanks, setAllCloverRanks] = useState([]);
  const [categoryRanks, setCategoryRanks] = useState([]);

  const [totalAllClover, setTotalAllClover] = useState(0);
  const [totalcategoryClover, setTotalCategoryClover] = useState(0);

  // 전체 랭킹 불러오기
  useEffect(() => {
    const fetchAllCloverRanks = async () => {
      const batch = writeBatch(db);

      const totalRankRef = doc(db, "ranks", "totalRank");
      const totalRankSnap = await getDoc(totalRankRef);

      if (totalRankSnap.exists()) {
        const totalRankData = totalRankSnap.data();
        setAllCloverRanks(totalRankData.top3 || []);
      } else {
        // 데이터가 없으면 기본값 설정
        batch.set(totalRankRef, { top3: [] });
        setAllCloverRanks([]); // 기본값으로 빈 배열 설정
      }

      const totalCloverRef = doc(db, "total", "allTotal");
      const totalCloverSnap = await getDoc(totalCloverRef);

      if (totalCloverSnap.exists()) {
        const totalCloverData = totalCloverSnap.data();
        setTotalAllClover(totalCloverData.totalCloverCount || 0); // 모든 클로버의 총합
      } else {
        // 데이터가 없으면 기본값 설정
        batch.set(totalCloverRef, { totalCloverCount: 0 });
        setTotalAllClover(0); // 기본값으로 0 설정
      }

      // 배치 커밋
      await batch.commit();
    };

    fetchAllCloverRanks();
  }, []);

  // 클로버 타입별 랭킹 불러오기
  useEffect(() => {
    const fetchCategoryRanks = async () => {
      const batch = writeBatch(db);

      const categoryRankRef = doc(
        db,
        "ranks",
        `categoryRanks-${activeButton.type}`
      );
      const categoryRankSnap = await getDoc(categoryRankRef);

      if (categoryRankSnap.exists()) {
        const categoryRankData = categoryRankSnap.data();
        setCategoryRanks(categoryRankData.top3 || []);
      } else {
        // 데이터가 없으면 기본값 설정
        batch.set(categoryRankRef, { top3: [] });
        setCategoryRanks([]); // 기본값으로 빈 배열 설정
      }

      // 선택된 클로버 타입의 총합 가져오기
      const categoryCloverRef = doc(db, "total", activeButton.type);
      const categoryCloverSnap = await getDoc(categoryCloverRef);

      if (categoryCloverSnap.exists()) {
        const categoryCloverData = categoryCloverSnap.data();
        setTotalCategoryClover(categoryCloverData.totalCloverCount || 0); // 카테고리별 총합
      } else {
        // 데이터가 없으면 기본값 설정
        batch.set(categoryCloverRef, { totalCloverCount: 0 });
        setTotalCategoryClover(0); // 기본값으로 0 설정
      }

      // 배치 커밋
      await batch.commit();
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
        <AllClover count={totalAllClover} />
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
          <CategoryClover
            count={totalcategoryClover}
            cloverType={activeButton.label}
          />
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
