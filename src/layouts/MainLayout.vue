<script setup>
</script>

<template>
  <q-layout view="hhh lpR fff">

    <q-header elevated class="bg-white text-white header" height-hint="98">
      <div class="row header-row flex-center">

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
              <a href="#">Đăng nhập</a>
            </div>

            <div class="col-md-4 col-6">
              <a href="#">Đăng ký</a>
            </div>

            <div class="sm-none col-md-4 text-white text-weight-bold">
              <button>Đăng dự án</button>
            </div>
          </div>
        </div>
      </div>

      <div class="header-tabs">
        <q-tabs align="left">
          <q-route-tab to="/dang-nhap" label="Tìm Việc" class="text-white" />
          <q-route-tab to="/page2" label="Tuyển Dụng" class="text-white" />
          <q-route-tab to="/page3" label="About" class="text-white" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style lang="scss" scoped>
@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

.header {
  .header-row {
  box-shadow: 0 0 4px #4d525b14, 0 2px 4px #4d525b1f;
  background-color: #fff;
  white-space: nowrap;
  padding: 0 10%;

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
</style>
