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
  const [price, setPrice] = useState("0");
  const [isUsed, setIsUsed] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  // 로그인한 유저 정보 및 상품권 정보 불러오기
  useEffect(async () => {
    const userRef = doc(db, "coupon", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
    } else {
      setIsOwner(false);
    }

    setPrice(userData.price);
    setIsUsed(userData.isUsed);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 0. doc 존재여부 검사
      const userRef = doc(db, "coupon", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const dailyPostCount = userData.dailyPostCount || 0;

      // 글 작성 제한: 하루 3개 이상 작성했는지 확인
      if (dailyPostCount >= 3) {
        alert("하루에 3개 이상의 글을 작성할 수 없습니다.");
        setIsLoading(false);
        return;
      }

      // 1. 이미지 압축
      const options = {
        maxSizeMB: 0.45, // 최대 이미지 크기 설정 (1MB)
        maxWidthOrHeight: 1024, // 최대 가로/세로 크기 설정
        useWebWorker: true, // 웹 워커 사용 (성능 향상)
      };
      const compressedPhoto = await imageCompression(photo, options);

      // 2. 사진을 Firebase Storage에 업로드
      const photoRef = ref(
        storage,
        `photos/${user.uid}/${Date.now()}_${photo.name}`
      );
      const uploadResult = await uploadBytes(photoRef, compressedPhoto); // 압축된 이미지 업로드

      // 3. 업로드된 사진의 다운로드 URL 가져오기
      const photoURL = await getDownloadURL(uploadResult.ref);

      // 4. Firestore에 데이터 저장
      const formData = {
        cloverType: activeButton.type,
        description,
        photoURL, // 사진 URL 저장
        createdAt: new Date(), // 작성 시간 저장
        userId: user.uid, // 사용자의 UID 저장
        userEmail: user.email, // 사용자의 이메일 저장
        userDisplayName: user.displayName || "Anonymous", // 사용자의 이름 저장
      };

      await addDoc(collection(db, "feeds"), formData); // Firestore에 데이터 저장

      // 5. 배치 쓰기 시작
      const batch = writeBatch(db);

      // 유저의 cloverCounts, dailyPostCount 업데이트
      batch.update(userRef, {
        [`totalCloverCount`]: increment(1),
        [`cloverCounts.${activeButton.type}`]: increment(1),
        ["dailyPostCount"]: increment(1),
      });

      // 클로버 타입별 카운트 업데이트
      const totalRef = doc(db, "total", activeButton.type);
      const totalSnapshot = await getDoc(totalRef); // 존재 여부 확인
      if (totalSnapshot.exists()) {
        batch.update(totalRef, {
          totalCloverCount: increment(1),
        });
      } else {
        // 해당 문서가 없을 경우 기본값 설정
        batch.set(totalRef, { totalCloverCount: 1 });
      }

      // 전체 클로버 총합 (allTotal) 업데이트
      const allTotalRef = doc(db, "total", "allTotal");
      const allTotalSnapshot = await getDoc(allTotalRef);
      if (allTotalSnapshot.exists()) {
        batch.update(allTotalRef, {
          totalCloverCount: increment(1),
        });
      } else {
        // 해당 문서가 없을 경우 기본값 설정
        batch.set(allTotalRef, { totalCloverCount: 1 });
      }

      // 6. 배치 커밋
      await batch.commit();
    } catch (error) {
      console.error("Error uploading data: ", error);
    } finally {
      setIsLoading(false); // 업로드 완료

      router.push(`/`);
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
