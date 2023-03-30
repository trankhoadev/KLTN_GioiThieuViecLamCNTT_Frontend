<script setup>
import iconSet from "quasar/icon-set/ionicons-v4";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import { onMounted, ref } from "vue";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useQuasar } from "quasar";
import { watch } from 'vue';
const $q = useQuasar();

// watch(() => $q.dark.isActive, val => {
//   if (val) {
//     let header = document.getElementById('header');
//     header.style.backgroundColor = '#111';
//   }
// })

onMounted(() => {
  window.onscroll = function () {
    scrollFunction();
  }
})

const storeAuthen = useStoreAuthentication();

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
      <div class="row header-row flex-center" id="header">

        <div class="col-6 col-md-6">
          <div class="row">

            <div class="col-6 col-md-4">
              <div class="header-logo">
                <a href="/">
                  <img src="src/assets/authentication/logo.png" alt="">
                </a>
              </div>
            </div>

            <div class="sm-none col-md-4">
              <a href="#">Cách hoạt động</a>
            </div>

            <div class="sm-none col-md-4">
              <a href="#">Tìm công việc</a>
            </div>

          </div>
        </div>

        <div class="col-6 col-md-6">
          <div class="row">
            <div class="col-md-4 col-6">
              <!-- <a href="#">Đăng nhập</a> -->
              <router-link to="/dang-nhap">
                Đăng nhập
              </router-link>
            </div>

            <div class="col-md-4 col-6">
              <!-- <a href="#">Đăng ký</a> -->
              <router-link to="/dang-ky">
                Đăng ký
              </router-link>
            </div>

            <div class="sm-none col-md-4 text-white text-weight-bold">
              <button>Đăng dự án</button>
            </div>
          </div>
        </div>
      </div>

      <div class="header-tabs flex justify-between">
        <q-tabs align="left">
          <q-route-tab to="/" label="Tìm Việc" class="text-white" />
          <q-route-tab to="/" label="Tuyển Dụng" class="text-white" />
          <q-route-tab to="/" label="About" class="text-white" />
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
          <img src="src/assets/authentication/image-white.png" alt="">
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
              <a href="#">
                <span>Về chúng tôi</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Cách thức hoạt động</span>
              </a>
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
              <a href="#">
                <span>Tin tức</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span>Công việc</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3 col-12 col-footer">
          <h4>Điều khoản</h4>
          <ul>
            <li>
              <a href="#">
                <span>Chính sách bảo mật</span>
              </a>
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
        Copyright © 2023 Freelancer Technology Pty Limited
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

    button {
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
