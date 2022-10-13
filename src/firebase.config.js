import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAC5I6cE90Z8P4iGPBoJDucEhj_3n596GA",
  authDomain: "restaurant-6255e.firebaseapp.com",
  databaseURL: "https://restaurant-6255e-default-rtdb.firebaseio.com",
  projectId: "restaurant-6255e",
  storageBucket: "restaurant-6255e.appspot.com",
  messagingSenderId: "29325452164",
  appId: "1:29325452164:web:73fb5c864b8106703073d1",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
