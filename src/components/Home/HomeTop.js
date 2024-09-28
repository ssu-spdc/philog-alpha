import styled from "styled-components";
import { TopText, TopTitle } from "@/styles/Texts";

export default function HomeTop() {
  return (
    <HomeTopContainer>
      <TopTitle>
        필로그에서
        <br />
        <TopTitle className="hilight">클로버</TopTitle>를 모아요!
      </TopTitle>
      <TopText>
        필로그에 인증사진 올리고{" "}
        <TopText className="hilight">1등 도전하기 {">"}</TopText>
      </TopText>
    </HomeTopContainer>
  );
}

const HomeTopContainer = styled.div`
  background-color: green;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10%;
`;
