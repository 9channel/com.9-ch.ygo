import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/swpf",
      name: "swpf",
      component: () => import("@/views/SwpfView.vue"),
    },
    {
      path: "/ttl",
      name: "ttl",
      component: () => import("@/views/TtlView.vue"),
    },
  ],
});

export default router;
