"use client";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle, TopTitle } from "@/styles/Texts";
import Image from "next/image";
import gold from "@/icons/gold.png";
import styled from "styled-components";

export default function RankPage() {
  return (
    <Main>
      <MobileDisplay>
        {/* <PerCount /> */}
        <TopTitle style={{ textAlign: "center" }}>
          <TopTitle className="lighter">지금까지 모인</TopTitle>
          <br />
          <TopTitle className="hilight">클로버</TopTitle>
        </TopTitle>
        <div>
          <Count>28</Count>
          <Gae>개</Gae>
        </div>
      </MobileDisplay>
      <PageContainer>
        <SectionTitle>전체 랭킹</SectionTitle>
        <RankContainer>
          <Image width={36} height={36} src={gold} alt="gold rank" />
          <ProfileImgContainer />
          <Nickname>박요셉</Nickname>
          <CloverCounterContainer>
            <CloverCount>21</CloverCount>
          </CloverCounterContainer>
        </RankContainer>
      </PageContainer>
    </Main>
  );
}

const Count = styled.text`
  font-size: 45px;
`;
const Gae = styled.text`
  font-size: 25px;
`;

const RankContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: ce; */
  /* justify-content: center; */
  align-items: center;
  height: 100px;
  width: 100%;
  /* background-color: pink; */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
`;

const ProfileImgContainer = styled.div`
  height: 61px;
  width: 61px;
  background-color: gray;
  border-radius: 15px;
`;

const Nickname = styled.text`
  font-size: 22px;
  font-weight: 600;
`;

const CloverCounterContainer = styled.div`
  width: 90px;
  height: 45px;
  background-color: #f1fff4;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CloverCount = styled.text`
  font-size: 25px;
  color: #7ce58f;
  font-weight: bold;
`;
