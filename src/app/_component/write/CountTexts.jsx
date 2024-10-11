import styled from "styled-components";
import { CountText } from "@/styles/Texts";

export default function CountTexts({ cloverCounts }) {
  console.log();
  return (
    <CountTextsContainer>
      <CountText>
        <CountText className="category">용기</CountText>
        <br />
        <CountText>{cloverCounts.courage || 0}</CountText>
      </CountText>

      <CountText>
        <CountText className="category">절제</CountText>
        <br />
        <CountText>{cloverCounts.temperance || 0}</CountText>
      </CountText>
      <CountText>
        <CountText className="category">돈</CountText>
        <br />
        <CountText>{cloverCounts.money || 0}</CountText>
      </CountText>
      <CountText>
        <CountText className="category">지혜</CountText>
        <br />
        <CountText>{cloverCounts.wisdom || 0}</CountText>
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
