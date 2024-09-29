import styled from "styled-components";
import { SectionTitle } from "@/styles/Texts";
import Icon from "./Icon";
import CountTexts from "./CountTexts";

export default function PerCount() {
  return (
    <PerCountContainer>
      <Icon />
      <Divider />
      <SectionTitle style={{ textAlign: "center" }}>
        <SectionTitle className="lighter">지금까지 모은</SectionTitle>
        <br />
        <SectionTitle className="hilight">클로버</SectionTitle>
      </SectionTitle>
      <CountTexts />
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

const Divider = styled.div`
  height: 25px;
`;
