import { TopTitle } from "@/styles/Texts";
import styled from "styled-components";

export default function AllClover({ count }) {
  return (
    <>
      <TopTitle style={{ textAlign: "center" }}>
        <TopTitle className="lighter">지금까지 모인</TopTitle>
        <br />
        <TopTitle className="hilight">클로버</TopTitle>
      </TopTitle>
      <div>
        <Count>{count}</Count>
        <Gae>개</Gae>
      </div>
    </>
  );
}

const Count = styled.text`
  font-size: 60px;

  margin-right: 7px;
`;
const Gae = styled.text`
  font-size: 25px;
`;
