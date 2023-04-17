<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';
import { useStoreRegex } from 'stores/middleware/storeRegex'
const storeRegex = useStoreRegex();

const storeAuthen = useStoreAuthentication();
const isPwd = ref(true);
onMounted(() => {
  const $q = useQuasar();
  storeAuthen._init();
})

const autoDecreaseNumber = () => {
  storeAuthen.count = 60;
  setInterval(() => {
    if (storeAuthen.count !== 0) {
      storeAuthen.count--;
    }
  }, 1000);
}
</script >

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
          <q-form class="q-gutter-md" @submit="storeAuthen.signUp()">
            <q-input filled label="Họ và Tên" v-model="storeAuthen.userName" :rules="[
              val => !!val || 'Tên không được rỗng',
            ]" lazy-rules />
            <q-select filled v-model="storeAuthen.roleSelected" :options="storeAuthen.listRole" :rules="[
              val => !!val || 'Vui lòng chọn loại tài khoản',
            ]" lazy-rules label="Loại tài khoản" />
            <q-input filled v-model="storeAuthen.email" type="text" placeholder="name@gmail.com" :rules="[
              val => !!val || 'Email liên hệ không được rỗng',
              val => storeRegex.isValidEmail(val) || 'Email không đúng định dạng'
            ]" lazy-rules> <template v-slot:prepend>
                <q-icon name="mail" />
              </template></q-input>
            <q-input filled label="Mật khẩu" :type="isPwd ? 'password' : 'text'" v-model="storeAuthen.password" :rules="[
              val => !!val || 'Mật khẩu không được rỗng',
              val => val.length > 5 || 'Mật khẩu phải tối thiểu 6 kí tự',
            ]" lazy-rules>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <q-checkbox right-label v-model="storeAuthen.accept" label="Đồng ý với các điều khoản của công ty"
              color="red" />

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

      <q-dialog v-model="storeAuthen.dialogOtp" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white" style="width: 900px;">
          <q-form @submit="storeAuthen.verifyOtp()" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6">Xác thực mã OTP: </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input v-model="storeAuthen.otp" type="number" placeholder="Nhập mã đã được gửi về email của bạn..."
                maxlength="4" filled class="q-mb-sm" :rules="[
                  val => !!val || 'Vui lòng nhập mã OTP.',
                  val => val.length < 5 || 'Mã OTP phải là một số có 4 chữ số.',
                  val => val.length > 3 || 'Mã OTP phải là một số có 4 chữ số.',
                ]" lazy-rules>
                <template v-slot:after>
                  <q-btn label="nhận mã" round dense flat @click="autoDecreaseNumber(), storeAuthen.getOtp()"
                    :disable="storeAuthen.count !== 0" />
                </template></q-input>
              <span class="q-mt-md">Mã sẽ hết hạn sau: {{ storeAuthen.count }}s</span>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn type="submit" flat label="Xác nhận" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

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
