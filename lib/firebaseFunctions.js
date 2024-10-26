import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "feeds", postId)); // "feeds"는 컬렉션 이름이고, postId는 문서 ID입니다.
    console.log("피드가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("피드 삭제 중 오류 발생:", error);
  }
};

export { deletePost };
