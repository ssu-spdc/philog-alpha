import styled from "styled-components";
import { CountText } from "@/styles/Texts";

export default function CountTexts() {
  return (
    <CountTextsContainer>
      <CountText>
        <CountText className="category">용기</CountText>
        <br />
        <CountText>20</CountText>
      </CountText>
      <CountText>
        <CountText className="category">지혜</CountText>
        <br />
        <CountText>20</CountText>
      </CountText>
      <CountText>
        <CountText className="category">절제</CountText>
        <br />
        <CountText>20</CountText>
      </CountText>
      <CountText>
        <CountText className="category">돈</CountText>
        <br />
        <CountText>20</CountText>
      </CountText>
    </CountTextsContainer>
  );
}

const CountTextsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: pink; */
  width: 250px;
`;
