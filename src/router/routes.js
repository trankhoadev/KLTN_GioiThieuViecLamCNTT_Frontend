import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import SignIn from "pages/SignIn.vue";

const router = [
  // {
  //   path: "/",
  //   component: MainLayout,
  //   children: [{ path: "/dang-nhap", component: SignIn }],
  // },
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "/dang-nhap", component: SignIn }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default router;
