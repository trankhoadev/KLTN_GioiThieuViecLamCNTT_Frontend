<script setup>
// import EssentialLink from 'layouts/EssentialLink.vue';
import Messages from "./MessageComponent.vue";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreRecruiterAddPost } from "stores/recruiter/storeRecruiterAddPost";
import { ref } from 'vue'
import { useQuasar } from "quasar";

/* Remember Delete it */
localStorage.setItem('role', 2);
const storeRecruiterAddPost = useStoreRecruiterAddPost();
const leftDrawerOpen = ref(false)
const storeAuthen = useStoreAuthentication();
const imgUrl = localStorage.getItem('picture');
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<template>
  <div v-if="storeAuthen.isLogin">
    <q-layout v-if="storeAuthen.loaiTaiKhoan === 'recruiter' && storeAuthen.isLogin" view="lHh Lpr lFf">
      <q-header elevated class="bg-deep-purple text-white">
        <q-toolbar>
          <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
          <q-toolbar-title>
            Giao Diện Nhà Tuyển Dụng
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
                <img :src=imgUrl>
              </q-avatar>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-deep-purple text-white">
        <q-list>
          <q-item @click="window.location.reload()" to="/recruiter/welcome" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item icon="feed" label="Tin tuyển dụng">
            <q-list class="q-pl-lg">
              <q-item @click="storeRecruiterAddPost.handlePayment()" to="/recruiter/add-post" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Thêm mới tin đăng tuyển</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/recruiter/my-post" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Quản lý tin của bạn</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>



          <q-item to="/recruiter/apply-job" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Hồ sơ ứng tuyển</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/recruiter/company-info" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Thông tin công ty</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item to="/recruiter" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cài đặt</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item to="/recruiter" @click="storeAuthen.logOutUnique" active-class="q-item-no-link-highlighting">
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
