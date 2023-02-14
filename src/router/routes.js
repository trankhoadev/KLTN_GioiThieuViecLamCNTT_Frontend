import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import SignIn from "pages/SignIn.vue";

const router = [
  {
    path: "/",
    component: SignIn,
  },
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "/trang-chu", component: IndexPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default router;
