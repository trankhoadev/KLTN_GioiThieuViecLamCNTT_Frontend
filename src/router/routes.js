/* About Template */
import AboutUs from "pages/about/AboutUs.vue";
import CachThucHoatDong from "pages/about/CachThucHoatDong.vue";
import ChinhSachBaoMat from "pages/about/ChinhSachBaoMat.vue";
import LienHe from "pages/about/LienHe.vue";

import MainLayout from "layouts/MainLayout.vue";
import AdminLayout from "layouts/AdminLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import SignIn from "pages/SignIn.vue";
import SignUp from "pages/SignUp.vue";
import SearchJob from "pages/job/SearchJob.vue";
import HoSoCV from "pages/employee/HoSoCV.vue";

/* admin page */
import RecruiterAccount from "pages/admin/account/RecruiterAccount.vue";

const router = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: IndexPage },
      { path: "/dang-nhap", component: SignIn },
      { path: "/dang-ky", component: SignUp },
      { path: "/search", component: SearchJob },
      { path: "/ho-so-cv", component: HoSoCV },
      { path: "/ve-chung-toi", component: AboutUs },
      { path: "/cach-thuc-hoat-dong", component: CachThucHoatDong },
      { path: "/chinh-sach-bao-mat", component: ChinhSachBaoMat },
      { path: "/lien-he", component: LienHe },
    ],
  },
  {
    /* admin */
    path: "/admin",
    component: AdminLayout,
    // children: [{ path: "/", component: IndexPage }],
    children: [{ path: "/account/recruiter", component: RecruiterAccount }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default router;
