"use client";

import LoginInput from "@/app/_component/login/LoginInput";
import { useState } from "react";
import LoginButton from "../../_component/login/LoginButton";
import RedirectText from "../../_component/reset/RedirectText";
import { useRouter } from "next/navigation";
import { auth } from "@/../lib/firebase";
import ErrorText from "@/app/_component/login/ErrorText";
import SendText from "@/app/_component/reset/SendText";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 필드가 비어있는지 확인
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
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
    <>
      <form onSubmit={handleSubmit}>
        <LoginInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginButton text="비밀번호 변경하기" type="submit" />
      </form>
      {message && <SendText message={message} />}
      {error && <ErrorText message={error} />}
      <RedirectText type="login" />
    </>
  );
}
