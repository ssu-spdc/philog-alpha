import Card from "@/components/Card";
import HomeTop from "@/components/HomeTop";
import { SectionTitle, SectionTitleContainer } from "@/styles/Texts";

export default function HomePage() {
  return (
    <>
      <HomeTop />
      <SectionTitleContainer>
        <SectionTitle>
          <SectionTitle className="hilight">필로소퍼</SectionTitle>들의 클로버
        </SectionTitle>
      </SectionTitleContainer>
      <Card />
      <Card />
    </>
  );
}
