<script setup>
import Messages from "./MessageComponent.vue";

import { ref } from 'vue'
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { onMounted } from "vue";

/* Remember Delete it */
localStorage.setItem('role', 2);
const picture = localStorage.getItem('picture');
const leftDrawerOpen = ref(false)
const storeAuthen = useStoreAuthentication();
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {

});

</script>
<template>
  <div v-if="storeAuthen.isLogin">
    <q-layout v-if="storeAuthen.loaiTaiKhoan === 'admin' && storeAuthen.isLogin" view="lHh Lpr lFf">
      <q-header elevated class="bg-deep-purple text-white">
        <q-toolbar>
          <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
          <q-toolbar-title>
            Giao Diện Quản Lí
          </q-toolbar-title>
          <q-space />
          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round dense flat color="white" icon="notifications">
              <q-badge color="red" text-color="white" floating>
                5
              </q-badge>
              <q-menu>
                <q-list style="min-width: 100px">
                  <messages></messages>
                  <q-card class="text-center no-shadow no-border">
                    <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                  </q-card>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn round flat>
              <q-avatar size="26px">
                <img :src="picture">
              </q-avatar>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-deep-purple text-white">
        <q-list>
          <q-item to="/admin/welcome" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/manage-post" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="support_agent" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Quản lý tin đăng tuyển</q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item icon="manage_accounts" label="Quản lý tài khoản">
            <q-list class="q-pl-lg">
              <!-- <router-link to=""></router-link> -->
              <q-item to="/account/recruiter" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="support_agent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tài khoản nhà tuyển dụng</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/account/employee" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tài khoản ứng tuyển viên</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="playlist_add" label="Thêm">
            <q-list class="q-pl-lg">
              <q-item to="/add-job" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="work_outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Thêm ngành nghề</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/add-tag" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="g_translate" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Thêm ngôn ngữ</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="analytics" label="Thống kê">
            <q-list class="q-pl-lg">
              <!-- <router-link to=""></router-link> -->
              <q-item to="/analysis/post" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="unsubscribe" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tin đăng tuyển</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/analysis/member" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="person_search" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Số lượng thành viên</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item to="/admin" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cài đặt</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/admin" @click="storeAuthen.logOutUnique()" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>

    <div v-else class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 30vh">
          404
        </div>

        <div class="text-h2" style="opacity:.4">
          Oops. Nothing here...
        </div>

        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/admin/welcome" label="Go Home" no-caps
          v-if="storeAuthen.loaiTaiKhoan == 'admin'" />

        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/recruiter/welcome" label="Go Home" no-caps
          v-else-if="storeAuthen.loaiTaiKhoan == 'recruiter'" />

        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps v-else />
      </div>
    </div>
  </div>
</template>


<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }

  5% {
    transform: scale(1.25);
  }

  20% {
    transform: scale(1);
  }

  30% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.25);
  }

  50% {
    transform: scale(1);
  }

  55% {
    transform: scale(1.25);
  }

  70% {
    transform: scale(1);
  }
}
</style>
