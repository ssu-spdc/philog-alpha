"use client";

import { WriteBtn } from "@/styles/Buttons";
import { exportFeedsToCSV, exportUsersToCSV } from "../../functions/analytics";

export default function Page() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ height: "40px" }} />
      <WriteBtn
        $isReady={true}
        onClick={() => {
          exportUsersToCSV();
        }}
      >
        유저 csv
      </WriteBtn>
      <div style={{ height: "40px" }} />
      <WriteBtn
        $isReady={true}
        onClick={() => {
          exportFeedsToCSV();
        }}
      >
        피드 csv
      </WriteBtn>
    </div>
  );
}
