<script setup>
import { useQuasar } from 'quasar'
import { useStoreManagePost } from 'src/stores/admin/storeManagePost.js';
import { onMounted, onUpdated, onBeforeUpdate } from 'vue';
const storeManagePost = useStoreManagePost();

onMounted(async () => {
  await storeManagePost.getAllPost();
  storeManagePost.listData.map(e => {
    // e.tieude = e.tintuyendung.tieude;
    e.tencongty = e.nhatuyendung.tencongty
  })
});

onBeforeUpdate(() => {
  getCount();
});

const getCount = () => {
  storeManagePost.tinDangCho = 0;
  storeManagePost.tinDaDuyet = 0;
  storeManagePost.tinTuChoi = 0;
  storeManagePost.listData.map(e => {
    e.trangthai === 'đang chờ' ? storeManagePost.tinDangCho++ : void (0);
    e.trangthai === 'đang tuyển' ? storeManagePost.tinDaDuyet++ : void (0);
    e.trangthai === 'đã hủy' ? storeManagePost.tinTuChoi++ : void (0);
    e.trangthai === 'đã xóa' ? storeManagePost.tinDaXoa++ : void (0);
  })
}


const $q = useQuasar();
</script>

<template>
  <div>
    <q-table title="QUẢN LÝ TIN ĐĂNG TUYỂN" virtual-scroll :columns="storeManagePost.columnManagePost"
      :rows="storeManagePost.listData" :loading="storeManagePost.loadData" style="height: 90vh" row-key="_id"
      :rows-per-page-options="[10]" class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeManagePost.listSelectManagePost" selection="multiple" :filter="storeManagePost.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">QUẢN LÝ TIN ĐĂNG TUYỂN</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-orange" icon="select_all" :label="'Tất cả ' + '(' + storeManagePost.listData.length + ')'"
                @click="storeManagePost.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-cyan" icon="reply_all" :label="'Đang chờ ' + '(' + storeManagePost.tinDangCho + ')'"
                @click="storeManagePost.filter = 'đang chờ'" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-teal" icon="done" :label="'Đồng ý ' + '(' + storeManagePost.tinDaDuyet + ')'"
                @click="storeManagePost.filter = 'đang tuyển'" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-pink-4" icon="close" :label="'Từ chối ' + '(' + storeManagePost.tinTuChoi + ')'"
                @click="storeManagePost.filter = 'đã hủy'" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
                <q-tab class="text-red" icon="delete" :label="'Đã xóa ' + '(' + storeManagePost.tinDaXoa + ')'"
                @click="storeManagePost.filter = 'đã xóa'" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <div class="q-gutter-lg">
          <q-input rounded outlined dense debounce="1000" v-model="storeManagePost.filter" placeholder="Search"
            v-bind:style="$q.screen.lt.md ? { 'width': '80vw' } : { 'width': '20vw' }"
            v-bind:class="{ 'q-mt-lg q-pt-lg': $q.screen.md || $q.screen.sm || $q.screen.xs }">
            <template v-slot:append>
              <q-btn flat round color="primary" icon="search" />
            </template>
          </q-input>
          <q-btn color="primary" icon="check" label="Duyệt tất cả" @click="storeManagePost.acceptAll" />
          <q-btn color="red" icon="close" label="Từ chối tất cả" @click="storeManagePost.checkDenyAll" />

          <q-dialog v-model="storeManagePost.dialogDenyAll" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="primary" text-color="white" />
                <span class="q-ml-sm">Bạn có thực sự muốn từ chối các dòng đã chọn không ?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Đồng ý" color="primary" v-close-popup @click="storeManagePost.denyAll" />
                <q-btn flat label="Hủy" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:body="props">
        <tr :props="props">
          <td style="width: 5%;">
            <q-checkbox v-model="props.selected" color="primary" />
          </td>
          <td class="text-left" key="stt" :props="props" style="width: 5%;">
            {{ props.rowIndex + 1 }}
          </td>
          <td class="text-left" key="tieude" :props="props" style="width: 25%;">
            <p class="text-weight-bold" style="font-size: 1.2em; white-space: pre-wrap;">{{
              props.row.tieude }}</p>
            <b>Địa chỉ: </b><span>{{ props.row.diaChi }}</span>
            <br>
            <b>Lượt đánh giá: </b> <span>{{ 0 }}</span>
            <br>
            <span class="text-primary cursor-pointer q-pt-lg" @click="storeManagePost.seeDetail(props.row._id)">Xem chi
              tiết</span>
          </td>

          <td class="text-left" key="tencongty" :props="props" style="width: 20%;">
            <p class="text-weight-bold" style="font-size: 1.1em; white-space: pre-wrap;">{{ props.row.tencongty }}</p>
            <b>Ngày tham gia: </b> <span>{{ new Date(props.row.nhatuyendung.ngaythamgia).toLocaleDateString('en-GB')
            }}</span>
            <br>
            <b>Loại Nhà Tuyển Dụng: </b> <span>{{ props.row.nhatuyendung.loainhatuyendung }}</span>
            <br>
            <span class="text-primary cursor-pointer q-pt-lg" @click="storeManagePost.seeDetail(props.row._id)">Xem chi
              tiết</span>
          </td>

          <td class="text-left" key="createdAt" :props="props" style="width: 10%;">
            <span>{{ new Date(props.row.createdAt).toLocaleDateString('en-GB') }}</span>
          </td>

          <td class="text-left" key="trangthai" :props="props" style="width: 10%;">
            <span style="white-space: pre-wrap;">{{ props.row.trangthai }}</span>
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.trangthai === 'đang chờ'">
              <q-btn color="light-green" icon="check" label="Duyệt" @click="storeManagePost.acceptOne(props.row._id)" />
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Từ chối"
                @click="storeManagePost.checkDenyOne(props.row._id, props.row.tieude, props.row.tencongty)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>

    <q-dialog v-model="storeManagePost.isSeeDetail" persistent>
      <q-card>
        <q-card-section class="row items-center">
          {{ storeManagePost.seeDetailSelect }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="storeManagePost.dialogDenyOne" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm">Bạn có thực sự muốn từ chối tin tuyển dụng "{{
            storeManagePost.onePostSelectTitle }}" của nhà tuyển dụng: "{{
    storeManagePost.onePostSelectName }}" ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup
            @click="storeManagePost.denyOne(storeManagePost.onePostSelectId)" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
