import styled from "styled-components";
import { TopText, TopTitle } from "@/styles/Texts";
import Icon2 from "./Icon2";

export default function HomeTop() {
  return (
    <HomeTopContainer>
      <Spacer />
      <RowContainer>
        <TopTitle>
          필로그에서
          <br />
          <TopTitle className="hilight">클로버</TopTitle>를 모아요!
        </TopTitle>
        <Icon2 />
      </RowContainer>
      <TopText>
        필로그에 인증사진 올리고{" "}
        <TopText className="hilight">1등 도전하기 {">"}</TopText>
      </TopText>
      <Spacer />
    </HomeTopContainer>
  );
}

const HomeTopContainer = styled.div`
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
  justify-content: space-between;
`;

const Spacer = styled.div`
  height: 20px;
`;

