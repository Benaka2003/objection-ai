const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

async function saveAnalysis(data) {
  const docRef = await db.collection("analyses").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return docRef.id;
}

async function getHistory(limit = 20) {
  const snapshot = await db
    .collection("analyses")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function getAnalytics() {
  const snapshot = await db.collection("analyses").get();

  const analytics = {
    totalAnalyses: snapshot.size,
    price: 0,
    trust: 0,
    timing: 0,
    authority: 0,
  };

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (analytics[data.category] !== undefined) {
      analytics[data.category]++;
    }
  });

  return analytics;
}

module.exports = {
  db,
  saveAnalysis,
  getHistory,
  getAnalytics,
};