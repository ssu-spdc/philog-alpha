"use client";

import LoginInput from "@/app/_component/login/LoginInput";
import { useState } from "react";
import LoginButton from "../../_component/login/LoginButton";
import RedirectText from "../../_component/reset/RedirectText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/../lib/firebase";
import ErrorText from "@/app/_component/login/ErrorText";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 필드가 비어있는지 확인
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // Firebase 로그인
      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공");
      console.log("User Info:", auth.currentUser);

      // 메인 페이지로 이동
      router.push("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  // Firebase 에러 코드를메시지로 변환하는 함수
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "올바른 이메일 형식을 입력해주세요!";
      case "auth/invalid-credential":
        return "이메일이 올바르지 않습니다.";
      default:
        return "문제가 발생했습니다. 다시 시도해주세요.";
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
      {error && <ErrorText message={error} />}
      <RedirectText type="login" />
    </>
  );
}
