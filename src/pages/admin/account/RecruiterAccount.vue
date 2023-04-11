<script setup>
import { useStoreRecruiterAccount } from 'src/stores/admin/storeRecruiterAccount.js';
const storeRecruiterAccount = useStoreRecruiterAccount();

</script>

<template>
  <div>
    <q-table title="DUYỆT TÀI KHOẢN NHÀ TUYỂN DỤNG" virtual-scroll :columns="storeRecruiterAccount.columnRecruiterAccount"
      :rows="storeRecruiterAccount.rowDataRecruiterAccount" style="height: 90vh" row-key="email"
      :rows-per-page-options="[0]" class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterAccount.listSelectRecruiterAccount" selection="multiple"
      :filter="storeRecruiterAccount.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">DUYỆT TÀI KHOẢN NHÀ TUYỂN DỤNG</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all"
                :label="'Tất cả ' + '(' + storeRecruiterAccount.taiKhoanNtd + ')'"
                @click="storeRecruiterAccount.filter = ''" />
              <q-tab class="text-orange" icon="reply_all"
                :label="'Đang chờ ' + '(' + storeRecruiterAccount.taiKhoanNtdDangCho + ')'"
                @click="storeRecruiterAccount.filter = 'đang chờ'" />
              <q-tab class="text-teal" icon="done"
                :label="'Đã duyệt ' + '(' + storeRecruiterAccount.taiKhoanNtdDaDuyet + ')'"
                @click="storeRecruiterAccount.filter = 'đã duyệt'" />
              <q-tab class="text-red" icon="close"
                :label="'Từ chối ' + '(' + storeRecruiterAccount.taiKhoanNtdTuChoi + ')'"
                @click="storeRecruiterAccount.filter = 'đã hủy'" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000" style="width: 20vw;" v-model="storeRecruiterAccount.filter"
            placeholder="Search">
            <template v-slot:append>
              <q-btn flat round color="primary" icon="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="check" label="Duyệt tất cả" @click="storeRecruiterAccount.acceptAll" />
          <q-btn color="red" icon="close" label="Từ chối tất cả" @click="storeRecruiterAccount.checkDenyAll" />

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
              <q-btn color="light-green" icon="check" label="Duyệt" @click="storeRecruiterAccount.acceptOne(props.row.email)" />
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Từ chối"
                @click="storeRecruiterAccount.checkDenyOne(props.row.email)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>

    <q-dialog v-model="storeRecruiterAccount.dialogDenyOne" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Bạn có thực sự muốn từ chối {{ storeRecruiterAccount.oneAccountSelect }} ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeRecruiterAccount.denyOne" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
