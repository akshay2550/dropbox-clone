import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZaY6eiy_T3DTsoQ6dzRk3V-QH3imrYzU",
  authDomain: "dropbox-clone-61400.firebaseapp.com",
  projectId: "dropbox-clone-61400",
  storageBucket: "dropbox-clone-61400.appspot.com",
  messagingSenderId: "862677505707",
  appId: "1:862677505707:web:d8abd5307853e1953549ee",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
