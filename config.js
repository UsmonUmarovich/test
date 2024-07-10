import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKJksMRrT4AdF9e-I5yDT_xwl4oL56LvE",
  authDomain: "test-d4ff8.firebaseapp.com",
  projectId: "test-d4ff8",
  storageBucket: "test-d4ff8.appspot.com",
  messagingSenderId: "221788458708",
  appId: "1:221788458708:web:ecea098c1f7e8dfb8cf541",
  measurementId: "G-CTR4BN1GDD"
};

const firebase = initializeApp(firebaseConfig);

export default firebase