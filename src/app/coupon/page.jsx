"use client";

import EmailInput from "@/app/_component/question/EmailInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/../lib/firebase";
import ErrorText from "@/app/_component/login/ErrorText";
import { Main, MobileDisplay } from "@/styles/Containers";
import { onAuthStateChanged } from "firebase/auth";
import { CardInfo, LabelText } from "@/styles/Texts";
import { db } from "@/../lib/firebase";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { WriteBtn } from "@/styles/Buttons";

export default function Page() {
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [isUsed, setIsUsed] = useState(false);
  const [isOwner, setIsOwner] = useState(true); // 쿠폰 소유자 여부
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [couponRef, setCouponRef] = useState(null);
  const [couponData, setCouponData] = useState(null);

  const router = useRouter();

  // 로그인한 유저 정보 및 상품권 정보 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 현재 로그인한 사용자 설정
        try {
          const ref = doc(db, "coupon", currentUser.uid);
          setCouponRef(ref); // couponRef 설정
          const couponSnap = await getDoc(ref);

          if (couponSnap.exists()) {
            const data = couponSnap.data();
            setCouponData(data); // couponData 설정
            setPrice(data.price); // 금액 업데이트
            setIsUsed(data.isUsed); // 사용 여부 업데이트
          } else {
            setIsOwner(false); // 소유자 아님
          }
        } catch (err) {
          console.error(err);
          setError("쿠폰 정보를 불러오는 중 문제가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/login"); // 로그아웃 상태면 리디렉션
      }
    });

    return () => unsubscribe(); // 구독 해제
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(false);
    try {
      if (!user) return;

      // 쿠폰을 이미 썼는지 확인.
      if (isUsed) {
        alert("상품권이 이미 사용됐습니다.");
        setIsLoading(false);
        return;
      }

      if (!couponData || couponData.code != code.trim()) {
        setError("코드가 틀렸습니다. 다시 확인해주세요.");
        setIsLoading(false);
        return;
      }

      // 5. 배치 쓰기 시작
      const batch = writeBatch(db);
      // 유저의 isUsed 업데이트
      batch.update(couponRef, {
        [`isUsed`]: true,
      });

      await batch.commit();
      setIsUsed(true);
    } catch (error) {
      setError("Error uploading data: ", error);
    } finally {
      setIsLoading(false); // 업로드 완료
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
            <text style={{ fontSize: "25px" }}>
              {user ? user.displayName : ""}{" "}
            </text>
            님은
          </LabelText>
          {isOwner && (
            <LabelText>{price}원 상품권을 사용할 수 있습니다</LabelText>
          )}
          {!isOwner && <LabelText>사용할 수 있는 상품권이 없습니다</LabelText>}
          <div style={{ height: "20px" }} />
          <CardInfo>사용 기한은 2024년 12월 31일까지 입니다.</CardInfo>
          <CardInfo>사용 완료 시, 해당 페이지는 폐쇄됩니다.</CardInfo>
          <div style={{ height: "40px" }} />
          {isUsed ? (
            <div></div>
          ) : (
            <EmailInput
              label="확인코드"
              placeholder="확인코드를 입력해주세요."
              email={code}
              setEmail={(e) => setCode(e)}
              type="text"
            />
          )}
          <div style={{ height: "15px" }} />
          <WriteBtn
            onClick={handleSubmit}
            disabled={!code || isUsed || !user}
            $isReady={code && !isUsed && !isLoading}
          >
            {isUsed ? "사용 완료" : "사용 확인"}
          </WriteBtn>
          {/* <LoginButton text="사용 확인" type="submit" /> */}
        </form>
        {isLoading && <div>로딩 중...</div>}
        {error && <ErrorText message={error} />}
        {/* <RedirectText type="resetPassword" /> */}
      </MobileDisplay>
    </Main>
  );
}
