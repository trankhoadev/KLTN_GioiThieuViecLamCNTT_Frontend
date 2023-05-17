<script setup>
import { onMounted } from 'vue';
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreHoSoCv } from "src/stores/storeHoSoCv";
import { useRoute, useRouter } from 'vue-router';
import { Dialog } from 'quasar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const storeAuthen = useStoreAuthentication();
const storeHoSoCv = useStoreHoSoCv();
const route = useRoute();
var pdfGenerated = true;
onMounted(async () => {
  await storeHoSoCv.getDataOfUserById(route.params.id);
  if (storeHoSoCv.listData._id === undefined) {
    Dialog.create({
      title: "Thông báo",
      message: "Vui lòng kiểm tra lại dữ liệu!",
      persistent: true,
    })
  }
});

const exportPdf = () => {
  const generateBtn = document.querySelector('q-btn');
  if (generateBtn) {
    generateBtn.parentNode.removeChild(generateBtn);
  }

  const element = document.documentElement;

  html2canvas(element).then(canvas => {
    const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);

    const imageData = canvas.toDataURL('image/jpeg', 1.0);

    pdf.addImage(imageData, 'JPEG', -420, 50, canvas.width, canvas.height);

    pdf.save('HoSoCV.pdf');
  })
}
</script>

<template>
  <q-layout>
    <q-btn v-if="pdfGenerated" color="red" icon="picture_as_pdf" label="Xuất PDF" @click="exportPdf()" />
    <q-page-container style="height: 100vh;" class="flex flex-center">
      <q-page class="q-px-lg" v-bind:style="$q.screen.lt.lg ? { 'width': '100vw' } : { 'width': '50vw' }"
        style="border: 1px solid #f0f0f0;">
        <div class="q-px-md">
          <div class="wrap">
            <div class="header-background" style="height: 2vw; background-color: rgba(2,161,139,255);"></div>
            <div class="content q-px-lg">
              <h4 class="text-uppercase text-weight-bold q-pa-md q-pl-sm" style="color: #00a086; letter-spacing: 1px;">{{
                storeHoSoCv.listData.hovaten }}</h4>
              <div class="row q-pl-sm">
                <div class="col-12 col-md-6">
                  <div class="flex q-pt-none" style="align-items: center;">
                    <q-icon name="cake" color="teal-14" size="md" />
                    <span class="q-pl-md" style="max-width: 90%;">Ngày sinh: {{ new
                      Date(storeHoSoCv.listData.ngaysinh).toLocaleDateString('en-GB') }}</span>
                  </div>

                  <div class="flex q-pt-sm" style="align-items: center;"><q-icon name="call" color="teal-14" size="md" />
                    <span class="q-pl-md" style="max-width: 90%;">Số điện thoại: {{ storeHoSoCv.listData.sdt }}</span>
                  </div>

                  <div class="flex q-pt-sm" style="align-items: center;"><q-icon name="home" color="teal-14" size="md" />
                    <span class="q-pl-md" style="max-width: 90%;">Địa chỉ: {{ storeHoSoCv.listData.diachi }}</span>
                  </div>

                  <div class="flex q-pt-sm" style="align-items: center;"><q-icon name="email" color="teal-14" size="md" />
                    <span class="q-pl-md" style="max-width: 90%;">Email: {{ storeHoSoCv.listData.email }}</span>
                  </div>
                </div>
                <div class="col-12 col-md-6 flex" style="justify-content: right; align-items: flex-start;">
                  <img :src=storeHoSoCv.listData.anhdaidien style="max-width: 40%;" alt="">
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Giới thiệu về bản thân</h6>
                  <p>{{ storeHoSoCv.listData.gioithieubanthan }}</p>
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Học vấn</h6>
                </div>
                <div class="col-7">
                  <b style="font-size: 1.1em;" class="text-uppercase">{{ storeHoSoCv.listData.tenTruongHoc }}</b>
                  <p>Ngành học: {{ storeHoSoCv.listData.tenNganhHoc }}</p>
                  <p>Mô tả: {{ storeHoSoCv.listData.motachitietHocVan }}</p>
                </div>

                <div class="col-5 flex justify-end">
                  <b style="font-size: 1.1em; color: #07a88f;">{{ new
                    Date(storeHoSoCv.listData.tungayHocVan).toLocaleDateString('en-GB') }} - {{ new
    Date(storeHoSoCv.listData.denngayHocVan).toLocaleDateString('en-GB') }}</b>
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Kinh nghiệm làm việc</h6>
                </div>
                <div class="col-7">
                  <b style="font-size: 1.1em;" class="text-uppercase">{{ storeHoSoCv.listData.tencty }}</b>
                  <p>Chức vụ: {{ storeHoSoCv.listData.chucvu }}</p>
                  <p>Mô tả: {{ storeHoSoCv.listData.motachitietKinhNghiemLV }}</p>
                </div>

                <div class="col-5 flex justify-end">
                  <b style="font-size: 1.1em; color: #07a88f;">{{ new
                    Date(storeHoSoCv.listData.tungayKinhNghiemLV).toLocaleDateString('en-GB') }} - {{ new
    Date(storeHoSoCv.listData.denngayKinhNghiemLV).toLocaleDateString('en-GB') }}</b>
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Chứng chỉ</h6>
                </div>
                <div class="col-7">
                  <b style="font-size: 1.1em;" class="text-uppercase">{{ storeHoSoCv.listData.tenchungchi }}</b>
                  <p>Tổ chức: {{ storeHoSoCv.listData.tochuc }}</p>
                  <p>Mô tả: {{ storeHoSoCv.listData.motachitietChungChi }}</p>
                </div>

                <div class="col-5 flex justify-end">
                  <b style="font-size: 1.1em; color: #07a88f;">{{ new Date(storeHoSoCv.listData.ngaycap
                  ).toLocaleDateString('en-GB') }} - {{ new
  Date(storeHoSoCv.listData.ngayhethan).toLocaleDateString('en-GB') }}</b>
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Giải thưởng và danh hiệu</h6>
                </div>
                <div class="col-7">
                  <b style="font-size: 1.1em;" class="text-uppercase">{{ storeHoSoCv.listData.tenGiaiThuong }}</b>
                  <p>Tổ chức: {{ storeHoSoCv.listData.tochucGiaiThuong }}</p>
                  <p>Mô tả: {{ storeHoSoCv.listData.motachitietGiaiThuong }}</p>
                </div>

                <div class="col-5 flex justify-end">
                  <b style="font-size: 1.1em; color: #07a88f;">{{ storeHoSoCv.listData.thang }} - {{
                    storeHoSoCv.listData.nam }}</b>
                </div>
              </div>

              <div class="row q-pl-sm">
                <div class="col-12">
                  <h6 class="q-pt-md text-uppercase" style="color: #00a28a;">Kỹ năng</h6>
                  <p>Các kỹ năng chính: {{ storeHoSoCv.listData.kiNang }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
