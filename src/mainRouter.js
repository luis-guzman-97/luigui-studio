import { createRouter, createWebHashHistory } from "vue-router";
import ErrorPage from "@/pages/ErrorPage.vue";
import EncargosPage from "@/pages/EncargosPage.vue";

export const routes = [
    { path: "/encargos", component: EncargosPage },
    { path: "/", component: EncargosPage },
    { path: "/error", component: ErrorPage },
    { path: "/:pathMatch(.*)*", component: ErrorPage },
  ];

export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  });