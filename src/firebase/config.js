import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpN45_kr8b7XyV6PO7N7r9VQL1Af-aoPc",
  authDomain: "luigui-studio.firebaseapp.com",
  projectId: "luigui-studio",
  storageBucket: "luigui-studio.appspot.com",
  messagingSenderId: "755872391081",
  appId: "1:755872391081:web:36dfae5444b089eeebaeb8",
  measurementId: "G-5S211FYSLN",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
