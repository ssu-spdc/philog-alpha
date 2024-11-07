"use client";

import { useState } from "react";
import { Main, MobileDisplay } from "@/styles/Containers";
import InstaIcon from "@/app/_component/topNav/instaIcon";
import Image from "next/image";
import MenuIcon from "@/icons/menu_icon.svg";
import TopLogo from "@/icons/top-logo.png";
import TopClover from "@/icons/top-clover.png";
import DefaultProfileImage from "@/icons/default.png"; // 기본 프로필 이미지
import { SideText } from "@/styles/Texts";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function TopNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <Main>
      <MobileDisplay>
        <FlexDiv>
          <LogoDiv onClick={handleLogoClick}>
            <Image width={24} height={25} src={TopClover} alt="Top Clover" />
            <Image width={48} height={15} src={TopLogo} alt="Top Logo" />
          </LogoDiv>
          <MenuIconDiv onClick={toggleSidebar}>
            <MenuIcon />
          </MenuIconDiv>
        </FlexDiv>
      </MobileDisplay>

      <Overlay
        $isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />
      <Sidebar $isOpen={isSidebarOpen}>
        {user ? (
          <SidebarContent>
            <MyContainer>
              <MyProfile>
                <Image
                  width={40}
                  height={40}
                  src={DefaultProfileImage}
                  alt="profile image"
                />
              </MyProfile>
              <SideText style={{ fontWeight: "600" }}>
                {user.displayName}님,
              </SideText>
              <SideText>오늘도 클로버를</SideText>
              <SideText>모아봐요!</SideText>
            </MyContainer>
            <ul>
              <li onClick={() => handleMenuItemClick("/write")}>글쓰기</li>
              <li onClick={() => handleMenuItemClick("/rank")}>랭킹</li>
              <li onClick={() => handleMenuItemClick("/question")}>문의하기</li>
              <li style={{ marginTop: "60px" }}>
                <InstaIcon />
              </li>
            </ul>
          </SidebarContent>
        ) : (
          <SidebarContent>
            <MyContainer>
              <MyProfile>
                <Image
                  width={40}
                  height={40}
                  src={DefaultProfileImage}
                  alt="profile image"
                />
              </MyProfile>
              <SideText>
                로그인 후 <br />
                클로버를 수집하고 <br />
                랭킹을 확인해보세요!
              </SideText>
            </MyContainer>
            <ul>
              <li onClick={() => handleMenuItemClick("/login")}>로그인</li>
              <li style={{ marginTop: "60px" }}>
                <InstaIcon />
              </li>
            </ul>
          </SidebarContent>
        )}
      </Sidebar>
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
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  z-index: 20;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
`;

const SidebarContent = styled.div`
  padding: 20px;
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`;

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

const MyProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
  overflow: hidden;
`;
