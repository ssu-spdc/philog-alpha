import Card from "@/components/Card";
import PerCount from "@/components/PerCount";
import { SectionTitle, SectionTitleContainer } from "@/styles/Texts";
import styled from "styled-components";

export default function WritePage() {
  return (
    <WritePageContainer>
      <PerCount />
    </WritePageContainer>
  );
}

const WritePageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 320px;
`