"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import Card from "@/app/_component/home/Card";
import HomeTop from "@/app/_component/home/HomeTop";
import { SectionTitle, SectionTitleContainer } from "@/styles/Texts";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore"; // orderBy 추가
import { db } from "../../lib/firebase";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "feeds", postId));
      console.log("피드가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("피드 삭제 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "feeds");

      // createdAt 필드를 기준으로 최신순 정렬
      const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      // 각 문서의 ID와 데이터를 함께 저장
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <Main>
      <MobileDisplay>
        <HomeTop />
        <SectionTitleContainer>
          <SectionTitle>
            <SectionTitle className="hilight">필로소퍼</SectionTitle>들의 클로버
          </SectionTitle>
        </SectionTitleContainer>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Card key={index} post={post} onDelete={deletePost} />
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </MobileDisplay>
    </Main>
  );
}
