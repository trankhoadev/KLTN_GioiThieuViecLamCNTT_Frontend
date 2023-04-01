import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import SignIn from "pages/SignIn.vue";
import SignUp from "pages/SignUp.vue";
import SearchJob from "pages/job/SearchJob.vue";

const router = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: IndexPage },
      { path: "/dang-nhap", component: SignIn },
      { path: "/dang-ky", component: SignUp },
      { path: "/search", component: SearchJob },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default router;
