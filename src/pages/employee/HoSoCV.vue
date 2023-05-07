<script setup>
import { ref, nextTick } from 'vue'
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { useStoreHoSoCv } from "src/stores/storeHoSoCv";
import { onMounted } from 'vue';

onMounted(() => {
  const date = new Date();
  let index = 0;
  storeHoSoCv.listYear.push(date.getFullYear());
  while (index < 25) {
    index++;
    storeHoSoCv.listYear.push(date.getFullYear() - index);
  }

  storeHoSoCv.getDataOfUserById(storeAuthen.idUngTuyenVien);
  storeHoSoCv.getListSkill();
})

const storeAuthen = useStoreAuthentication();
const storeHoSoCv = useStoreHoSoCv();

const loading = ref(false)
const nextPage = ref(2)
const pageSize = 10
const lastPage = Math.ceil(storeHoSoCv.listSkill.length / pageSize)
const onScroll = ({ to, ref }) => {
  const lastIndex = storeHoSoCv.listSkill.length - 1

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
  storeHoSoCv._init();
  storeHoSoCv.expandUserInfo = true;
  var id = document.getElementById('expandUserInfo');
  id.scrollIntoView();
}

const clickExpandExperiment = () => {
  storeHoSoCv._init();
  storeHoSoCv.expandExperiment = true;
  var id = document.getElementById('expandExperiment');
  id.scrollIntoView();
}

const clickExpandSkill = () => {
  storeHoSoCv._init();
  storeHoSoCv.expandSkill = true;
  var id = document.getElementById('expandSkill');
  id.scrollIntoView();
}

const clickExpandEducation = () => {
  storeHoSoCv._init();
  storeHoSoCv.expandEducation = true;
  var id = document.getElementById('expandEducation');
  id.scrollIntoView();
}

const clickExpandCertification = () => {
  storeHoSoCv._init();
  storeHoSoCv.expandCertification = true;
  var id = document.getElementById('expandCertification');
  id.scrollIntoView();
}

const clickExpandPrize = () => {
  storeHoSoCv._init();
  storeHoSoCv.expandPrize = true;
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
                  label="Giới thiệu bản thân" v-model="storeHoSoCv.expandUserInfo" id="expandUserInfo">
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div class="col-md-3 col-sm-12 flex column flex-center">
                          <q-avatar font-size="20px" size="151px" color="yellow-2" text-color="orange"
                            class="text-weight-bold flex flex-center justify-center q-mb-lg"
                            style="align-items: center
                                                                                                                    ; flex-direction: column;"><img :src=storeAuthen.picture
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
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.hovaten" type="text"
                            label="Họ và Tên" />
                          <q-input filled v-model="storeHoSoCv.listData.ngaysinh" mask="date" :rules="['date']">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="storeHoSoCv.listData.ngaysinh">
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
                              <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.sdt" type="number"
                                label="Số điện thoại" />
                            </div>

                            <div class="col-md-6 q-pl-sm">
                              <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.email" type="text"
                                label="Địa chỉ email" disable />
                            </div>
                          </div>
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.diachi" type="text"
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
                          <q-input v-model="storeHoSoCv.listData.gioithieubanthan" filled type="textarea"
                            :maxlength="2500" label="Vui lòng điền mô tả bản thân tại đây..." />
                        </div>
                        <span>{{ storeHoSoCv.listData.gioithieubanthan ? storeHoSoCv.listData.gioithieubanthan.length : 0
                        }}/2500 ký tự</span>
                      </div>

                      <div class="row q-pa-lg">
                        <div class="col-12 flex justify-end">
                          <q-btn @click="storeHoSoCv.updateGioiThieuBanThan()" class="q-mx-sm" color="red" label="Lưu" />
                          <q-btn @click="storeHoSoCv.expandUserInfo = false" class="q-mx-sm text-black" color="white"
                              label="Hủy" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E2 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="verified_user"
                  label="Thêm kinh nghiệm làm việc" v-model="storeHoSoCv.expandExperiment" id="expandExperiment">
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
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.chucvu" type="text"
                            label="Chức vụ tại Công Ty" />

                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tencty" type="text"
                            label="Tên Công Ty" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled v-model="storeHoSoCv.listData.tungayKinhNghiemLV" mask="date"
                                :rules="['date']" label="Từ ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.tungayKinhNghiemLV">
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
                              <q-input filled v-model="storeHoSoCv.listData.denngayKinhNghiemLV" mask="date"
                                :rules="['date']" label="Đến ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.denngayKinhNghiemLV">
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
                              <q-input v-model="storeHoSoCv.listData.motachitietKinhNghiemLV" filled type="textarea"
                                :maxlength="2500" label="Vui lòng điền mô tả chi tiết công việc tại đây..." />
                            </div>
                            <span>{{ storeHoSoCv.listData.motachitietKinhNghiemLV ?
                              storeHoSoCv.listData.motachitietKinhNghiemLV.length : 0 }}/2500 ký tự</span>
                          </div>
                        </div>

                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn @click="storeHoSoCv.updateKinhNghiemLamViec()" class="q-mx-sm" color="red"
                              label="Lưu" />
                            <q-btn @click="storeHoSoCv.expandExperiment = false" class="q-mx-sm text-black" color="white"
                              label="Hủy" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E3 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="psychology"
                  label="Thêm kỹ năng" v-model="storeHoSoCv.expandSkill" id="expandSkill">
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div class="col-12">
                          <q-select rounded outlined bottom-slots v-model="storeHoSoCv.listSelectSkill"
                            :options="storeHoSoCv.listSkill" multiple="" maxlength="10" max-values="10" label="Kỹ năng"
                            use-chips stack-label counter :loading="loading" @virtual-scroll="onScroll" option-value="_id"
                            option-label="ngonngu">
                            <template v-slot:append>
                              <q-icon name="clear" @click="storeHoSoCv.listSelectSkill = []" />
                            </template>

                            <template v-slot:hint>
                              {{ storeHoSoCv.listSelectSkill.length }}/10 kỹ năng
                            </template>
                          </q-select>
                        </div>
                        <b class="q-pt-md q-px-sm">Kỹ năng: <span class="text-weight-regular">{{
                          storeHoSoCv.listData.kiNang }}</span></b>
                      </div>



                      <div class="row q-pa-lg">
                        <div class="col-12 flex justify-end">
                          <q-btn class="q-mx-sm" color="red" label="Lưu" @click="storeHoSoCv.updateKyNang()" />
                          <q-btn class="q-mx-sm text-black" color="white" label="Hủy" @click="storeHoSoCv.expandSkill = false" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E4 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="auto_stories"
                  label="Học vấn" v-model="storeHoSoCv.expandEducation" id="expandEducation">
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
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tenNganhHoc" type="text"
                            label="Ngành học" />

                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tenTruongHoc" type="text"
                            label="Tên Trường" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 q-pr-sm">
                              <q-input filled v-model="storeHoSoCv.listData.tungayHocVan" mask="date" :rules="['date']"
                                label="Từ ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.tungayHocVan">
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
                              <q-input filled v-model="storeHoSoCv.listData.denngayHocVan" mask="date" :rules="['date']"
                                label="Đến ngày">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.denngayHocVan">
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
                              <q-input v-model="storeHoSoCv.listData.motachitietHocVan" filled type="textarea"
                                :maxlength="2500" label="Vui lòng điền mô tả chi tiết học vấn tại đây..." />
                            </div>
                            <span>{{ storeHoSoCv.listData.motachitietHocVan ?
                              storeHoSoCv.listData.motachitietHocVan.length : 0 }}/2500 ký tự</span>
                          </div>
                        </div>

                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" @click="storeHoSoCv.updateHocVan()" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" @click="storeHoSoCv.expandEducation = false" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E5 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="badge"
                  label="Thêm chứng chỉ" v-model="storeHoSoCv.expandCertification" id="expandCertification">
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
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tenchungchi" type="text"
                            label="Tên chứng chỉ" />

                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tochuc" type="text"
                            label="Tổ chức" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 col-6 q-pr-sm">
                              <q-input filled v-model="storeHoSoCv.listData.ngaycap" mask="date" :rules="['date']"
                                label="Ngày nhận">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.ngaycap">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>

                            <div class="col-md-6 col-6 q-pl-sm">
                              <q-input filled v-model="storeHoSoCv.listData.ngayhethan" mask="date" :rules="['date']"
                                label="Hết hạn">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="storeHoSoCv.listData.ngayhethan">
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
                              <q-input v-model="storeHoSoCv.listData.motachitietChungChi" filled type="textarea"
                                :maxlength="2500" label="Vui lòng mô tả về chứng chỉ này..." />
                            </div>
                            <span>{{ storeHoSoCv.listData.motachitietChungChi ?
                              storeHoSoCv.listData.motachitietChungChi.length : 0 }}/2500 ký tự</span>
                          </div>
                        </div>


                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" @click="storeHoSoCv.updateChungChi()" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" @click="storeHoSoCv.expandCertification = false" />
                          </div>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- E6 -->
                <q-expansion-item class="q-pb-lg text-bold" dense dense-toggle expand-separator icon="workspace_premium"
                  label="Thêm giải thưởng và danh hiệu" v-model="storeHoSoCv.expandPrize" id="expandPrize">
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
                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tenGiaiThuong" type="text"
                            label="Tên giải thưởng/danh hiệu" />

                          <q-input filled square class="q-mb-md" v-model="storeHoSoCv.listData.tochucGiaiThuong"
                            type="text" label="Tổ chức" />

                          <div class="row flex justify-between">
                            <div class="col-md-6 col-6 q-pr-sm">
                              <q-select v-model="storeHoSoCv.listData.thang" :options="storeHoSoCv.listMonth"
                                label="Tháng" filled />
                            </div>
                            <div class="col-md-6 col-6 q-pl-sm">
                              <q-select v-model="storeHoSoCv.listData.nam" :options="storeHoSoCv.listYear" label="Năm"
                                filled />
                            </div>
                          </div>

                          <div class="row flex column">
                            <span class="hint" style="font-style: normal">
                              Mô tả chi tiết:</span>
                            <div class="col-12">
                              <q-input v-model="storeHoSoCv.listData.motachitietGiaiThuong" filled type="textarea"
                                :maxlength="2500" label="Vui lòng mô tả về giải thưởng mà bạn nhân được ..." />
                            </div>
                            <span>{{ storeHoSoCv.listData.motachitietGiaiThuong ?
                              storeHoSoCv.listData.motachitietGiaiThuong.length : 0 }}/2500 ký tự</span>
                          </div>
                        </div>


                        <div class="row q-pa-lg">
                          <div class="col-12 flex justify-end">
                            <q-btn class="q-mx-sm" color="red" label="Lưu" @click="storeHoSoCv.updateGiaiThuong()" />
                            <q-btn class="q-mx-sm text-black" color="white" label="Hủy" @click="storeHoSoCv.expandPrize = false" />
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
