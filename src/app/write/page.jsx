"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  increment,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../lib/firebase";

import { Main, MobileDisplay, PageContainer } from "@/styles/Containers";
import { SectionTitle, LabelText } from "@/styles/Texts";
import PerCount from "@/app/_component/write/PerCount";
import PhotoInput from "@/app/_component/write/PhotoInput";
import CloverTypeButtons from "@/app/_component/write/CloverTypeButtons";
import DescriptionInput from "@/app/_component/write/DescriptionInput";
import styled from "styled-components";
import { cloverTypes } from "../_constants/type";

export default function WritePage() {
  const [activeButton, setActiveButton] = useState(cloverTypes[0]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [cloverCounts, setCloverCounts] = useState({});

  const router = useRouter();
  const storage = getStorage();

  // 로그인한 유저 정보 및 클로버 카운트 불러오기
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Firestore에서 해당 유저의 cloverCounts 데이터 불러오기
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCloverCounts(userData.cloverCounts || {}); // cloverCounts 가져오기
        }
      }
    });
  }, []);

  const isReady = photo && activeButton && description;

  const handleSubmit = async () => {
    if (!isReady) return;

    console.log(photo);
    setIsUploading(true);

    try {
      // 1. 사진을 Firebase Storage에 업로드
      const photoRef = ref(
        storage,
        `photos/${user.uid}/${Date.now()}_${photo.name}`
      );
      const uploadResult = await uploadBytes(photoRef, photo);

      // 2. 업로드된 사진의 다운로드 URL 가져오기
      const photoURL = await getDownloadURL(uploadResult.ref);

      // 3. Firestore에 데이터 저장
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

      // 4. 배치 쓰기 시작
      const batch = writeBatch(db);

      // 유저의 cloverCounts 업데이트
      const userRef = doc(db, "users", user.uid);
      batch.update(userRef, {
        [`totalCloverCount`]: increment(1),
        [`cloverCounts.${activeButton.type}`]: increment(1),
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

      // 5. 배치 커밋
      await batch.commit();
    } catch (error) {
      console.error("Error uploading data: ", error);
    } finally {
      setIsUploading(false); // 업로드 완료

      router.push(`/`);
    }
  };

  return (
    <Main>
      <MobileDisplay>
        <PageContainer style={{ flexDirection: "column", gap: "20px" }}>
          <PerCount cloverCounts={cloverCounts} />
          <SectionTitle style={{ marginBottom: "4px" }}>글쓰기</SectionTitle>
          <PhotoInput photo={photo} setPhoto={setPhoto} />
          <div>
            <LabelText>클로버 종류</LabelText>
            <CloverTypeButtons
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
          <WriteBtn
            onClick={handleSubmit}
            disabled={!isReady || isUploading}
            $isReady={isReady && !isUploading}
          >
            {isUploading ? "업로드 중" : "등록하기"}
          </WriteBtn>
        </PageContainer>
      </MobileDisplay>
    </Main>
  );
}

const WriteBtn = styled.button`
  width: 320px;
  height: 56px;
  border-radius: 10px;
  background: ${({ $isReady }) => ($isReady ? "#7CE28D" : "#e0e5ea")};
  font-size: 18px;
  font-weight: bold;
  color: ${({ $isReady }) => ($isReady ? "#ffffff" : "#A6ABAF")};
  cursor: ${({ $isReady }) => ($isReady ? "pointer" : "not-allowed")};
  border: none;

  &:disabled {
    background: #e0e5ea;
    color: #a6abaf;
    cursor: not-allowed;
  }
`;
