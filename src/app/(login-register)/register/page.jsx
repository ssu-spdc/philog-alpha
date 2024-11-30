"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/../lib/firebase"; // firebase 설정 가져오기
import LoginInput from "@/app/_component/login/LoginInput";
import LoginButton from "../../_component/login/LoginButton";
import RedirectText from "../../_component/login/RedirectText";
import ErrorText from "@/app/_component/login/ErrorText";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // 필수 입력란 확인
    if (!email || !password || !name || !studentId) {
      setError("정보를 모두 입력해주세요!");
      return;
    }

    try {
      // Firebase에 이메일과 비밀번호로 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 사용자 프로필 업데이트 (displayName)
      await updateProfile(user, { displayName: name });

      // Firestore에 사용자 정보 추가
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        studentId: studentId,
        createdAt: new Date(),
        cloverCounts: {
          courage: 0,
          wisdom: 0,
          money: 0,
          temperance: 0,
        },
        totalCloverCount: 0,
        dailyPostCount: 0,
      });

      console.log("회원가입 성공");
      // 회원가입 후 로그인 페이지로 이동
      router.push("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  // Firebase 에러 코드를 메시지로 변환하는 함수
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "올바른 이메일 형식을 입력해주세요!";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6자 이상이어야 합니다.";
      default:
        return "회원가입 중 문제가 발생했습니다. 다시 시도해주세요.";
    }
  };

  return (
    <>
      <form onSubmit={() => alert("이벤트가 종료되었습니다.")}>
        {/* <form onSubmit={handleSignup}> */}
        <LoginInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <LoginInput
          label="이름"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LoginInput
          label="학번"
          placeholder="학번을 입력해주세요."
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <LoginButton text="회원가입" type="submit" />
      </form>
      {error && <ErrorText message={error} />}
      <RedirectText type="register" />
    </>
  );
}
