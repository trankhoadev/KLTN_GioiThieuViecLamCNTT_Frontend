<script setup>
import { useQuasar } from 'quasar'
import { useStoreEmployeeAccount } from 'src/stores/admin/storeEmployeeAccount.js';
const storeEmployeeAccount = useStoreEmployeeAccount();
const $q = useQuasar();
</script>

<template>
  <div>
    <q-table title="DUYỆT TÀI KHOẢN ỨNG TUYỂN VIÊN" virtual-scroll :columns="storeEmployeeAccount.columnEmployeeAccount"
      :rows="storeEmployeeAccount.rowDataEmployeeAccount" style="height: 90vh" row-key="email"
      :rows-per-page-options="[0]" class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeEmployeeAccount.listSelectEmployeeAccount" selection="multiple"
      :filter="storeEmployeeAccount.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">DUYỆT TÀI KHOẢN ỨNG TUYỂN VIÊN</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all" :label="'Tất cả ' + '(' + storeEmployeeAccount.taiKhoanUtv + ')'"
                @click="storeEmployeeAccount.filter = ''"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }"
                />
              <q-tab class="text-orange" icon="reply_all"
                :label="'Đang chờ ' + '(' + storeEmployeeAccount.taiKhoanUtvDangCho + ')'"
                @click="storeEmployeeAccount.filter = 'đang chờ'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }"
                />
              <q-tab class="text-teal" icon="done"
                :label="'Đã duyệt ' + '(' + storeEmployeeAccount.taiKhoanUtvDaDuyet + ')'"
                @click="storeEmployeeAccount.filter = 'đã duyệt'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }"
                />
              <q-tab class="text-red" icon="close"
                :label="'Từ chối ' + '(' + storeEmployeeAccount.taiKhoanUtvTuChoi + ')'"
                @click="storeEmployeeAccount.filter = 'đã hủy'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }"
                />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000"
          v-model="storeEmployeeAccount.filter"
          placeholder="Search"
          v-bind:style="$q.screen.lt.md ? { 'width': '80vw' } : { 'width': '20vw' }"
          v-bind:class="{ 'q-mt-lg q-pt-lg': $q.screen.md || $q.screen.sm || $q.screen.xs }"
            >
            <template v-slot:append>
              <q-btn flat round color="primary" icon="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="check" label="Duyệt tất cả" @click="storeEmployeeAccount.acceptAll" />
          <q-btn color="red" icon="close" label="Từ chối tất cả" @click="storeEmployeeAccount.checkDenyAll" />

          <q-dialog v-model="storeEmployeeAccount.dialogDenyAll" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="primary" text-color="white" />
                <span class="q-ml-sm">Bạn có thực sự muốn từ chối các dòng đã chọn không ?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeEmployeeAccount.denyAll" />
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
          <td class="text-left" key="stt" :props="props">
            {{ props.rowIndex }}
          </td>
          <td class="text-left" key="name" :props="props">
            {{ props.row.name }}
          </td>

          <td class="text-left" key="email" :props="props">
            {{ props.row.email }}
          </td>

          <td class="text-left" key="date" :props="props">
            {{ props.row.date }}
          </td>

          <td class="text-left" key="date" :props="props">
            {{ props.row.state }}
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.state === 'đang chờ'">
              <q-btn color="light-green" icon="check" label="Duyệt"
                @click="storeEmployeeAccount.acceptOne(props.row.email)" />
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Từ chối"
                @click="storeEmployeeAccount.checkDenyOne(props.row.name, props.row.email)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>

    <q-dialog v-model="storeEmployeeAccount.dialogDenyOne" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm">Bạn có thực sự muốn từ chối người dùng "{{
            storeEmployeeAccount.oneAccountSelectName }}" với email đăng ký là: "{{
    storeEmployeeAccount.oneAccountSelectEmail }}" ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeEmployeeAccount.denyOne" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
