<script setup>
import { useQuasar } from 'quasar'
import { useStoreRecruiterPost } from 'src/stores/recruiter/storeRecruiterPost';
const storeRecruiterPost = useStoreRecruiterPost();
const $q = useQuasar();
</script>

<template>
  <div>
    <q-table title="DUYỆT TÀI KHOẢN NHÀ TUYỂN DỤNG" virtual-scroll :columns="storeRecruiterPost.columnRecruiterAccount"
      :rows="storeRecruiterPost.rowDataRecruiterAccount" style="height: 90vh" row-key="email" :rows-per-page-options="[0]"
      class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterPost.listSelectRecruiter" selection="multiple"
      :filter="storeRecruiterPost.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">TẤT CẢ TIN TUYỂN DỤNG</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between" style="width: 90%;">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all" :label="'Tất cả ' + '(' + storeRecruiterPost.tinTuyenDung + ')'"
                @click="storeRecruiterPost.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-orange" icon="reply_all"
                :label="'Đang chờ ' + '(' + storeRecruiterPost.tinTuyenDungDangCho + ')'"
                @click="storeRecruiterPost.filter = 'đang chờ'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-teal" icon="directions_run"
                :label="'Đang tuyển ' + '(' + storeRecruiterPost.tinTuyenDungDaDuyet + ')'"
                @click="storeRecruiterPost.filter = 'đang tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-blue-10" icon="done"
                :label="'Dừng tuyển ' + '(' + storeRecruiterPost.tinTuyenDungDaDuyet + ')'"
                @click="storeRecruiterPost.filter = 'dừng tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-red" icon="delete" :label="'Đã xóa ' + '(' + storeRecruiterPost.tinTuyenDungTuChoi + ')'"
                @click="storeRecruiterPost.filter = 'đã xóa'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000" style="width: 20vw;" v-model="storeRecruiterPost.filter"
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
          <td class="text-left" key="name" :props="props" style="width: 30%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.name }}</span></b>
            <br>
            <br>
            <span>Địa chỉ: {{ props.row.address }}</span>
            <br>
            <span>Ngày tạo: {{ props.row.dateCreate }}</span>
            <br>
            <span>Ngày dừng tuyển: {{ props.row.dateExpired }}</span>
            <br>
            <br>
            <a href="#" class="text-blue-5">Xem chi tiết tin tuyển dụng</a>
          </td>

          <td class="text-left cursor-pointer" key="email" :props="props" style="width: 25%;">
            <!-- <q-btn color="primary" icon="open_in_new" label="Xem nhanh" @click="onClick" /> -->
            <q-icon class="text-blue-5" name="open_in_new" size="sm" />
            <span class="text-blue-5" style="white-space: pre-wrap;">Xem nhanh tin ứng tuyển</span>
          </td>

          <td class="text-left" key="date" :props="props">
            {{ props.row.state }}
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.state === 'đang tuyển'">
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Dừng tuyển"
                @click="storeRecruiterPost.checkDenyOne(props.row.name, props.row.email)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
span, a {
  font-size: 1.1em;
}
</style>
