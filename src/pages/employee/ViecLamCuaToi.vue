<script setup>
import { onMounted } from "vue";
import { useStoreViecLamCuaToi } from "src/stores/storeViecLamCuaToi";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreJob } from "src/stores/storeJob";

const storeViecLamCuaToi = useStoreViecLamCuaToi();
const storeAuthen = useStoreAuthentication();
const storeJob = useStoreJob();

onMounted(async () => {
  await storeViecLamCuaToi.getAllDonUngTuyenByUngTuyenVienId(storeAuthen.idUngTuyenVien);

  /* Get picture and name of recruiter */
  for (let i = 0; i < storeViecLamCuaToi.listDataDonUngTuyen.length; ++i) {
    await storeJob.getNhaTuyenDungById(storeViecLamCuaToi.listDataDonUngTuyen[i].tintuyendung.nhatuyendung);
    storeViecLamCuaToi.listDataDonUngTuyen[i].tennhatuyendung = storeJob.listDataOneRecruiter.tencongty;
    storeViecLamCuaToi.listDataDonUngTuyen[i].anhdaidien = storeJob.listDataOneRecruiter.anhdaidien;
  }

  /* Add data for all */
  storeViecLamCuaToi.listData = storeViecLamCuaToi.listDataDonUngTuyen;
  console.log(storeViecLamCuaToi.listData);
});
</script>

<template>
  <q-card>
    <q-tabs v-model="storeViecLamCuaToi.tab" dense class="text-grey q-pa-sm" active-color="primary"
      indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="Tất cả" label="Tất cả" />
      <q-tab name="Tin đã ứng tuyển" label="Tin đã ứng tuyển" />
      <q-tab name="Tin đã từ chối" label="Tin đã từ chối" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="storeViecLamCuaToi.tab" animated>
      <q-tab-panel name="Tất cả" class="full-height">
        <q-card class="my-card q-mt-lg" v-for="item in storeViecLamCuaToi.listData" :key=item._id>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">
              Tin tuyển dụng
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-3">
                <img :src=item.anhdaidien alt="" style="width: 40%;">
              </div>
              <div class="col-7">
                <router-link class="text-black hover-underline" :to="`/search/job/${item.tintuyendung._id}`"
                  target="_blank">
                  <h6 class="text-weight-bold">{{ item.tintuyendung.tieude }}</h6>
                </router-link>

                <p class="text-uppercase">Nhà tuyển dụng: {{ item.tennhatuyendung }}</p>
                <b>Địa chỉ: </b>{{ item.tintuyendung.diaChi }}
                <br>
                <b>Ngày ứng tuyển: </b>{{ new Date(item.createdAt).toLocaleDateString('en-GB') }}

                <div class="row">
                  <div class="col-12">
                    <h6 class="q-pt-md text-weight-bold">Thông tin liên hệ: </h6>
                    <p class="q-mb-sm"><b>Tên: </b> {{ item.tintuyendung.tenNguoiLienHe }}</p>
                    <p class="q-mb-sm"><b>Sdt: </b> {{ item.tintuyendung.soDienThoaiLienHe }}</p>
                    <p class="q-mb-sm"><b>Email: </b> {{ item.tintuyendung.emailLienHe }}</p>
                  </div>
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <div v-if="item.trangthai === 'đã ứng tuyển' || item.trangthai === 'đã từ chối'">
                  <span v-if="item.trangthai === 'đã ứng tuyển'" class="text-weight-bold text-green-7"
                    style="font-size: 1.3em;">Trạng thái: {{ item.trangthai }}</span>
                  <span v-if="item.trangthai === 'đã từ chối'" class="text-weight-bold text-red"
                    style="font-size: 1.3em;">Trạng thái: {{ item.trangthai }}</span>
                </div>
                <span v-else class="text-weight-bold" style="font-size: 1.3em;">Trạng thái: {{ item.trangthai
                }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="Tin đã ứng tuyển">
        <q-card class="my-card q-mt-lg" v-for="item in storeViecLamCuaToi.listData" :key=item._id>
          <div v-if="item.trangthai === 'đã ứng tuyển'">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">
                Tin tuyển dụng
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-3">
                  <img :src=item.anhdaidien alt="" style="width: 40%;">
                </div>
                <div class="col-7">
                  <router-link class="text-black hover-underline" :to="`/search/job/${item.tintuyendung._id}`"
                    target="_blank">
                    <h6 class="text-weight-bold">{{ item.tintuyendung.tieude }}</h6>
                  </router-link>
                  <p class="text-uppercase">Nhà tuyển dụng: {{ item.tennhatuyendung }}</p>
                  <b>Địa chỉ: </b>{{ item.tintuyendung.diaChi }}
                  <br>
                  <b>Ngày ứng tuyển: </b>{{ new Date(item.createdAt).toLocaleDateString('en-GB') }}
                  <div class="row">
                    <div class="col-12">
                      <h6 class="q-pt-md text-weight-bold">Thông tin liên hệ: </h6>
                      <p class="q-mb-sm"><b>Tên: </b> {{ item.tintuyendung.tenNguoiLienHe }}</p>
                      <p class="q-mb-sm"><b>Sdt: </b> {{ item.tintuyendung.soDienThoaiLienHe }}</p>
                      <p class="q-mb-sm"><b>Email: </b> {{ item.tintuyendung.emailLienHe }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-2 flex justify-end">
                  <span class="text-weight-bold text-green-7" style="font-size: 1.3em;">Trạng thái: {{ item.trangthai
                  }}</span>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="Tin đã từ chối">
        <q-card class="my-card q-mt-lg" v-for="item in storeViecLamCuaToi.listData" :key=item._id>
          <div v-if="item.trangthai === 'đã từ chối'">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">
                Tin tuyển dụng
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-3">
                  <img :src=item.anhdaidien alt="" style="width: 40%;">
                </div>
                <div class="col-7">
                  <router-link class="text-black hover-underline" :to="`/search/job/${item.tintuyendung._id}`"
                    target="_blank">
                    <h6 class="text-weight-bold">{{ item.tintuyendung.tieude }}</h6>
                  </router-link>
                  <p class="text-uppercase">Nhà tuyển dụng: {{ item.tennhatuyendung }}</p>
                  <b>Địa chỉ: </b>{{ item.tintuyendung.diaChi }}
                  <br>
                  <b>Ngày ứng tuyển: </b>{{ new Date(item.createdAt).toLocaleDateString('en-GB') }}

                  <div class="row">
                    <div class="col-12">
                      <h6 class="q-pt-md text-weight-bold">Thông tin liên hệ: </h6>
                      <p class="q-mb-sm"><b>Tên: </b> {{ item.tintuyendung.tenNguoiLienHe }}</p>
                      <p class="q-mb-sm"><b>Sdt: </b> {{ item.tintuyendung.soDienThoaiLienHe }}</p>
                      <p class="q-mb-sm"><b>Email: </b> {{ item.tintuyendung.emailLienHe }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-2 flex justify-end">
                  <span class="text-weight-bold text-red" style="font-size: 1.3em;">Trạng thái: {{ item.trangthai
                  }}</span>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<style lang="scss" scoped></style>
