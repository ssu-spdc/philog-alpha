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

import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function RankPage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);
  const [allCloverRanks, setAllCloverRanks] = useState([]);
  const [categoryRanks, setCategoryRanks] = useState([]);

  // 전체 랭킹 불러오기
  useEffect(() => {
    const fetchAllCloverRanks = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("totalRank", "asc")); // 전체 랭킹 기준으로 정렬
        const querySnapshot = await getDocs(q);

        let ranks = [];
        querySnapshot.forEach((doc) => {
          ranks.push(doc.data());
        });

        setAllCloverRanks(ranks);
      } catch (error) {
        console.error("Error fetching total ranks: ", error);
      }
    };

    fetchAllCloverRanks();
  }, []);

  // 클로버 타입별 랭킹 불러오기
  useEffect(() => {
    const fetchCategoryRanks = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          orderBy(`ranks.${activeButton.type}.rank`, "asc")
        ); // 선택된 클로버 타입별 rank 기준으로 정렬
        const querySnapshot = await getDocs(q);

        let ranks = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log(userData);
          const count = userData.cloverCounts?.[activeButton.type] || 0;
          ranks.push({
            name: userData.name,
            rank: userData.ranks?.[activeButton.type]?.rank,
            count,
          });
        });

        setCategoryRanks(ranks);
      } catch (error) {
        console.error("Error fetching category ranks: ", error);
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
          {fillRankPlaceholders(allCloverRanks.slice(0, 3)).map(
            (user, index) => {
              const rankIcons = [gold, silver, bronze];
              return (
                <RankCard
                  key={index}
                  name={user.name || "빈 사용자"}
                  src={rankIcons[index]}
                  alt={`${index + 1} rank`}
                  count={user.totalCloverCount || "-"}
                />
              );
            }
          )}
          <div style={{ height: "50px" }} />
          <SectionTitle $nonMargin={true}>클로버 별 랭킹</SectionTitle>
          <CloverTypeButtons
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <div style={{ height: "15px" }} />
          <CategoryClover cloverType={activeButton.label} />
          <div style={{ height: "15px" }} />
          {fillRankPlaceholders(categoryRanks.slice(0, 3)).map(
            (user, index) => {
              const rankIcons = [gold, silver, bronze];
              return (
                <RankCard
                  key={index}
                  name={user.name || "빈 사용자"}
                  src={rankIcons[index]}
                  alt={`${index + 1} rank`}
                  count={user.count || "-"}
                />
              );
            }
          )}
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}
