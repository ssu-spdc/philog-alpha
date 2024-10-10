"use client";
import { Main, MobileDisplay } from "@/styles/Containers";
import Card from "@/app/_component/home/Card";
import HomeTop from "@/app/_component/home/HomeTop";
import { SectionTitle, SectionTitleContainer } from "@/styles/Texts";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "feeds"));
      const postsData = querySnapshot.docs.map((doc) => doc.data());
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
          posts.map((post, index) => <Card key={index} post={post} />)
        ) : (
          <p>Loading posts...</p>
        )}
      </MobileDisplay>
    </Main>
  );
}
