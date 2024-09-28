"use client";

import HomeTop from "@/components/Home/HomeTop";
import HomePage from "@/Pages/HomePage";
import { CloverButton } from "@/styles/Buttons";
import { Main, MobileDisplay } from "@/styles/Containers";
import { SectionTitle } from "@/styles/Texts";

import styled from "styled-components";

export default function Home() {
  return (
    <Main>
      <MobileDisplay>
        <HomePage />
      </MobileDisplay>
    </Main>
  );
}
