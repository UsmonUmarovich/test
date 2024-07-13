import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const loadServiceAccount = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const jsonPath = join(__dirname, "./serviceAccountKey.json");
  return JSON.parse(readFileSync(jsonPath, "utf-8"));
};

const serviceAccount = loadServiceAccount();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://test-d4ff8-default-rtdb.asia-southeast1.firebasedatabase.app", // Replace with your database URL
});

const db = admin.firestore();

export default db;