"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import Image from "next/image";
import MenuIcon from "@/icons/menu_icon.svg";
import TopLogo from "@/icons/top-logo.png";
import TopClover from "@/icons/top-clover.png";
import styled from "styled-components";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Main>
      <MobileDisplay>
        <FlexDiv>
          <LogoDiv onClick={handleLogoClick}>
            <Image width={24} height={25} src={TopClover} alt="Top Clover" />
            <Image width={48} height={15} src={TopLogo} alt="Top Logo" />
          </LogoDiv>
          <MenuIconDiv>
            <MenuIcon />
          </MenuIconDiv>
        </FlexDiv>
      </MobileDisplay>
    </Main>
  );
}

const FlexDiv = styled.div`
  width: 100%;
  height: 48px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const MenuIconDiv = styled.div`
  margin-right: 20px;
`;
