import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./mainRouter.js";
/* import { initializeApp } from "firebase/app"; */

import "bootstrap/dist/css/bootstrap.css";
import "@/assets/main.css";
import "bootstrap/dist/js/bootstrap.js";

/* const firebaseConfig = {
  apiKey: "AIzaSyDpN45_kr8b7XyV6PO7N7r9VQL1Af-aoPc",
  authDomain: "luigui-studio.firebaseapp.com",
  projectId: "luigui-studio",
  storageBucket: "luigui-studio.appspot.com",
  messagingSenderId: "755872391081",
  appId: "1:755872391081:web:36dfae5444b089eeebaeb8",
  measurementId: "G-5S211FYSLN",
}; */

/* initializeApp(firebaseConfig); */

const app = createApp(App);
app.use(router);
app.mount("#app");
