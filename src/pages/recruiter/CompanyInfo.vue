<script setup>
import { onMounted } from "vue";
import { useStoreHoSoCv } from "src/stores/storeHoSoCv";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreCompanyInfo } from "src/stores/recruiter/storeCompanyInfo";

const storeHoSoCv = useStoreHoSoCv();
const storeAuthen = useStoreAuthentication();
const storeCompanyInfo = useStoreCompanyInfo();

onMounted(async () => {
  await storeCompanyInfo.getDataOfUserById(storeAuthen.idNhaTuyenDung);
  console.log(storeCompanyInfo.listData);
});
</script>

<template>
  <q-card style="min-height: 94vh;">
    <q-card-section>
      <q-form @submit="storeCompanyInfo.updateThongTinCongTyNhaTuyenDung()">
        <div>
          <div class="row">
            <div class="col-12 flex" style="align-items: center;">
              <q-icon name="person" size="md" />
              <span class="text-weight-bold text-uppercase q-pl-md" style="font-size: 1.3em;">Giới thiệu về công ty của
                bạn</span>
            </div>
          </div>

          <div class="row flex flex-center">
            <div class="col-md-3 col-sm-12 flex column flex-center">
              <q-avatar font-size="20px" size="151px" color="yellow-2" text-color="orange"
                class="text-weight-bold flex flex-center justify-center q-mb-lg"
                style="align-items: center
                                                                                                                    ; flex-direction: column;"><img
                  :src=storeCompanyInfo.listData.anhdaidien alt=""></q-avatar>

              <div class="flex flex-center justify-between q-pb-md">
                <div class="flex flex-center justify-between">
                  <q-btn class="q-mr-sm" color="primary" icon="add_a_photo" label="Sửa" />
                </div>

                <div class="flex flex-center justify-around">
                  <q-btn class="q-mf-sm" color="red-14" icon="delete" label="Xóa" />
                </div>
              </div>
            </div>
            <div class="col-md-9 col-sm-12 q-px-lg">
              <q-input filled square class="q-mb-md" v-model="storeCompanyInfo.listData.tencongty" type="text"
                label="Tên công ty" hint="VD: CÔNG TY CỔ PHẦN PHÁT TRIỂN GIẢI PHÁP VÀ CÔNG NGHỆ THÔNG TIN VIỆT NAM"
                :rules="[
                  val => !!val || 'Tên công ty không được rỗng',
                ]" lazy-rules />
              <q-input filled v-model="storeCompanyInfo.listData.ngaythanhlap" mask="date" :rules="['date']"
                label="Ngày thành lập công ty">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="storeCompanyInfo.listData.ngaythanhlap">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="row flex justify-between">
                <div class="col-md-6 col-12"
                  v-bind:style="$q.screen.lt.md ? { 'padding-right': '0' } : { 'padding-right': '0.5em' }">
                  <q-input filled square class="q-mb-md" v-model="storeCompanyInfo.listData.diachiWebsite" type="text"
                    label="Địa chỉ website" hint="VD: www.example.com" :rules="[
                      val => !!val || 'Địa chỉ website không được rỗng',
                    ]" lazy-rules />
                </div>

                <div class="col-md-6 col-12"
                  v-bind:style="$q.screen.lt.md ? { 'padding-left': '0' } : { 'padding-left': '0.5em' }">
                  <q-input filled square class="q-mb-md" v-model="storeCompanyInfo.listData.email" type="text"
                    label="Địa chỉ email" disable />
                </div>
                <div class="col-12">
                  <q-input filled square class="q-mb-md" v-model="storeCompanyInfo.listData.diachi" type="text"
                    label="Địa chỉ công ty"
                    hint="VD: Hà Nội: Số 2, đường 3.5, khu đô thị Gamuda Gardens, P. Trần Phú, Q. Hoàng Mai. Ra tết sẽ chuyển qua Xã Đàn, Quận Đống Đa, TP Hà Nội"
                    :rules="[
                      val => !!val || 'Địa chỉ   không được rỗng',
                    ]" lazy-rules />
                </div>

                <div class="col-12 flex justify-end q-pt-lg">
                  <b class="q-pr-sm" style="font-size: 1.2em;">Ngày tham gia: </b>
                  <div style="font-size: 1.2em;">{{ new
                    Date(storeCompanyInfo.listData.ngaythamgia).toLocaleDateString('en-GB') }}</div>
                </div>

                <div class="col-12 flex justify-end q-pt-lg">
                  <b class="q-pr-sm" style="font-size: 1.2em;">Loại nhà tuyển dụng: </b>
                  <div style="font-size: 1.2em;">{{ storeCompanyInfo.listData.loainhatuyendung }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-my-lg q-px-lg flex column">
            <h6>Mô tả về công ty của bạn: </h6>
            <hr class="q-mt-sm">

            <span class="hint">
              Gợi ý: Giới thiệu về công ty, điểm mạnh và các quyền lợi đặt ra</span>
            <div class="col-12">
              <q-input v-model="storeCompanyInfo.listData.mota" filled type="textarea" :maxlength="2500"
                label="Vui lòng điền mô tả về công ty của bạn..." />
            </div>
            <span>{{ storeCompanyInfo.listData.mota ? storeCompanyInfo.listData.mota.length : 0
            }}/2500 ký tự</span>
          </div>

          <div class="row q-pa-lg">
            <div class="col-12 flex justify-end">
              <q-btn class="q-mx-sm" color="red" type="submit" label="Lưu" />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped></style>
