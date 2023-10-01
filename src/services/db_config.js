// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuZRr6jURJKbFn0xzyqgGRM8kyX_P_0sM",
  authDomain: "cluxtercoin-acb29.firebaseapp.com",
  projectId: "cluxtercoin-acb29",
  storageBucket: "cluxtercoin-acb29.appspot.com",
  messagingSenderId: "787295957759",
  appId: "1:787295957759:web:822feac51532a6072f52ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app)

// Export the app and db for use in other files
export { db, storage };