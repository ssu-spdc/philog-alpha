"use client";

import EmailInput from "@/app/_component/question/EmailInput";
import { useState } from "react";
import LoginButton from "../_component/login/LoginButton";
import { useRouter } from "next/navigation";
import { auth } from "@/../lib/firebase";
import ErrorText from "@/app/_component/login/ErrorText";
import SendText from "@/app/_component/reset/SendText";
import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { sendPasswordResetEmail } from "firebase/auth";
import { CardInfo, LabelText } from "@/styles/Texts";
import { getAuth } from "firebase/auth";

export default function Page() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 필드가 비어있는지 확인
    if (!code) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, code);
      setMessage(
        "비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인하세요."
      );
      setError("");
    } catch (error) {
      setError(
        "비밀번호 재설정 이메일 전송에 실패했습니다. 이메일 주소를 확인하세요."
      );
      setMessage("");
    }
  };

  return (
    <Main>
      <MobileDisplay>
        <div style={{ height: "15px" }} />

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <LabelText>
            <text style={{ fontSize: "25px" }}>{user.displayName} </text>님은
          </LabelText>
          <LabelText>10,000원 상품권을 사용할 수 있습니다</LabelText>
          <div style={{ height: "20px" }} />
          <CardInfo>사용 기한은 2024년 12월 31일까지 입니다.</CardInfo>
          <CardInfo>사용 완료 시, 해당 페이지는 폐쇄됩니다.</CardInfo>
          <div style={{ height: "40px" }} />
          <EmailInput
            label="확인코드"
            placeholder="확인코드를 입력해주세요."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <LoginButton text="사용 확인" type="submit" />
        </form>
        {message && <SendText message={message} />}
        {error && <ErrorText message={error} />}
        {/* <RedirectText type="resetPassword" /> */}
      </MobileDisplay>
    </Main>
  );
}
