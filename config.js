import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";

const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_KEY;

if (!serviceAccountBase64) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT environment variable");
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://test-d4ff8-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = getFirestore();

export default db;
