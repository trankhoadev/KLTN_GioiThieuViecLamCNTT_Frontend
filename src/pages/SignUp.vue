<template>
  <img src="src/assets/wave.png" class="wave" alt="login-wave">
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="src/assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="src/assets/avatar.svg" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center text-title">
              <p class="text-bold text-uppercase q-my-none">Sign up with your email</p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input class="q-pa-none" label="Fullname" v-model="storeAuthen.userName" :rules="[
              val => !!val || 'Tên không được rỗng',
            ]" lazy-rules />
            <q-input v-model="storeAuthen.email" type="email" suffix="@gmail.com">
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input label="Password" :type="isPwd ? 'password' : 'text'" v-model="storeAuthen.password" :rules="[
              val => !!val || 'Mật khẩu phải tối thiểu 6 kí tự',
              val => val.length > 5 || 'Mật khẩu phải tối thiểu 6 kí tự',
            ]" lazy-rules>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <div>
              <q-btn class="full-width" color="primary" label="Sign Up" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg text-title">
                <div class="flex text-center flex-center text-h7 text-weight-regular"><span>Already have an account?
                  </span>
                  &nbsp;
                  <router-link class="text-primary" to="/dang-nhap">Sign in</router-link>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';

const storeAuthen = useStoreAuthentication();
const isPwd = ref(true);
onMounted(() => {
  const $q = useQuasar();
  storeAuthen._init();
})
</script >

<style lang="scss" scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.text-title {
  p {
    font-size: 1em;
  }
}
</style>
