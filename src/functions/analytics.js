import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

/**
 * Users 컬렉션 데이터를 CSV로 추출
 */
async function exportUsersToCSV() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const users = [];
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      const cloverCounts = data.cloverCounts || {
        courage: 0,
        money: 0,
        temperance: 0,
        wisdom: 0,
      };

      users.push({
        id: doc.id,
        courage: cloverCounts.courage,
        money: cloverCounts.money,
        temperance: cloverCounts.temperance,
        wisdom: cloverCounts.wisdom,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : "",
        dailyPostCount: data.dailyPostCount || 0,
        email: data.email || "",
        name: data.name || "",
        studentId: data.studentId || "",
        totalCloverCount: data.totalCloverCount || 0,
      });
    });

    if (users.length > 0) {
      const usersCSV = convertToCSV(users);
      downloadCSV(usersCSV, "users.csv");
    } else {
      console.log("No users data found.");
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
  }
}

/**
 * Feeds 컬렉션 데이터를 CSV로 추출
 */
async function exportFeedsToCSV() {
  try {
    const feedsSnapshot = await getDocs(collection(db, "feeds"));
    const feeds = [];
    feedsSnapshot.forEach((doc) => {
      const data = doc.data();

      feeds.push({
        id: doc.id,
        userId: data.userId || "",
        userDisplayName: data.userDisplayName || "",
        description: data.description || "",
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : "",
        cloverType: data.cloverType || "",
      });
    });

    if (feeds.length > 0) {
      const feedsCSV = convertToCSV(feeds);
      downloadCSV(feedsCSV, "feeds.csv");
    } else {
      console.log("No feeds data found.");
    }
  } catch (error) {
    console.error("Error fetching feeds data:", error);
  }
}

/**
 * 데이터를 CSV 형식으로 변환
 * @param {Array<Object>} data - 변환할 데이터 배열
 * @returns {string} CSV 형식 문자열
 */
function convertToCSV(data) {
  if (!data.length) return "";

  // CSV 헤더 생성
  const headers = Object.keys(data[0]).join(",") + "\n";

  // CSV 데이터 행 생성
  const rows = data
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          if (typeof value === "string" || typeof value === "number") {
            return `"${value}"`; // 특수 문자 대응
          }
          return ""; // null 또는 undefined 처리
        })
        .join(",");
    })
    .join("\n");

  return headers + rows;
}

/**
 * CSV 파일 다운로드
 * @param {string} content - CSV 콘텐츠
 * @param {string} fileName - 파일명
 */
function downloadCSV(content, fileName) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { exportFeedsToCSV, exportUsersToCSV };

/*
// 실행 함수 (필요에 따라 호출)
exportUsersToCSV();
exportFeedsToCSV();
*/

/*
users.csv 예시
id,courage,money,temperance,wisdom,createdAt,dailyPostCount,email,name,studentId,totalCloverCount
TplkSd0hvXUGZPg8cdyvwsQqrS23,1,0,0,1,"2024-11-11T02:47:01.000Z",0,"nick4976@naver.com","김민석","20240525",2
...

feeds.csv 예시
id,userId,content,createdAt,cloverType
abc123,"TplkSd0hvXUGZPg8cdyvwsQqrS23","This is a test post.","2024-11-30T12:34:56.000Z","wisdom"
...
*/
