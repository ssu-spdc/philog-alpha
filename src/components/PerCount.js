import styled from "styled-components";
import { SectionTitle, CountText } from "@/styles/Texts";
import Icon from "./Icon";

export default function PerCount() {
  return (
    <PerCountContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Divider />
      <SectionTitle style={{ textAlign: "center" }}>
        <SectionTitle className="lighter">지금까지 모은</SectionTitle>
        <br />
        <SectionTitle className="hilight">클로버</SectionTitle>
      </SectionTitle>

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
    </PerCountContainer>
  );
}

const PerCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 310px;
  width: 100%;
  /* background-color: pink; */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
`;

const IconContainer = styled.div`
  height: 115px;
  width: 115px;
  background-color: #f1fff4;
  border-radius: 90px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountTextsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: pink; */
  width: 250px;
`;

const Divider = styled.div`
  height: 25px;
`;
