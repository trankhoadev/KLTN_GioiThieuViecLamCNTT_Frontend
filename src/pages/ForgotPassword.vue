<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';
import { useStoreRegex } from 'stores/middleware/storeRegex'

const storeRegex = useStoreRegex();
const storeAuthen = useStoreAuthentication();
const isPwd = ref(true);
const isNewPwd = ref(true);
const isreNewPwd = ref(true);
onMounted(() => {
  const $q = useQuasar();
})
</script>


<template>
  <img src="~assets/wave.png" class="wave" alt="login-wave">
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/avatar.svg" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h4 class="q-my-none text-weight-regular">Forgot Password</h4>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="storeAuthen.getEmailForgotPassword(storeAuthen.emailInput)">
            <label class="text-weight-bold q-pt-md">Vui lòng nhập email của bạn: </label>
            <q-input filled v-model="storeAuthen.emailInput" type="text" placeholder="name@gmail.com" :rules="[
              val => !!val || 'Email không được rỗng',
              val => storeRegex.isValidEmail(val) || 'Email không đúng định dạng'
            ]" lazy-rules> <template v-slot:prepend>
                <q-icon name="mail" />
              </template></q-input>
            <div>
              <q-btn class="full-width" color="primary" label="Submit" type="submit" rounded></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
