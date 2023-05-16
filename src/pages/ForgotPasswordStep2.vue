<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';
import { useRoute } from 'vue-router';

const storeAuthen = useStoreAuthentication();
const route = useRoute();
const isPwd = ref(true);
const isNewPwd = ref(true);
const isreNewPwd = ref(true);
onMounted(() => {
  const $q = useQuasar();
})
</script>


<template>
  <img src="/src/assets/wave.png" class="wave" alt="login-wave">
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="/src/assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="/src/assets/avatar.svg" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h5 class="q-my-none text-weight-regular">Change Your Password</h5>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="storeAuthen.forgotPassword(route.params.id, storeAuthen.newPassword)">

            <q-input filled label="Mật khẩu mới" :type="isNewPwd ? 'password' : 'text'" v-model="storeAuthen.newPassword"
              :rules="[
                val => !!val || 'Mật khẩu không được rỗng',
                val => val.length > 5 || 'Mật khẩu phải tối thiểu 6 kí tự',
              ]" lazy-rules>
              <template v-slot:append>
                <q-icon :name="isNewPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isNewPwd = !isNewPwd" />
              </template>
            </q-input>

            <q-input filled label="Nhập lại mật khẩu" :type="isreNewPwd ? 'password' : 'text'"
              v-model="storeAuthen.reNewPassword" :rules="[
                val => !!val || 'Mật khẩu không được rỗng',
                val => val.length > 5 || 'Mật khẩu phải tối thiểu 6 kí tự',
                val => val === storeAuthen.newPassword || 'Mật khẩu nhập lại không khớp',
              ]" lazy-rules>
              <template v-slot:append>
                <q-icon :name="isreNewPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isreNewPwd = !isreNewPwd" />
              </template>
            </q-input>

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
}</style>
