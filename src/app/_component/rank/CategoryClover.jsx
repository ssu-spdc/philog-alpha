import { TopTitle } from "@/styles/Texts";
import styled from "styled-components";

export default function CategoryClover(props) {
  const { cloverType } = props;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ height: "15px" }} />
      <TopTitle>
        <TopTitle className="hilight">{cloverType}</TopTitle>
        <br />
        <TopTitle className="lighter">클로버</TopTitle>
      </TopTitle>
      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
        <Count>28</Count>
        <Gae>개</Gae>
      </div>
    </div>
  );
}

const Count = styled.text`
  font-size: 60px;
  font-weight: bold;

  margin-right: 7px;
`;
const Gae = styled.text`
  font-size: 25px;
`;
