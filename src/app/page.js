"use client";

import HomePage from "@/Pages/HomePage";
import { Main, MobileDisplay } from "@/styles/Containers";

export default function Home() {
  return (
    <Main>
      <MobileDisplay>
        <HomePage />
      </MobileDisplay>
    </Main>
  );
}
