<script setup>
import { useQuasar } from 'quasar'
import { useStoreRecruiterPost } from 'src/stores/recruiter/storeRecruiterPost';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';
import { onUpdated, onMounted } from 'vue';
import { useMyStore } from 'src/stores/myStore';

const storeMyStore = useMyStore();
const storeRecruiterPost = useStoreRecruiterPost();
const storeAuthen = useStoreAuthentication();
const $q = useQuasar()


onMounted(async () => {
  await storeRecruiterPost.getAllPost(storeAuthen.idNhaTuyenDung);
});


onUpdated(() => {
  getCount();
});

const getCount = () => {
  storeRecruiterPost.tinTuyenDungDangCho = 0;
  storeRecruiterPost.tinTuyenDungDangTuyen = 0;
  storeRecruiterPost.tinTuyenDungDungTuyen = 0;
  storeRecruiterPost.tinTuyenDungTuChoi = 0;
  storeRecruiterPost.listData.map(e => {
    e['trangthai'] === 'đang chờ' ? storeRecruiterPost.tinTuyenDungDangCho++ : void (0);
    e['trangthai'] === 'đang tuyển' ? storeRecruiterPost.tinTuyenDungDangTuyen++ : void (0);
    e['trangthai'] === 'đã xóa' ? storeRecruiterPost.tinTuyenDungDungTuyen++ : void (0);
    e['trangthai'] === 'đã hủy' ? storeRecruiterPost.tinTuyenDungTuChoi++ : void (0);
  })
}


</script>

<template>
  <div>
    <q-table title="TẤT CẢ TIN TUYỂN DỤNG" virtual-scroll :columns="storeRecruiterPost.columnRecruiterAccount"
      :rows="storeRecruiterPost.listData" style="height: 90vh" row-key="_id" :rows-per-page-options="[10]"
      class="q-my-lg q-mx-md" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterPost.listSelectRecruiter" selection="multiple" :filter="storeRecruiterPost.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">TẤT CẢ TIN TUYỂN DỤNG</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between" style="width: 90%;">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all"
                :label="'Tất cả ' + '(' + storeRecruiterPost.listData.length + ')'"
                @click="storeRecruiterPost.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-orange" icon="reply_all"
                :label="'Đang chờ ' + '(' + storeRecruiterPost.tinTuyenDungDangCho + ')'"
                @click="storeRecruiterPost.filter = 'đang chờ'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-teal" icon="directions_run"
                :label="'Đang tuyển ' + '(' + storeRecruiterPost.tinTuyenDungDangTuyen + ')'"
                @click="storeRecruiterPost.filter = 'đang tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-pink" icon="cancel"
                :label="'Từ chối ' + '(' + storeRecruiterPost.tinTuyenDungTuChoi + ')'"
                @click="storeRecruiterPost.filter = 'đã hủy'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-red" icon="delete"
                :label="'Đã xóa ' + '(' + storeRecruiterPost.tinTuyenDungDungTuyen + ')'"
                @click="storeRecruiterPost.filter = 'đã xóa'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
            </q-tabs>
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <q-btn color="primary" class="q-mr-md" icon-right="archive" label="XUẤT FILE CSV" no-caps @click="storeMyStore.exportTable(storeRecruiterPost.columnRecruiterAccount, storeRecruiterPost.listData)" />
        <q-icon @click="storeAuthen.reload()" class="q-mr-md cursor-pointer text-teal" name="cached" size="md" />
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
            {{ props.rowIndex + 1 }}
          </td>
          <td class="text-left" key="tieude" :props="props" style="width: 30%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.tieude }}</span></b>
            <br>
            <br>
            <span>Địa chỉ: {{ props.row.diaChi }}</span>
            <br>
            <span>Ngày tạo: {{ new Date(props.row.createdAt).toLocaleDateString('en-GB') }}</span>
            <br>
            <span>Ngày dừng tuyển: {{ new Date(props.row.ngayHetHan).toLocaleDateString('en-GB') }}</span>
            <br>
            <br>
            <a href="#" class="text-blue-5" @click="storeRecruiterPost.seeDetail(props.row._id)">Xem nhanh tin tuyển
              dụng</a>
          </td>

          <td class="text-left cursor-pointer" key="link" :props="props" style="width: 25%;">
            <q-icon class="text-blue-5" name="open_in_new" size="sm" />
            <router-link class="text-black hover-underline" :to="`/search/job/${props.row._id}`" target="_blank">
              <span class="text-blue-5" style="white-space: pre-wrap;">Xem chi tiết tin ứng tuyển</span>
            </router-link>
          </td>

          <td class="text-left" key="trangthai" :props="props">
            {{ props.row.trangthai }}
          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.trangthai === 'đang tuyển' || props.row.trangthai === 'đang chờ'">
              <q-btn class="q-ml-lg" color="pink" icon="delete" label="Xóa tin"
                @click="storeRecruiterPost.checkDenyOne(props.row._id, props.row.tieude, props.row.createdAt)" />
            </div>
          </td>
        </tr>
      </template>
    </q-table>

    <q-dialog v-model="storeRecruiterPost.dialogViewPost" class="q-pa-md q-gutter-sm">
      <!-- {{ storeRecruiterPost.listData.map(e => e._id === storeRecruiterPost.seeDetailSelect) }} -->
      <q-card style="min-width: 80vw;">
        <q-card-section>
          <div>
            <label class="text-weight-bold">Tiêu đề: </label>
            <q-input filled v-model="storeRecruiterPost.listOnePost.tieude" disable readonly />
          </div>

          <div class="q-pt-md">
            <label class="text-weight-bold">Địa chỉ tuyển dụng: </label>
            <q-input filled v-model="storeRecruiterPost.listOnePost.diaChi" disable readonly />
          </div>

          <div class="q-pt-md">
            <label class="text-weight-bold">Nhà tuyển dụng: </label>
            <q-input filled v-model="storeRecruiterPost.listOnePost.nhatuyendung.tencongty" disable readonly />
          </div>

          <div class="row q-pt-md">
            <div class="col-12 col-md-6"
              v-bind:style="$q.screen.lt.md ? { 'padding-right': '0' } : { 'padding-right': '1em' }">
              <label class="text-weight-bold">Vị trí: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.vitri" disable readonly />
            </div>

            <div class="col-12 col-md-6"
              v-bind:style="$q.screen.lt.md ? { 'padding-left': '0' } : { 'padding-left': '1em' }">
              <label class="text-weight-bold">Số lượng tuyển: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.soLuongTuyen" disable readonly />
            </div>
          </div>

          <div class="row q-pt-md">
            <div class="col-12 col-md-6"
              v-bind:style="$q.screen.lt.md ? { 'padding-right': '0' } : { 'padding-right': '1em' }">
              <label class="text-weight-bold">Hình thức làm việc: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.hinhThucLamViec" disable readonly />
            </div>

            <div class="col-12 col-md-6"
              v-bind:style="$q.screen.lt.md ? { 'padding-left': '0' } : { 'padding-left': '1em' }">
              <label class="text-weight-bold">Mức lương: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.mucluong" disable readonly />
            </div>
          </div>

          <div class="row q-pt-md">
            <div class="col-12 col-md-4">
              <label class="text-weight-bold">Tên liên hệ: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.tenNguoiLienHe" disable readonly />
            </div>

            <div class="col-12 col-md-4"
              v-bind:style="$q.screen.lt.md ? { 'padding': '0' } : { 'padding': '0 1em 0 1em' }">
              <label class="text-weight-bold">Số điện thoại: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.soDienThoaiLienHe" disable readonly />
            </div>

            <div class="col-12 col-md-4">
              <label class="text-weight-bold">Email: </label>
              <q-input filled v-model="storeRecruiterPost.listOnePost.emailLienHe" disable readonly />
            </div>
          </div>

          <div class="q-pt-md">
            <label class="text-weight-bold">Mô tả công việc: </label>
            <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
              storeRecruiterPost.listOnePost.moTaCongViec.replace(/\n/gi, "\n - ") }}</p>
          </div>

          <div class="q-pt-md">
            <label class="text-weight-bold">Mô tả yêu cầu: </label>
            <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
              storeRecruiterPost.listOnePost.moTaYeuCau.replace(/\n/gi, "\n - ") }}</p>
          </div>

          <div class="q-pt-md">
            <label class="text-weight-bold">Quyền lợi ứng viên: </label>
            <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
              storeRecruiterPost.listOnePost.quyenLoiUngVien.replace(/\n/gi, "\n - ") }}</p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="storeRecruiterPost.dialogDenyOne">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm">Bạn có thực sự muốn xóa tin "{{
            storeRecruiterPost.onePostSelectTitle }}" đã đăng
            ngày "{{ new Date(storeRecruiterPost.onePostSelectDateCreated).toLocaleDateString('en-GB') }}"</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup
            @click="storeRecruiterPost.deleteOne(storeRecruiterPost.onePostSelectId)" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
span,
a {
  font-size: 1.1em;
}</style>
