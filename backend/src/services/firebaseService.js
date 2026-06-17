const admin = require("firebase-admin");

const serviceAccount = require("../../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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

  return snapshot.docs.map(doc => ({
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

  snapshot.forEach(doc => {
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