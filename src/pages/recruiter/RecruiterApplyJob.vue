<script setup>
import { useQuasar } from 'quasar'
import { useStoreRecruiterApplyJob } from 'src/stores/recruiter/storeRecruiterApplyJob';
const storeRecruiterApplyJob = useStoreRecruiterApplyJob();
const $q = useQuasar();
</script>

<template>
  <div>
    <q-table title="HỒ SƠ ỨNG TUYỂN" virtual-scroll :columns="storeRecruiterApplyJob.columnRecruiterAccount"
      :rows="storeRecruiterApplyJob.rowDataRecruiterAccount" style="height: 90vh" row-key="email"
      :rows-per-page-options="[0]" class="q-my-lg q-mx-md my-sticky-header-table" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterApplyJob.listSelectRecruiterAccount" selection="multiple"
      :filter="storeRecruiterApplyJob.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">HỒ SƠ ỨNG TUYỂN</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between" style="width: 90%;">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all"
                :label="'Tất cả ' + '(' + storeRecruiterApplyJob.tinTuyenDung + ')'"
                @click="storeRecruiterApplyJob.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-primary" icon="reply_all"
                :label="'Đang ứng tuyển ' + '(' + storeRecruiterApplyJob.tinTuyenDungDangCho + ')'"
                @click="storeRecruiterApplyJob.filter = 'đang ứng tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-indigo" icon="directions_run"
                :label="'Đã ứng tuyển ' + '(' + storeRecruiterApplyJob.tinTuyenDungDaDuyet + ')'"
                @click="storeRecruiterApplyJob.filter = 'đã ứng tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000" style="width: 20vw;" v-model="storeRecruiterApplyJob.filter"
            placeholder="Search" v-bind:style="$q.screen.lt.md ? { 'width': '80vw' } : { 'width': '20vw' }"
            v-bind:class="{ 'q-mt-lg q-pt-lg': $q.screen.md || $q.screen.sm || $q.screen.xs }">
            <template v-slot:append>
              <q-btn flat round color="primary" icon="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body="props">
        <tr :props="props">
          <td>
            <q-checkbox v-model="props.selected" color="primary" />
          </td>
          <td class="text-left" key="stt" :props="props" style="width: 5%;">
            {{ props.rowIndex }}
          </td>
          <td class="text-left" key="info" :props="props" style="width: 30%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.contactName }}</span></b>
            <br>
            <span>Phone: {{ props.row.contactPhone }}</span>
            <br>
            <span>Email: {{ props.row.contactEmail }}</span>
            <br>
            <span>Ngày nộp: {{ props.row.dateSend }}</span>
            <br>
            <br>
            <a href="#" class="text-blue-5">Xem chi tiết thông tin ứng viên</a>
          </td>

          <td class="text-left cursor-pointer" key="post" :props="props" style="width: 25%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.name }}</span></b>
            <br>
            <br>
            <span>Địa chỉ: {{ props.row.address }}</span>
            <br>
            <span>Ngày tạo: {{ props.row.dateCreate }}</span>
            <br>
            <span>Ngày dừng tuyển: {{ props.row.dateExpired }}</span>
          </td>

          <td class="text-left" key="state" :props="props">
            {{ props.row.state }}
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.state === 'đang tuyển'">
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Dừng tuyển"
                @click="storeRecruiterApplyJob.checkDenyOne(props.row.name, props.row.email)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
span,
a {
  font-size: 1.1em;
}
</style>
