<script setup>
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import { onMounted } from "vue";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreMainLayout } from "src/stores/storeMainLayout"
import { Notify, useQuasar } from "quasar";

const $q = useQuasar();
const storeAuthen = useStoreAuthentication();
const storeMainLayout = useStoreMainLayout();
const picture = localStorage.getItem('picture');
const userName = localStorage.getItem('userName');
const role = localStorage.getItem('loaiTaiKhoan');

onMounted(() => {
  if (role === 'user') {
    window.onscroll = function () {
      scrollFunction();
    }
    if (userName) {
      storeAuthen.isDataUserAvailable = true;
      storeAuthen.isLogin = true;
    }
  }
  // else {
  //   router().push({ path: "/dang-nhap" });
  //   Notify.create({
  //     message: "Bạn không có quyền truy cập",
  //     timeout: 2000,
  //     position: "bottom",
  //     color: "negative",
  //     icon: "mood_bad",
  //   });
  // }
})

/* Back to Top */
const scrollFunction = () => {
  let btnBackToTop = document.getElementById('back-to-top');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btnBackToTop.style.display = 'flex';
  }
  else {
    btnBackToTop.style.display = 'none';
  }
}

/* Dark mode button */
const toggleDarkMode = () => {
  let theme = localStorage.getItem('isDark');
  if (theme === null) {
    localStorage.setItem('isDark', true);
  }
  $q.dark.toggle();
}

/* Back to Top */
const clickToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

</script>

<template>
  <q-layout view="hhh lpR fff">

    <!-- Back to Top Start-->
    <div @click="clickToTop()" ref="backToTop" id="back-to-top">
      <q-icon name="expand_less"></q-icon>
    </div>
    <!-- Back to Top End-->

    <q-header elevated class="text-white header" ref="header" height-hint="98">
      <div class="row header-row flex-center" id="header" style="min-height: 10vh;">

        <div class="col-6 col-md-6">
          <div class="row">

            <div class="col-6 col-md-4">
              <div class="header-logo">
                <a class="flex flex-center" href="/">
                  <!-- <img src="/src/assets/authentication/logo.png" alt=""> -->
                  <h6 class="text-weight-bold text-italic">TimViecNhanh247</h6>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div v-if="storeAuthen.isDataUserAvailable" class="col-6 col-md-6 text-black">
          <div class="row flex justify-end">
            <div class="flex flex-center justify-center cursor-pointer">
              <q-btn color="black" flat @mouseover="storeMainLayout.isShowDropdown = true" icon-right="arrow_drop_down"
                :label=userName>
                <q-menu v-model="storeMainLayout.isShowDropdown" @mouseleave="storeMainLayout.isShowDropdown = false" fit>
                  <q-list style="min-width: 200px">
                    <q-item clickable>
                      <router-link class="flex flex-center justify-center" to="/ho-so-cv">
                        <q-icon size="sm" name="account_circle" />
                        &nbsp;
                        <q-item-section @click="storeAuthen.checkCreateUngTuyenVien()">Hồ sơ và CV</q-item-section>
                      </router-link>
                    </q-item>
                    <q-item clickable>
                      <router-link to="/viec-lam-cua-toi" class="flex flex-center justify-center">
                        <q-icon size="sm" name="work_outline" />
                        &nbsp;
                        <q-item-section>Việc làm của tôi</q-item-section>
                      </router-link>
                    </q-item>
                    <q-item clickable>
                      <router-link to="/doi-mat-khau" class="flex flex-center justify-center">
                        <q-icon size="sm" name="settings" />
                        &nbsp;
                        <q-item-section>Đổi mật khẩu</q-item-section>
                      </router-link>
                    </q-item>
                    <q-item clickable class="flex flex-center justify-center">
                      <q-icon size="sm" name="power_settings_new" />
                      &nbsp;
                      <q-item-section @click="storeAuthen.logOut">Đăng xuất</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-avatar font-size="20px" size="28px" color="yellow-2" text-color="orange"
              class="text-weight-bold flex flex-center justify-center"
              style="align-items: center; flex-direction: column;">
              <img :src=picture alt="">
            </q-avatar>
          </div>
        </div>

        <div v-else class="col-6 col-md-6 flex justify-end">
          <router-link to="/dang-nhap">
            <q-btn class="text-weight-bold q-mr-md" outline style="color: #0e1724;" label="Đăng nhập" />
          </router-link>
          <router-link to="/dang-ky">
            <q-btn class="text-weight-bold q-px-lg" style="background: #FF0080; color: white" label="Đăng ký" />
          </router-link>
        </div>
      </div>

      <div class="header-tabs flex justify-between">
        <q-tabs align="left">
          <q-route-tab to="/" label="Tìm Việc" class="text-white" />
          <q-route-tab to="/ho-so-cv" label="Hồ sơ và CV" class="text-white" />
          <q-route-tab to="/chinh-sach-bao-mat" label="Chính sách bảo mật" class="text-white" />
          <q-route-tab to="/lien-he" label="Liên hệ" class="text-white" />
        </q-tabs>

        <q-tabs align="right">
          <q-toggle v-model="storeAuthen.isDark" dark checked-icon="dark_mode" color="green"
            unchecked-icon="panorama_fish_eye" @click="toggleDarkMode" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="footer text-white">
      <div class="row footer-row flex-center q-pa-lg">

        <div class="col-md-3 col-12 col-footer footer-center" height="100vh">
          <img src="/src/assets/authentication/image-white.png" alt="">
          <div class="flex-row">
            <q-btn class="icon-help" icon="help" />
            <a href="#">
              <span>Giúp đỡ & Hỗ trợ</span>
            </a>
          </div>
        </div>

        <div class="col-md-3 col-12 col-footer column no-wrap flex-center">
          <h4>Giới thiệu</h4>
          <ul>
            <li>
              <router-link to="/ve-chung-toi">Về chúng tôi</router-link>
            </li>

            <li>
              <router-link to="/cach-thuc-hoat-dong">Cách thức hoạt động</router-link>
            </li>

            <li>
              <a href="#">
                <span>Công việc</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Bảo mật<table></table></span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Nhà đầu tư</span>
              </a>
            </li>

            <li>
              <router-link to="/lien-he">Liên hệ</router-link>
            </li>

          </ul>
        </div>

        <div class="col-md-3 col-12 col-footer">
          <h4>Điều khoản</h4>
          <ul>
            <li>
              <router-link to="/chinh-sach-bao-mat">Chính sách bảo mật</router-link>
            </li>

            <li>
              <a href="#">
                <span>Điều khoản và điều kiện</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Chính sách bản quyền</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Quy tắc ứng xử<table></table></span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-12 col-footer">
          <h4>Kết nối</h4>
          <ul>
            <li>
              <a href="#">
                <span>Email:</span> <a href="mailto:company@gmail.com">company@gmail.com</a>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Phone Number: </span> <a href="tel:+84111222333">+84111222333</a>
              </a>
            </li>

            <li>
              <router-link to="/">
                <q-btn icon="facebook" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-twitter" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-youtube" />
              </router-link>

              <router-link to="/">
                <q-btn icon="ion-logo-instagram" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <span class="flex flex-center q-pa-md text-white no-wrap footer-copyright">
        Copyright © 2023 Designed By Tran Anh Khoa
      </span>
    </q-footer>

  </q-layout>
</template>

<style lang="scss" scoped>
@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

@mixin hIpad {
  @media screen and (max-width: 1080px) {
    @content;
  }
}

.title {
  font-family: 'Sawarabi Gothic', sans-serif;
  font-size: 40px;
  color: #4b7cb6;
  font-style: oblique;

  filter: drop-shadow(4px 4px 0 #8BeCf6);
}

/* Dark mode custom Css */
body.body--dark {
  background: #080E1A;
}

body.body--light {
  background: #ffffff;
}

.header {
  .header-row {
    box-shadow: 0 0 4px #4d525b14, 0 2px 4px #4d525b1f;
    background-color: #fff;
    white-space: nowrap;
    padding: 0 10%;

    @include hIpad() {
      width: 100%;
    }

    img {
      width: 100px;
    }

    a {
      background: none;
      border: 0;
      color: inherit;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-align: left;
      color: #111;
      font-size: 1.2em;

      &:hover {
        color: #007fed;
        cursor: pointer;
        position: relative;
        transition: color .1s ease-out;
      }
    }

    button.post {
      background-color: #f20091;
      padding: 8px 20px;
      border-radius: 3px;
      cursor: pointer;
    }
  }

  .header-tabs {
    overflow: hidden;
    background-color: #0e1724;
    height: 100%;
    -webkit-user-select: none;
    user-select: none;
    z-index: 2;
    padding: 0 10%;
  }
}

.footer {
  background-color: #161e2c;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // align-items: flex-start;

  .q-btn {
    text-decoration: none;

    &::before {
      box-shadow: none !important;
    }
  }

  .col-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;

    .q-btn {
      &::before {
        box-shadow: none !important;
      }
    }

    h4 {
      padding: .4em 0;
      font-size: 1.6em;
    }

    ul {
      li {
        padding: 0.5em 0;
      }
    }

    a:not(.q-btn) {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &.footer-center {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      height: 100%;

      img {
        width: 150px;
        padding: 0;
      }

      .icon-help {
        pointer-events: none;
        outline: 0;
        box-shadow: 0 !important;

        &:hover {
          transition: none;
        }
      }
    }
  }


  .footer-copyright {
    border-top: 1px solid #2b3340;
    padding-top: 24px;

  }
}
</style>
