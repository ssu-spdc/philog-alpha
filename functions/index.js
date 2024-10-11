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

exports.updateRankings = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const afterData = change.after.data();

    // 전체 유저 데이터 가져오기
    const usersSnapshot = await admin.firestore().collection("users").get();
    let users = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({ id: doc.id, ...userData });
    });

    // 1. 전체 클로버 수로 전체 랭킹 계산
    users.sort((a, b) => (b.totalCloverCount || 0) - (a.totalCloverCount || 0));
    let rank = 1;
    for (let user of users) {
      await admin.firestore().collection("users").doc(user.id).update({
        totalRank: rank++,
      });
    }

    // 2. 클로버 타입별 랭킹 계산
    const cloverTypes = ["용기", "절제", "돈", "지혜"];
    for (let type of cloverTypes) {
      users.sort(
        (a, b) =>
          (b.cloverCounts?.[type]?.count || 0) -
          (a.cloverCounts?.[type]?.count || 0)
      );
      let typeRank = 1;
      for (let user of users) {
        await admin
          .firestore()
          .collection("users")
          .doc(user.id)
          .update({
            [`cloverCounts.${type}.rank`]: typeRank++,
          });
      }
    }
  });
