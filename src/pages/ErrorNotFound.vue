<script setup>
/* storage */
// import { useStoreAuthentication } from "src/stores/storeAuthentication";
// const storeAuthen = useStoreAuthentication();

/*
  role:
    0: Employee
    1: Recruiter
    2: Admin
*/
const loaiTaiKhoan = localStorage.getItem('loaiTaiKhoan');

</script>

<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/admin/welcome" label="Go Home" no-caps
        v-if="loaiTaiKhoan == 'admin'" />

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/recruiter" label="Go Home" no-caps
        v-else-if="loaiTaiKhoan == 'recruiter'" />

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps v-else />
    </div>
  </div>
</template>

