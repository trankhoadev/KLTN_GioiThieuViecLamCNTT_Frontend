<script setup>
import { onMounted, onBeforeUpdate } from 'vue';
import { useQuasar } from 'quasar'
import { useStoreRecruiterAccount } from 'src/stores/admin/storeRecruiterAccount.js';
import { useStoreAuthentication } from "src/stores/storeAuthentication";

const storeAuthen = useStoreAuthentication();
const storeRecruiterAccount = useStoreRecruiterAccount();
const $q = useQuasar();

onMounted(async () => {
  await storeRecruiterAccount.getAllData();
});

onBeforeUpdate(() => {
  getCount();
});

const getCount = () => {
  storeRecruiterAccount.taiKhoanNtd = 0;
  storeRecruiterAccount.taiKhoanNtdDangHoatDong = 0;
  storeRecruiterAccount.taiKhoanNtdDaKhoa = 0;
  storeRecruiterAccount.listData.map(e => {
    e.statusOnline === true ? storeRecruiterAccount.taiKhoanNtdDangHoatDong++ : void (0);
    e.statusOnline === false ? storeRecruiterAccount.taiKhoanNtdDaKhoa++ : void (0);
  })
}

</script>

<template>
  <div>
    <q-table title="QUẢN LÝ TÀI KHOẢN NHÀ TUYỂN DỤNG" virtual-scroll
      :columns="storeRecruiterAccount.columnRecruiterAccount" :rows="storeRecruiterAccount.listData" style="height: 90vh"
      row-key="_id" :rows-per-page-options="[10]" class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterAccount.listSelectRecruiterAccount" selection="multiple"
      :filter="storeRecruiterAccount.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">QUẢN LÝ TÀI KHOẢN NHÀ TUYỂN DỤNG</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between" style="width: 90%;">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-orange" icon="select_all"
                :label="'Tất cả ' + '(' + storeRecruiterAccount.listData.length + ')'"
                @click="storeRecruiterAccount.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-teal" icon="done"
                :label="'Đang hoạt động ' + '(' + storeRecruiterAccount.taiKhoanNtdDangHoatDong + ')'"
                @click="storeRecruiterAccount.filter = 'true'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-red" icon="close"
                :label="'Đã khóa ' + '(' + storeRecruiterAccount.taiKhoanNtdDaKhoa + ')'"
                @click="storeRecruiterAccount.filter = 'false'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <q-icon @click="storeAuthen.reload()" class="q-mr-md cursor-pointer text-teal" name="cached" size="md" />
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000" style="width: 20vw;" v-model="storeRecruiterAccount.filter"
            placeholder="Search" v-bind:style="$q.screen.lt.md ? { 'width': '80vw' } : { 'width': '20vw' }"
            v-bind:class="{ 'q-mt-lg q-pt-lg': $q.screen.md || $q.screen.sm || $q.screen.xs }">
            <template v-slot:append>
              <q-btn flat round color="primary" icon="search" />
            </template>
          </q-input>
          <!-- <q-btn color="primary" icon="check" label="Duyệt tất cả" @click="storeRecruiterAccount.acceptAll" />
          <q-btn color="red" icon="close" label="Từ chối tất cả" @click="storeRecruiterAccount.checkDenyAll" /> -->

          <q-dialog v-model="storeRecruiterAccount.dialogDenyAll" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="primary" text-color="white" />
                <span class="q-ml-sm">Bạn có thực sự muốn từ chối các dòng đã chọn không ?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeRecruiterAccount.denyAll" />
                <q-btn flat label="Hủy" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:body="props">
        <tr :props="props">
          <td>
            <q-checkbox v-model="props.selected" color="primary" />
          </td>
          <td class="text-left" key="stt" :props="props" style="width: 5%;">
            {{ props.rowIndex + 1 }}
          </td>
          <td class="text-left" key="username" :props="props">
            <span style="white-space: pre-wrap;">{{ props.row.username }}</span>
          </td>

          <td class="text-left" key="email" :props="props">
            <span style="white-space: pre-wrap;">{{ props.row.email }}</span>
          </td>

          <td class="text-left" key="createdAt" :props="props">
            {{ new Date(props.row.createdAt).toLocaleDateString('en-GB') }}
          </td>

          <td class="text-left" key="statusOnline" :props="props">
            {{ props.row.statusOnline ? "đang hoạt động" : "đã khóa" }}
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.statusOnline === true">
              <q-btn color="secondary" icon="restart_alt" label="Reset mật khẩu"
                @click="storeRecruiterAccount.checkResetOne(props.row._id, props.row.username, props.row.email)" />
              <q-btn class="q-ml-lg" color="pink" icon="lock" label="Vô hiệu hóa"
                @click="storeRecruiterAccount.checkDenyOne(props.row._id, props.row.username, props.row.email)" />
            </div>

            <div v-else>
              <q-btn color="light-green" icon="lock_reset" label="Khôi phục"
                @click="storeRecruiterAccount.khoiPhucTaiKhoan(props.row._id)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>

    <q-dialog v-model="storeRecruiterAccount.dialogDenyOne" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm text-justify">Bạn có thực sự muốn vô hiệu hóa tài khoản "{{
            storeRecruiterAccount.oneAccountSelectEmail }}" của người dùng: "{{
    storeRecruiterAccount.oneAccountSelectName }}" ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeRecruiterAccount.voHieuHoaTaiKhoan(storeRecruiterAccount.oneAccountSelectId)" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="storeRecruiterAccount.dialogResetOne">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm">Bạn có chắc muốn reset mật khẩu cho tài khoản "{{
            storeRecruiterAccount.oneAccountSelectEmail }}" này không" ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup
            @click="storeRecruiterAccount.resetPasswork(storeRecruiterAccount.oneAccountSelectId)" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
