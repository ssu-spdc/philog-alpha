/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// 기존의 updateRankings 함수
exports.updateRankings = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const usersSnapshot = await admin.firestore().collection("users").get();
    let users = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({ id: doc.id, ...userData });
    });

    // 1. 전체 랭킹 상위 3명 계산
    users.sort((a, b) => (b.totalCloverCount || 0) - (a.totalCloverCount || 0));
    const top3Total = users.slice(0, 3);

    // `ranks` 컬렉션의 totalRank에 상위 3명 업데이트
    await admin
      .firestore()
      .collection("ranks")
      .doc("totalRank")
      .set({
        top3: top3Total.map((user, index) => ({
          name: user.name,
          totalCloverCount: user.totalCloverCount,
          rank: index + 1,
        })),
      });

    // 2. 클로버 타입별 상위 3명 계산 및 업데이트
    const cloverTypes = ["courage", "money", "temperance", "wisdom"];
    for (let type of cloverTypes) {
      users.sort(
        (a, b) => (b.cloverCounts?.[type] || 0) - (a.cloverCounts?.[type] || 0)
      );
      const top3Category = users.slice(0, 3);

      // `ranks` 컬렉션의 해당 클로버 타입 문서에 상위 3명 업데이트
      await admin
        .firestore()
        .collection("ranks")
        .doc(`categoryRanks-${type}`)
        .set({
          top3: top3Category.map((user, index) => ({
            name: user.name,
            cloverCount: user.cloverCounts?.[type],
            rank: index + 1,
          })),
        });
    }
  });

// 새로운 resetDailyPostCount 함수
exports.resetDailyPostCount = functions.pubsub
  .schedule("every day 00:00")
  .onRun(async (context) => {
    const usersSnapshot = await admin.firestore().collection("users").get();

    const batch = admin.firestore().batch();

    usersSnapshot.forEach((doc) => {
      const userRef = admin.firestore().collection("users").doc(doc.id);
      batch.update(userRef, { dailyPostCount: 0 });
    });

    await batch.commit();
    console.log("모든 유저의 dailyPostCount가 0으로 초기화되었습니다.");
  });
