import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

const deletePost = async (postId, photoURL, userId, cloverType) => {
  try {
    await deleteDoc(doc(db, "feeds", postId));

    if (photoURL) {
      const imageRef = ref(storage, photoURL);
      await deleteObject(imageRef);
    }

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      [`totalCloverCount`]: increment(-1),
      [`cloverCounts.${cloverType}`]: increment(-1),
      [`dailyPostCount`]: increment(-1),
    });

    console.log("피드가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("피드 삭제 중 오류 발생:", error);
  }
};

export { deletePost };
