/* About Template */
import AboutUs from "pages/about/AboutUs.vue";
import CachThucHoatDong from "pages/about/CachThucHoatDong.vue";
import ChinhSachBaoMat from "pages/about/ChinhSachBaoMat.vue";
import LienHe from "pages/about/LienHe.vue";

import IndexPage from "pages/IndexPage.vue";
import SignIn from "pages/SignIn.vue";
import SignUp from "pages/SignUp.vue";
import ChangePassword from "src/pages/ChangePassword.vue";
import SearchJob from "pages/job/SearchJob.vue";
import JobDetail from "pages/job/JobDetail.vue";
import HoSoCV from "pages/employee/HoSoCV.vue";
import PreviewCV from "src/pages/employee/PreviewCV.vue";
import ViecLamCuaToi from "src/pages/employee/ViecLamCuaToi.vue";

/* layout */
import MainLayout from "layouts/MainLayout.vue";
import AdminLayout from "layouts/AdminLayout.vue";
import RecruiterLayout from "layouts/RecruiterLayout.vue";

/* admin page */
import RecruiterAccount from "pages/admin/account/RecruiterAccount.vue";
import EmployeAccount from "pages/admin/account/EmployeAccount.vue";
import ManagePost from "pages/admin/ManagePost.vue";
import AdminPage from "src/pages/admin/AdminPage.vue";
import AddJob from "src/pages/admin/AddJob.vue";
import AddTag from "src/pages/admin/AddTag.vue";

/* recruiter page */
import RecruiterPage from "pages/recruiter/RecruiterPage.vue";
import RecruiterAddPost from "pages/recruiter/RecruiterAddPost.vue";
import RecruiterPreviewPost from "pages/recruiter/RecruiterPreviewPost.vue";
import RecruiterPost from "pages/recruiter/RecruiterPost.vue";
import RecruiterApplyJob from "pages/recruiter/RecruiterApplyJob.vue";
import CompanyInfo from "pages/recruiter/CompanyInfo.vue";

const requireAuth = () => {};

const router = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        component: IndexPage,
      },
      {
        path: "/dang-nhap",
        component: SignIn,
      },
      {
        path: "/dang-ky",
        component: SignUp,
      },
      {
        path: "/doi-mat-khau",
        component: ChangePassword,
      },
      {
        path: "/search/:id",
        component: SearchJob,
      },
      {
        path: "/search/job/:id",
        component: JobDetail,
      },
      {
        path: "/ho-so-cv",
        component: HoSoCV,
        beforeEnter: requireAuth,
        meta: {
          permission: "employee",
        },
      },
      {
        path: "/viec-lam-cua-toi",
        component: ViecLamCuaToi,
        beforeEnter: requireAuth,
        meta: {
          permission: "employee",
        },
      },
      {
        path: "/ve-chung-toi",
        component: AboutUs,
        beforeEnter: requireAuth,
        meta: {
          permission: "employee",
        },
      },
      {
        path: "/cach-thuc-hoat-dong",
        component: CachThucHoatDong,
      },
      {
        path: "/chinh-sach-bao-mat",
        component: ChinhSachBaoMat,
      },
      {
        path: "/lien-he",
        component: LienHe,
      },
    ],
  },
  {
    path: "/preview-cv/:id",
    component: PreviewCV,
    beforeEnter: requireAuth,
    meta: {
      permission: "employee",
    },
  },
  {
    /* recruiter */
    path: "/recruiter",
    component: RecruiterLayout,
    children: [
      {
        path: "/recruiter/welcome",
        component: RecruiterPage,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/my-post",
        component: RecruiterPost,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/add-post",
        component: RecruiterAddPost,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/preview-post",
        component: RecruiterPreviewPost,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/my-post",
        component: RecruiterPreviewPost,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/apply-job",
        component: RecruiterApplyJob,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },

      {
        path: "/recruiter/company-info",
        component: CompanyInfo,
        beforeEnter: requireAuth,
        meta: {
          permission: "recruiter",
        },
      },
    ],
  },
  {
    /* admin */
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "/admin/welcome",
        component: AdminPage,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
      {
        path: "/manage-post",
        component: ManagePost,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
      {
        path: "/account/recruiter",
        component: RecruiterAccount,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
      {
        path: "/account/employee",
        component: EmployeAccount,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
      {
        path: "/add-job",
        component: AddJob,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
      {
        path: "/add-tag",
        component: AddTag,
        beforeEnter: requireAuth,
        meta: {
          permission: "admin",
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    name: "NotFound",
  },
];

export default router;
