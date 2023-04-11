<script setup>
import { ref, nextTick } from 'vue'
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreJob } from "src/stores/storeJob";
import { onMounted } from 'vue';
import { store } from 'quasar/wrappers';

onMounted(() => {
  const date = new Date();
  let index = 0;
  storeJob.listYear.push(date.getFullYear());
  while (index < 25) {
    index++;
    storeJob.listYear.push(date.getFullYear() - index);
  }
})

const storeAuthen = useStoreAuthentication();
const storeJob = useStoreJob();

const loading = ref(false)
const nextPage = ref(2)
const pageSize = 10
const lastPage = Math.ceil(storeJob.listSkill.length / pageSize)
const onScroll = ({ to, ref }) => {
  const lastIndex = storeJob.listSkill.length - 1

  if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
    loading.value = true

    setTimeout(() => {
      nextPage.value++
      nextTick(() => {
        ref.refresh()
        loading.value = false
      })
    }, 500)
  }
}

const clickExpandUserInfo = () => {
  storeJob._init();
  storeJob.expandUserInfo = true;
  var id = document.getElementById('expandUserInfo');
  id.scrollIntoView();
}

const clickExpandExperiment = () => {
  storeJob._init();
  storeJob.expandExperiment = true;
  var id = document.getElementById('expandExperiment');
  id.scrollIntoView();
}

const clickExpandSkill = () => {
  storeJob._init();
  storeJob.expandSkill = true;
  var id = document.getElementById('expandSkill');
  id.scrollIntoView();
}

const clickExpandEducation = () => {
  storeJob._init();
  storeJob.expandEducation = true;
  var id = document.getElementById('expandEducation');
  id.scrollIntoView();
}

const clickExpandCertification = () => {
  storeJob._init();
  storeJob.expandCertification = true;
  var id = document.getElementById('expandCertification');
  id.scrollIntoView();
}

const clickExpandPrize = () => {
  storeJob._init();
  storeJob.expandPrize = true;
  var id = document.getElementById('expandPrize');
  id.scrollIntoView();
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <div class="q-pa-md">
          <div class="row">
            <div class="col-md-3 col-xs-none">
              <h6 class="text-bold">Điền và hoàn thành các thông tin bên dưới để có thể tạo CV một cách tự động</h6>

              <ul class="q-px-md">
                <li class="q-mt-lg cursor-pointer" @click="clickExpandUserInfo()"><q-icon name="control_point" size="sm"
                    color="primary" />
                  Thêm Thông tin cá nhân
                  <hr class="q-mt-sm">
                </li>

                <li class="q-mt-lg cursor-pointer" @click="clickExpandExperiment()"><q-icon name="control_point" size="sm"
                    color="primary" />
                  Thêm Kinh nghiệm làm việc
                  <hr class="q-mt-sm">
                </li>

                <li class="q-mt-lg cursor-pointer" @click="clickExpandSkill()"><q-icon name="control_point" size="sm"
                    color="primary" />
                  Thêm Kỹ năng
                  <hr class="q-mt-sm">
                </li>

                <li class="q-mt-lg cursor-pointer" @click="clickExpandEducation()"><q-icon name="control_point" size="sm"
                    color="primary" />
                  Học vấn
                  <hr class="q-mt-sm">
                </li>

                <li class="q-mt-lg cursor-pointer" @click="clickExpandCertification()">
                  <q-icon name="control_point" size="sm" color="primary" />
                  Thêm Chứng chỉ
                  <hr class="q-mt-sm">
                </li>

                <li class="q-mt-lg cursor-pointer" @click="clickExpandPrize()"><q-icon name="control_point" size="sm"
                    color="primary" />
                  Thêm Giải thưởng và Danh hiệu
                  <hr class="q-mt-sm">
                </li>
              </ul>

              <q-btn color="red" class="q-mt-lg q-ml-md" label="Xem và Tải CV" />
            </div>

            <div class="col-md-9 col-sm-12">
              <q-list padding bordered class="rounded-borders">
                <!-- E1 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="person"
                  label="Giới thiệu bản thân" v-model="storeJob.expandUserInfo" id="expandUserInfo">
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div class="col-md-3 col-sm-12 flex column flex-center">
                          <q-avatar font-size="20px" size="151px" color="yellow-2" text-color="orange"
                            class="text-weight-bold flex flex-center justify-center q-mb-lg"
                            style="align-items: center
                                                                                                                    ; flex-direction: column;"><img
                              src="https://media.allure.com/photos/62b333877389827cf6e080f9/16:9/pass/Is%20it%20ever%20ok%20to%20dye%20your%20dog's%20fur"
                              alt=""></q-avatar>

                          <div class="flex flex-center justify-between">
                            <div class="flex flex-center justify-between">
                              <q-btn class="q-mr-sm" color="primary" icon="add_a_photo" label="Sửa" />
                            </div>

                            <div class="flex flex-center justify-around">
                              <q-btn class="q-mf-sm" color="red-14" icon="delete" label="Xóa" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-9 col-sm-12 q-px-lg">
                          <q-input filled square class="q-mb-md" v-model="storeAuthen.userName" type="text"
                            label="Họ và Tên" />
                          <q-input filled square class="q-mb-md" v-model="storeJob.chucVu" type="text" label="Chức vụ" />
                          <q-input filled v-model="storeJob.ngaySinh" mask="date" :rules="['date']">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="storeJob.ngaySinh">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled square class="q-mb-md" v-model="storeJob.phone" type="number"
                                label="Số điện thoại" />
                            </div>

                            <div class="col-md-6 q-pl-sm">
                              <q-input filled square class="q-mb-md" v-model="storeAuthen.email" type="text"
                                label="Địa chỉ email" />
                            </div>
                          </div>
                          <q-input filled square class="q-mb-md" v-model="storeJob.address" type="text"
                            label="Địa chỉ nhà" />
                        </div>
                      </div>

                      <div class="row q-my-lg q-px-lg flex column">
                        <h6>Mô tả về bản thân: </h6>
                        <hr class="q-mt-sm">

                        <span class="hint">
                          Gợi ý: Giới thiệu về bạn, điểm mạnh và số năm
                          kinh nghiệm</span>
                        <div class="col-12">
                          <q-input v-model="storeJob.moTaBanThan" filled type="textarea" :maxlength="2500"
                            label="Vui lòng điền mô tả bản thân tại đây..." />
                        </div>
                        <span>{{ storeJob.moTaBanThan.length }}/2500 ký tự</span>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E2 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="verified_user"
                  label="Thêm kinh nghiệm làm việc" v-model="storeJob.expandExperiment" id="expandExperiment">
                  <q-card>
                    <q-card-section>
                      <h6>Kinh nghiệm làm việc: </h6>
                      <hr class="q-mt-sm">

                      <div class="q-py-lg">
                        <span class="hint">
                          Gợi ý: Mô tả công việc cụ thể, những kết quả và thành tựu đạt được có số liệu dẫn chứng
                        </span>
                      </div>

                      <q-form @submit="() => { }" class="q-gutter-md">
                        <div>
                          <q-input filled square class="q-mb-md" v-model="storeJob.chucVuCongTy" type="text"
                            label="Chức vụ tại Công Ty" />

                          <q-input filled square class="q-mb-md" v-model="storeJob.tenCongTy" type="text"
                            label="Tên Công Ty" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled v-model="storeJob.lamTuNgay" mask="date" :rules="['date']" label="Từ ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.lamTuNgay">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>

                            <div class="col-md-6 q-pl-sm">
                              <q-input filled v-model="storeJob.lamDenNgay" mask="date" :rules="['date']"
                                label="Đến ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.lamDenNgay">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>

                          <div class="row flex column">
                            <span class="hint" style="font-style: normal">
                              Mô tả chi tiết:</span>
                            <div class="col-12">
                              <q-input v-model="storeJob.moTaChiTietHocVan" filled type="textarea" :maxlength="2500"
                                label="Vui lòng điền mô tả chi tiết công việc tại đây..." />
                            </div>
                            <span>{{ storeJob.moTaChiTietHocVan.length }}/2500 ký tự</span>
                          </div>
                        </div>

                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E3 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="psychology"
                  label="Thêm kỹ năng" v-model="storeJob.expandSkill" id="expandSkill">
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div class="col-12">
                          <q-select rounded outlined bottom-slots v-model="storeJob.listSelectSkill"
                            :options="storeJob.listSkill" multiple="" maxlength="10" max-values="10" label="Kỹ năng"
                            use-chips stack-label counter :loading="loading" @virtual-scroll="onScroll">
                            <template v-slot:append>
                              <q-icon name="clear" @click="storeJob.listSelectSkill = []" />
                            </template>

                            <template v-slot:hint>
                              {{ storeJob.listSelectSkill.length }}/10 kỹ năng
                            </template>
                          </q-select>
                        </div>
                      </div>

                      <div class="row q-pa-lg">
                        <div class="col-12 flex justify-end">
                          <q-btn class="q-mx-sm" color="red" label="Lưu" />
                          <q-btn class="q-mx-sm text-black" color="white" label="Hủy" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E4 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="auto_stories"
                  label="Học vấn" v-model="storeJob.expandEducation" id="expandEducation">
                  <q-card>
                    <q-card-section>
                      <h6>Học vấn: </h6>
                      <hr class="q-mt-sm">

                      <div class="q-py-lg">
                        <span class="hint">
                          Gợi ý: Mô tả ngành học và kiến thức
                        </span>
                      </div>

                      <q-form @submit="() => { }" class="q-gutter-md">
                        <div>
                          <q-input filled square class="q-mb-md" v-model="storeJob.chucVuCongTy" type="text"
                            label="Ngành học" />

                          <q-input filled square class="q-mb-md" v-model="storeJob.tenCongTy" type="text"
                            label="Tên Trường" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled v-model="storeJob.hocTuNgay" mask="date" :rules="['date']" label="Từ ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.hocTuNgay">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>

                            <div class="col-md-6 q-pl-sm">
                              <q-input filled v-model="storeJob.hocDenNgay" mask="date" :rules="['date']"
                                label="Đến ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.hocDenNgay">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>

                          <div class="row flex column">
                            <span class="hint" style="font-style: normal">
                              Mô tả chi tiết:</span>
                            <div class="col-12">
                              <q-input v-model="storeJob.moTaChiTietCongViec" filled type="textarea" :maxlength="2500"
                                label="Vui lòng điền mô tả chi tiết học vấn tại đây..." />
                            </div>
                            <span>{{ storeJob.moTaChiTietCongViec.length }}/2500 ký tự</span>
                          </div>
                        </div>

                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E5 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="badge"
                  label="Thêm chứng chỉ" v-model="storeJob.expandCertification" id="expandCertification">
                  <q-card>
                    <q-card-section>
                      <h6>Chứng chỉ: </h6>
                      <hr class="q-mt-sm">

                      <div class="q-py-lg">
                        <span class="hint">
                          Gợi ý: Cung cấp bằng chứng về chuyên môn và kỹ năng cụ thể của bạn
                        </span>
                      </div>

                      <q-form @submit="() => { }" class="q-gutter-md">
                        <div>
                          <q-input filled square class="q-mb-md" v-model="storeJob.tenChungChi" type="text"
                            label="Tên chứng chỉ" />

                          <q-input filled square class="q-mb-md" v-model="storeJob.toChucChungChi" type="text"
                            label="Tổ chức" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled v-model="storeJob.ngayNhan" mask="date" :rules="['date']" label="Ngày nhận">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.ngayNhan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>

                            <div class="col-md-6 q-pl-sm">
                              <q-input filled v-model="storeJob.ngayHetHan" mask="date" :rules="['date']" label="Hết hạn">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeJob.ngayHetHan">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>

                          <div class="row flex column">
                            <span class="hint" style="font-style: normal">
                              Mô tả chi tiết:</span>
                            <div class="col-12">
                              <q-input v-model="storeJob.moTaChungChi" filled type="textarea" :maxlength="2500"
                                label="Vui lòng mô tả về chứng chỉ này..." />
                            </div>
                            <span>{{ storeJob.moTaChungChi.length }}/2500 ký tự</span>
                          </div>
                        </div>


                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E6 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="workspace_premium"
                  label="Thêm giải thưởng và danh hiệu" v-model="storeJob.expandPrize" id="expandPrize">
                  <q-card>
                    <q-card-section>
                      <h6>Giải thưởng & Danh hiệu </h6>
                      <hr class="q-mt-sm">

                      <div class="q-py-lg">
                        <span class="hint">
                          Gợi ý: Thể hiện kết quả và thành tích của bạn trong công việc
                        </span>
                      </div>

                      <q-form @submit="() => { }" class="q-gutter-md">
                        <div>
                          <q-input filled square class="q-mb-md" v-model="storeJob.tenChungChi" type="text"
                            label="Tên giải thưởng/danh hiệu" />

                          <q-input filled square class="q-mb-md" v-model="storeJob.toChucGiaiThuong" type="text"
                            label="Tổ chức" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-select v-model="storeJob.selectMonth" :options="storeJob.listMonth" label="Tháng"
                                filled />
                            </div>
                            <div class="col-md-6 q-pl-sm">
                              <q-select v-model="storeJob.selectYear" :options="storeJob.listYear" label="Năm" filled />
                            </div>
                          </div>

                          <div class="row flex column">
                            <span class="hint" style="font-style: normal">
                              Mô tả chi tiết:</span>
                            <div class="col-12">
                              <q-input v-model="storeJob.moTaGiaiThuong" filled type="textarea" :maxlength="2500"
                                label="Vui lòng mô tả về giải thưởng mà bạn nhân được ..." />
                            </div>
                            <span>{{ storeJob.moTaGiaiThuong.length }}/2500 ký tự</span>
                          </div>
                        </div>


                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
* {
  scroll-behavior: auto;
}
hr {
  height: 1px;
  background-color: #c7c8c9;
}

span.hint {
  font-weight: 400;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #868686;
  padding: 20px 0;
}
</style>
