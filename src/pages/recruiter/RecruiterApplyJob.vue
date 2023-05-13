<script setup>
import { onMounted, onUpdated } from 'vue';
import { useQuasar } from 'quasar'
import { useStoreRecruiterApplyJob } from 'src/stores/recruiter/storeRecruiterApplyJob';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';

const storeRecruiterApplyJob = useStoreRecruiterApplyJob();
const storeAuthen = useStoreAuthentication();
const $q = useQuasar();

onMounted(async () => {
  await storeRecruiterApplyJob.getAllDonUngTuyen();

  storeRecruiterApplyJob.listData.map(e => {
    e.tieude = e.tintuyendung.tieude;
    e.hovaten = e.ungtuyenvien.hovaten
  })

});

onUpdated(() => {
  getCount();
});

const getCount = () => {
  storeRecruiterApplyJob.donUngTuyenDangCho = 0;
  storeRecruiterApplyJob.donUngTuyenDaDuyet = 0;
  storeRecruiterApplyJob.donUngTuyenTuChoi = 0;
  storeRecruiterApplyJob.listData.map(e => {
    e.trangthai === 'đang chờ' ? storeRecruiterApplyJob.donUngTuyenDangCho++ : void (0);
    e.trangthai === 'đã ứng tuyển' ? storeRecruiterApplyJob.donUngTuyenDaDuyet++ : void (0);
    e.trangthai === 'đã từ chối' ? storeRecruiterApplyJob.donUngTuyenTuChoi++ : void (0);
  })
}
</script>

<template>
  <div>
    <q-table title="HỒ SƠ ỨNG TUYỂN" virtual-scroll :columns="storeRecruiterApplyJob.columnRecruiterAccount"
      :rows="storeRecruiterApplyJob.listData" style="height: 90vh" row-key="_id" :rows-per-page-options="[10]"
      class="q-my-lg q-mx-md my-sticky-header-table" rows-per-page-label="Số dòng mỗi trang"
      v-model:selected="storeRecruiterApplyJob.listSelectDonUngTuyen" selection="multiple"
      :filter="storeRecruiterApplyJob.filter">

      <template v-slot:top-left>
        <div class="row">
          <h5 class="q-py-md">HỒ SƠ ỨNG TUYỂN</h5>
        </div>

        <div class="row">
          <div class="header-tabs flex justify-between" style="width: 90%;">
            <q-tabs align="center" class="text-teal" dense>
              <q-tab class="text-cyan" icon="select_all"
                :label="'Tất cả ' + '(' + storeRecruiterApplyJob.listData.length + ')'"
                @click="storeRecruiterApplyJob.filter = ''" v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-primary" icon="reply_all"
                :label="'Đang chờ ' + '(' + storeRecruiterApplyJob.donUngTuyenDangCho + ')'"
                @click="storeRecruiterApplyJob.filter = 'đang chờ'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-indigo" icon="directions_run"
                :label="'Đã ứng tuyển ' + '(' + storeRecruiterApplyJob.donUngTuyenDaDuyet + ')'"
                @click="storeRecruiterApplyJob.filter = 'đã ứng tuyển'"
                v-bind:class="{ 'q-px-sm': $q.screen.sm || $q.screen.xs }" />
              <q-tab class="text-red" icon="cancel"
                :label="'Đã từ chối ' + '(' + storeRecruiterApplyJob.donUngTuyenTuChoi + ')'"
                @click="storeRecruiterApplyJob.filter = 'đã từ chối'"
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
            {{ props.rowIndex + 1 }}
          </td>
          <td class="text-left" key="hovaten" :props="props" style="width: 30%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.hovaten
            }}</span></b>
            <br>
            <span>Phone: {{ props.row.ungtuyenvien.sdt }}</span>
            <br>
            <span>Email: {{ props.row.ungtuyenvien.email }}</span>
            <br>
            <span>Ngày nộp: {{ new Date(props.row.createdAt).toLocaleDateString('en-GB') }}</span>
            <br>
            <br>
            <q-icon class="text-blue-5" name="open_in_new" size="sm" />
            <router-link class="text-blue-5 hover-underline" :to="`/preview-cv/${props.row.ungtuyenvien._id}`"
              target="_blank">Xem hồ sơ ứng tuyển viên</router-link>
          </td>

          <td class="text-left cursor-pointer" key="tieude" :props="props" style="width: 25%;">
            <b style="font-size: 1.2em;"><span style="white-space: pre-wrap;">{{ props.row.tieude
            }}</span></b>
            <br>
            <br>
            <span>Địa chỉ: {{ props.row.tintuyendung.diaChi }}</span>
            <br>
            <span>Ngày tạo: {{ new Date(props.row.tintuyendung.createdAt).toLocaleDateString('en-GB') }}</span>
            <br>
            <span>Ngày dừng tuyển: {{ new Date(props.row.tintuyendung.ngayHetHan).toLocaleDateString('en-GB') }}</span>
            <br>
            <q-icon class="text-blue-5" name="open_in_new" size="sm" />
            <router-link class="text-blue-5 hover-underline" :to="`/search/job/${props.row.tintuyendung._id}`"
              target="_blank">Xem chi tiết tin tuyển dụng</router-link>
          </td>

          <td class="text-left" key="trangthai" :props="props">
            {{ props.row.trangthai }}

          </td>

          <td class="text-left" key="action" :props="props">
            <div v-if="props.row.trangthai === 'đang chờ'">
              <q-btn color="light-green" icon="check" label="Duyệt"
                @click="storeRecruiterApplyJob.duyetDonTuyenDung(props.row._id)" />
              <q-btn class="q-ml-lg" color="pink" icon="cancel" label="Từ chối"
                @click="storeRecruiterApplyJob.tuChoiDonUngTuyen(props.row._id, props.row.ungtuyenvien.email, props.row.tieude)" />
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
