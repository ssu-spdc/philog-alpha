"use client";

import HomePage from "@/Pages/HomePage";
import WritePage from "@/Pages/WritePage";
import { Main, MobileDisplay } from "@/styles/Containers";

export default function Home() {
  return (
    <Main>
      <MobileDisplay>
        <WritePage />
      </MobileDisplay>
    </Main>
  );
}
