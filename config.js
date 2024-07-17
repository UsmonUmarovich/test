import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJksMRrT4AdF9e-I5yDT_xwl4oL56LvE",
  authDomain: "test-d4ff8.firebaseapp.com",
  databaseURL:
    "https://test-d4ff8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-d4ff8",
  storageBucket: "test-d4ff8.appspot.com",
  messagingSenderId: "221788458708",
  appId: "1:221788458708:web:ecea098c1f7e8dfb8cf541",
  measurementId: "G-CTR4BN1GDD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;