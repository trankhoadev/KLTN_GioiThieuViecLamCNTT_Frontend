<script setup>
import { useStoreJob } from 'src/stores/storeJob';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';
import { useQuasar, Loading } from 'quasar';
import { useMyStore } from 'src/stores/myStore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const storeJob = useStoreJob();
const myStore = useMyStore();
const storeAuthen = useStoreAuthentication();
const $q = useQuasar();
const route = useRoute();

onMounted(async () => {
  /* get tin tuyen dung */
  await storeJob.getDataJobDetail(route.params.id);
  /* get nha tuyen dung */
  await storeJob.getNhaTuyenDungById(storeJob.listDataJobDetail.nhatuyendung._id);
  await storeJob.getListTag();
  await storeJob.getAllPost();
  await storeJob.getAllNhaTuyenDung();
  await storeJob.getAllDonUngTuyen();
  await storeJob.getListDanhGia(storeJob.listDataJobDetail._id);
  await storeJob.getListYeuThich();

  storeJob.listDataJobDetail.moTaCongViec = storeJob.listDataJobDetail.moTaCongViec.replace(/\n/gi, "\n - ");
  storeJob.listDataJobDetail.moTaYeuCau = storeJob.listDataJobDetail.moTaYeuCau.replace(/\n/gi, "\n - ");
  storeJob.listDataJobDetail.quyenLoiUngVien = storeJob.listDataJobDetail.quyenLoiUngVien.replace(/\n/gi, "\n - ");

  /* Hide "Ứng tuyển" button */
  storeJob.listDonUngTuyen.filter((e) => {
    if (e.tintuyendung._id === storeJob.listDataJobDetail._id &&
      e.ungtuyenvien._id === localStorage.getItem("idUngTuyenVien")) {
      storeJob.listDataJobDetail.isUngTuyen = true;
    }
  });


  /* New code */
  // if (storeJob.listData.length > 9) {
  //   storeJob.listData = [...storeJob.listData].slice(0, -1);
  // }

  /* Get favorite of every post */
  storeJob.listFavorite.filter((e) => {
    for (let i = 0; i < storeJob.listData.length; ++i) {
      if (e.tintuyendung._id === storeJob.listData[i]._id && e.ungtuyenvien._id === storeAuthen.idUngTuyenVien) {
        storeJob.listData[i].isYeuThich = true;
        storeJob.listData[i].yeuThichId = e._id;
      }
    }
  })

  /* get favorite for current post */
  storeJob.listFavorite.filter(e => {
    if (e.tintuyendung._id === storeJob.listDataJobDetail._id && e.ungtuyenvien._id === storeAuthen.idUngTuyenVien) {
      storeJob.listDataJobDetail.isYeuThich = true;
      storeJob.listDataJobDetail.yeuThichId = e._id;
    }
  })

  /* Note: Because cant get data directly from server so need using that. Have some problem like object promise before */
  /* Handle get data of tag from server */
  for (let i = 0; i < storeJob.listData.length; ++i) {
    for (let j = 0; j < storeJob.listData[i].ngonngu.length; ++j) {
      storeJob.listSkill.map((e) => {
        if (storeJob.listData[i].ngonngu[j]._id === e._id) {
          storeJob.listData[i].ngonngu[j] = e.ngonngu;
        }
      });
    }
  }

  /* Get picture and name of recruiter */
  for (let i = 0; i < storeJob.listData.length; ++i) {
    await storeJob.getNhaTuyenDungById(storeJob.listData[i].nhatuyendung);
    storeJob.listData[i].tennhatuyendung = storeJob.listDataOneRecruiter.tencongty;
    storeJob.listData[i].anhdaidien = storeJob.listDataOneRecruiter.anhdaidien;
  }

  /* Hide "Ứng tuyển" button */
  await storeJob.getAllDonUngTuyen();
  storeJob.listDonUngTuyen.filter((e) => {
    for (let i = 0; i < storeJob.listData.length; ++i) {
      if (e.tintuyendung._id === storeJob.listData[i]._id &&
        e.ungtuyenvien._id === localStorage.getItem("idUngTuyenVien")) {
        storeJob.listData[i].isUngTuyen = true;
      }
    }
  });

  /* pagination for comment */
  if (storeJob.listRate.length > 2) {
    let arr = [];
    for (let i = 0; i < 3; ++i) {
      arr.push(storeJob.listRate[i]);
    }
    storeJob.listRate = [...arr];
  }

  /* pagination for job */
  if (storeJob.listData.length > 4) {
    let arr = [];
    for (let i = 0; i < 5; ++i) {
      arr.push(storeJob.listData[i]);
    }
    storeJob.listData = [...arr];
  }

  console.log(storeJob.listDataJobDetail);
});

const clickScrollTinTuyenDung = () => {
  var id = document.getElementById('tab-info');
  id.scrollIntoView();
}

const clickScrollThongTinCongTy = () => {
  var id = document.getElementById('tab-info-company');
  id.scrollIntoView();
}

const clickScrollViecLamLienQuan = () => {
  var id = document.getElementById('tab-job');
  id.scrollIntoView();
}

const clickScrollDanhGia = () => {
  var id = document.getElementById('tab-rate');
  id.scrollIntoView();
}

watch(() => storeJob.panigateCommentSelected, val => {
  const executePanigation = async () => {
    Loading.show({
      message: "Vui lòng đợi trong giấy lát...",
      boxClass: "bg-grey-2 text-grey-9",
      spinnerColor: "primary",
    });

    let arr = [];
    storeJob.listRate = [];
    await storeJob.getListDanhGia(route.params.id);

    for (let i = (storeJob.panigateCommentSelected - 1) * 3; i < storeJob.panigateCommentSelected * 3; ++i) {
      // storeJob.listRate.push(storeJob.listRate[i]);
      if (storeJob.listRate[i] !== undefined) {
        arr.push(storeJob.listRate[i])
      }
    }

    setTimeout(() => {
      storeJob.listRate = [...arr];
      Loading.hide();
    }, 300);
  }
  executePanigation();
})
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-grey-3">
        <div class="row justify-evenly q-py-md container" style="margin: 0 auto;"
          v-bind:style="$q.screen.lt.md ? { 'width': '95%' } : { 'width': '70%' }">
          <div class="row justify-evenly bg-white q-pa-md full-width">
            <div class="col-md-4 col-12 q-my-md">
              <q-form @submit="storeJob.searchJob()">
                <q-input type="text" placeholder="Tên công việc, vị trí muốn ứng tuyển..." outlined
                  v-model="storeJob.searchInput">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-form>
            </div>
            <!-- <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectSkill"
                :options="storeJob.listSkill" label="Lĩnh vực" option-value="_id" option-label="ngonngu">
                <template v-slot:append>
                  <q-icon name="business" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectLevel"
                :options="myStore.optionPosition" label="Cấp bậc">
                <template v-slot:append>
                  <q-icon name="badge" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectSalary"
                :options="myStore.optionSalary" label="Mức lương">
                <template v-slot:append>
                  <q-icon name="monetization_on" color="light-green-10" />
                </template>
              </q-select>
            </div> -->
            <div class="col-md-8 col-12 flex flex-start q-pl-md" style="align-items: center;"
              v-bind:class="{ 'flex-center': $q.screen.md || $q.screen.sm || $q.screen.xs }">
              <q-btn color="light-green-10" icon="search" label="Tìm kiếm" @click="storeJob.searchJob()" />
            </div>
          </div>

          <div class="row q-my-lg q-px-md full-width bg-white q-py-lg">
            <div class="col-md-2 col-12 flex flex-center">
              <div class="box-company-logo q-py-lg">
                <img :src=storeJob.listDataOneRecruiter.anhdaidien alt="">
              </div>
            </div>

            <div class="col-md-10 col-12">
              <div class="job-title q-pt-lg">
                {{ storeJob.listDataJobDetail.tieude }}
              </div>
              <p class="company-name">{{ storeJob.listDataOneRecruiter.tencongty }}</p>
            </div>
          </div>

          <div class="row q-py-lg q-px-md full-width">
            <q-tabs v-model="storeJob.tabJobDetail" narrow-indicator dense align="justify"
              class="text-black text-green-7">

              <q-tab :ripple="false" name="news" icon="mail" label="Tin tuyển dụng" @click="clickScrollTinTuyenDung()" />


              <q-tab :ripple="false" name="info" icon="alarm" label="Thông tin công ty"
                @click="clickScrollThongTinCongTy()" />

              <q-tab :ripple="false" name="relate" icon="thumb_up" label="Đánh giá" @click="clickScrollDanhGia()" />


              <q-tab :ripple="false" name="relate" icon="movie" label="Việc làm liên quan"
                @click="clickScrollViecLamLienQuan()" />

            </q-tabs>
          </div>

          <div class="row bg-white full-width q-px-md justify-evenly" id="tab-info">
            <div class="col-md-7 col-12 q-my-md">
              <h6 class="box-title">Chi tiết tin tuyển dụng</h6>

              <div class="box-info">
                <p class="p-underline">Thông tin chung</p>

                <div class="box-main">
                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg" alt="">
                    <div>
                      <strong>Mức lương </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.mucluong }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg" alt="">
                    <div>
                      <strong>Số lượng tuyển </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.soLuongTuyen }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg" alt="">
                    <div>
                      <strong>Hình thức làm việc </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.hinhThucLamViec }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/6.svg" alt="">
                    <div>
                      <strong>Cấp bậc </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.vitri }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/3.svg" alt="">
                    <div>
                      <strong>Giới tính </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.gioitinh }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/7.svg" alt="">
                    <div>
                      <strong>Kinh nghiệm </strong>
                      <br>
                      <span>{{ storeJob.listDataJobDetail.kinhNghiem }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="box-info q-mt-md q-py-md">
                <p class="p-underline">Địa điểm làm việc</p>
                <div class="q-pb-md">- {{ storeJob.listDataJobDetail.diaChi }}</div>
              </div>

              <div class="q-mt-md post-info">
                <div class="post-item">
                  <h3>Mô tả công việc</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
                      storeJob.listDataJobDetail.moTaCongViec }}</p>
                  </div>
                </div>

                <div class="post-item">
                  <h3>Yêu cầu ứng viên</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
                      storeJob.listDataJobDetail.moTaYeuCau }}</p>
                  </div>
                </div>

                <div class="post-item">
                  <h3>Quyền lợi</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 35px;"> - {{
                      storeJob.listDataJobDetail.quyenLoiUngVien }}</p>
                  </div>
                </div>

                <div v-if="storeAuthen.loaiTaiKhoan === 'user'" class="post-item">
                  <h3>Cách thức ứng tuyển</h3>
                  <div>
                    <q-btn v-if="!storeJob.listDataJobDetail.isUngTuyen"
                      @click="storeJob.seeDetail({ _id: storeJob.listDataJobDetail._id, tieude: storeJob.listDataJobDetail.tieude })"
                      color="green-7" label="Ứng tuyển ngay" />
                    <q-btn v-else class="apply-now q-mr-md" color="grey" label="Đã ứng tuyển" icon="done" disable />

                    <q-btn v-if="!storeJob.listDataJobDetail.isYeuThich"
                      @click="storeJob.yeuThichPost(route.params.id, storeAuthen.idUngTuyenVien)" class="favorite"
                      icon="favorite_border" />
                    <q-btn v-else @click="storeJob.huyYeuThichPost(storeJob.listDataJobDetail.yeuThichId)"
                      class="favorite text-green" icon="favorite" />
                  </div>
                </div>
              </div>
            </div>

            <q-dialog v-model="storeJob.isSeeDetail">
              <q-card>
                <q-card-section class="row items-center">
                  Bạn có chắc chắn muốn ứng tuyển tin "{{ storeJob.ungTuyenSelectedData.tieude }}" không ?
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Đồng ý" color="primary" v-close-popup
                    @click="storeJob.ungTuyenTinTuyenDung(storeJob.ungTuyenSelectedData._id)" />
                  <q-btn flat label="Hủy" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>


            <div class="col-md-4 col-12 q-mt-lg">
              <div class="box-share-job">
                <h3>Chia sẻ tin tuyển dụng</h3>
                <p>Sao chép đường dẫn</p>
                <div class="box-copy">
                  <div class="url-copy">
                    {{ storeJob.href }}
                  </div>
                  <div class="btn-copy">
                    <q-btn color="green" class="bg-white" size="md" icon="content_copy"
                      @click="storeJob.copyToClipBoard(storeJob.href)" />
                  </div>
                </div>
                <p>Chia sẻ qua mạng xã hội</p>
                <div class="box-share flex">
                  <div class="q-mx-sm" @click="storeJob.openUrl(storeJob.defaultShareFacebookUrl, storeJob.href)">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/facebook.png" alt="" />
                  </div>
                  <div class="q-mx-sm" @click="storeJob.openUrl(storeJob.defaultShareTwitterUrl, storeJob.href)">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/twitter.png" alt="">
                  </div>
                  <div class="q-mx-sm" @click="storeJob.openUrl(storeJob.defaultShareLinkedinUrl, storeJob.href)">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/linkedin.png" alt="">
                  </div>
                </div>
              </div>

              <div class="box-share-job">
                <div class="skills flex column">
                  <h6 class="text-weight-bold">Tag: </h6>
                  <br>
                  <div>
                    <label class="item" v-for="tag in storeJob.listDataJobDetail.ngonngu" :key="tag">
                      {{ tag.ngonngu }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="box-share-job">
                <div class="skills flex column">
                  <h6 class="text-weight-bold">Khu vực: </h6>
                  <br>
                  <div>
                    {{ storeJob.listDataJobDetail.diaChi }}
                  </div>
                </div>
              </div>

              <div class="box-share-job">
                <div class="skills flex column">
                  <h6 class="text-weight-bold">Thông tin liên hệ: </h6>
                  <br>
                  <div>
                    <b>Tên người liên hệ: </b> <span>{{ storeJob.listDataJobDetail.tenNguoiLienHe }}</span>
                    <br>
                    <b class="q-py-md">Sdt: </b> <span>{{ storeJob.listDataJobDetail.soDienThoaiLienHe }}</span>
                    <br>
                    <b>Email: </b> <span>{{ storeJob.listDataJobDetail.emailLienHe }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row bg-white full-width q-px-lg justify-evenly q-mt-md q-pb-lg q-pt-md" id="tab-info-company">
            <div class="col-12 q-my-md q-mx-lg">
              <div class="flex justify-between">
                <h6 class="box-title">Thông tin {{ storeJob.listDataOneRecruiter.tencongty }}</h6>
                <a class="open-link" href="" target="_blank">Xem trang công ty
                  <q-icon name="north_east" />
                </a>
              </div>

              <div class="q-mt-md">
                <div class="box-item">
                  <div class="row">
                    <div class="col-1 flex flex-center">
                      <img src="https://www.topcv.vn/v4/image/job-detail/icon/8.svg" alt="">
                    </div>
                    <div class="col-11">
                      <div>
                        <p class="q-mb-none text-bold">Giới thiệu</p>
                        <span class="content">
                          <p class="q-pr-lg">{{ storeJob.listDataOneRecruiter.mota }} </p>
                        </span>
                      </div>
                    </div>
                  </div>


                </div>
                <div class="box-item q-mt-md">
                  <div class="row">
                    <div class="col-1 flex flex-center">
                      <img src="https://www.topcv.vn/v4/image/job-detail/icon/9.svg" alt="">
                    </div>
                    <div class="col-11">
                      <div>
                        <p class="q-mb-none text-bold">Website</p>
                        <span class="content">
                          <p class="q-pr-lg">{{ storeJob.listDataOneRecruiter.diachiWebsite }}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-item q-mt-md">
                  <div class="row">
                    <div class="col-1 flex flex-center">
                      <img src="https://www.topcv.vn/v4/image/job-detail/icon/10.svg" alt="">
                    </div>
                    <div class="col-11">
                      <div>
                        <p class="q-mb-none text-bold">Địa điểm</p>
                        <span class="content">
                          <p class="q-pr-lg">{{ storeJob.listDataOneRecruiter.diachi }}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-item q-mt-md">
                  <div class="row">
                    <div class="col-1 flex flex-center">
                      <q-icon name="calendar_month" size="md" color="green-7" />
                    </div>
                    <div class="col-11">
                      <div>
                        <p class="q-mb-none text-bold">Ngày thành lập</p>
                        <span class="content">
                          <p class="q-pr-lg">{{ new
                            Date(storeJob.listDataOneRecruiter.ngaythanhlap).toLocaleDateString('en-GB') }}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row bg-white full-width q-px-lg justify-evenly q-mt-md q-pb-lg q-pt-md" id="tab-rate">
            <div class="col-12 q-my-md q-mx-lg">
              <div class="flex justify-between">
                <h6 class="box-title">Đánh giá</h6>
              </div>
              <div class="q-mt-md q-px-lg">
                <div class="col-12">
                  <div class="item highlight q-pa-none q">
                    <q-form v-if="storeAuthen.loaiTaiKhoan === 'user'" class="q-gutter-md">
                      <div class="flex">
                        <q-rating name="quality" v-model="storeJob.rate" min="1" max="5" size="2em" color="yellow"
                          icon="star_border" icon-selected="star" no-dimming />
                        <div class="q-pl-lg flex" style="align-items: center;" v-if="storeJob.rate === 5">
                          <q-icon name="sentiment_very_satisfied" size="md" color="grey-7" />
                          <span class="q-pl-sm text-grey-7" style="font-size: 1.2em;">Rất tốt</span>
                        </div>

                        <div class="q-pl-lg flex" style="align-items: center;" v-if="storeJob.rate === 4">
                          <q-icon name="sentiment_very_satisfied" size="md" color="grey-7" />
                          <span class="q-pl-sm text-grey-7" style="font-size: 1.2em;">Tốt</span>
                        </div>

                        <div class="q-pl-lg flex" style="align-items: center;" v-if="storeJob.rate === 3">
                          <q-icon name="sentiment_satisfied" size="md" color="grey-7" />
                          <span class="q-pl-sm text-grey-7" style="font-size: 1.2em;">Bình thường</span>
                        </div>

                        <div class="q-pl-lg flex" style="align-items: center;" v-if="storeJob.rate === 2">
                          <q-icon name="sentiment_dissatisfied" size="md" color="grey-7" />
                          <span class="q-pl-sm text-grey-7" style="font-size: 1.2em;">Tệ</span>
                        </div>

                        <div class="q-pl-lg flex" style="align-items: center;" v-if="storeJob.rate === 1">
                          <q-icon name="sentiment_very_dissatisfied" size="md" color="grey-7" />
                          <span class="q-pl-sm text-grey-7" style="font-size: 1.2em;">Rất tệ</span>
                        </div>

                      </div>
                      <h6 class="text-weight-bold q-pb-md">Để lại bình luận của bạn bên dưới</h6>

                      <q-input v-model="storeJob.inputComment" filled type="textarea"
                        placeholder="Vui lòng điền tại đây..." counter maxlength="500" />

                      <div class="flex justify-end q-py-lg">
                        <q-btn @click="storeJob.danhGiaPost()" color="green-7" label="Bình Luận" />
                      </div>
                    </q-form>

                    <h6 class="text-weight-bold q-pb-lg">{{ storeJob.lengthRate }} bình luận</h6>

                    <div class="row q-my-md" v-for="item in storeJob.listRate" :key="item.id">
                      <div class="col-2 flex flex center q-py-lg">
                        <!-- <img :src=item.ungtuyenvien.anhdaidien alt="" style="width: 80%;"> -->
                        <img :src=item.ungtuyenvien.anhdaidien style="width: 50%; border-radius: 50%;">
                      </div>
                      <div class="col-8">
                        <!-- <h6 class="text-weight-bold">{{ item.ungtuyenvien }}</h6> -->
                        <h6 class="text-weight-bold">{{ item.ungtuyenvien.hovaten }}</h6>
                        <div v-if="item.xeploai === '5'">
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                        </div>

                        <div v-if="item.xeploai === '4'">
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                        </div>

                        <div v-if="item.xeploai === '3'">
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                        </div>

                        <div v-if="item.xeploai === '2'">
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                        </div>

                        <div v-if="item.xeploai === '1'">
                          <q-icon name="star" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                          <q-icon name="star_border" size="sm" color="yellow" />
                        </div>

                        <p class="q-pl-sm q-py-sm">{{ item.noidung }}</p>

                        <span class="q-pl-sm text-grey-6">{{ new Date(item.ngay).toLocaleDateString('en-GB') }}</span>
                      </div>
                      <div class="col-2 flex flex-center justify-end">
                        <b class="cursor-pointer">Reply</b>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div v-if="storeJob.listRate.length" class="q-pa-lg flex flex-center">
                      <q-pagination color="green-7" v-model="storeJob.panigateCommentSelected"
                        :max="storeJob.lengthRate / 3 + 1" :max-pages="6" direction-links />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="row bg-white full-width q-px-lg justify-evenly q-mt-md q-pb-lg q-pt-md" id="tab-job">
            <div class="col-12 q-my-md q-mx-lg">
              <div class="flex justify-between">
                <h6 class="box-title">Việc làm liên quan</h6>
              </div>
              <div class="q-mt-md q-px-lg">
                <div class="col-12">
                  <div class="item highlight q-pa-none q" v-for="item in storeJob.listData" :key="item.id">
                    <div class="row q-my-md default">
                      <div class="col-md-2 col-12">
                        <div class="avatar">
                          <img class="" style="max-width: 100px; max-height: 100px;" :src=item.nhatuyendung.anhdaidien
                            alt="">
                        </div>
                      </div>
                      <div class="col-md-7 col-12">
                        <div class="title">
                          <router-link :to="`/search/job/${item._id}`" target="_blank">
                            <h6 class="text-weight-bold">{{ item.tieude }}</h6>
                          </router-link>
                        </div>
                        <div class="q-pt-sm text-uppercase">{{ item.tennhatuyendung }}</div>
                        <div class="q-pt-sm">Ngày đăng: {{ new Date(item.createdAt).toLocaleDateString('en-GB') }}</div>
                        <div class="q-pt-sm">
                          <div class="skills">
                            <label class="item" v-for="tag in item.ngonngu" :key="tag">
                              {{ tag }}
                            </label>
                          </div>
                        </div>
                        <div class="flex justify-between">
                          <div class="col-md-6 col-12 q-my-sm">
                            <q-icon name="location_on" size="sm" class="text-green-7" />
                            <span class="q-ml-sm">{{ item.diaChi }}</span>
                          </div>

                          <div class="col-md-6 col-12 q-my-sm">
                            <q-icon name="access_time_filled" size="sm" class="text-green-7" />
                            <span>Còn <b>{{ ((new Date(item.ngayHetHan).getTime() - new Date().getTime()) / (1000 * 60
                              * 60 * 24)).toFixed(0) > 0 ? ((new Date(item.ngayHetHan).getTime() - new
                                Date().getTime())
                                / (1000 * 60
                                  * 60 * 24)).toFixed(0) : 0 }}</b> ngày để ứng tuyển</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="row column flex-right justify-between full-height">
                          <div class="salary text-right">
                            <span class="title-salary text-weight-bold text-green-7">
                              {{ item.mucluong }}
                            </span>
                          </div>
                          <div v-if="storeAuthen.loaiTaiKhoan === 'user'"
                            class="function flex text-right flex-right justify-end">
                            <q-btn v-if="!item.isUngTuyen" class="apply-now q-mr-md" color="green-7" label="Ứng tuyển"
                              @click="storeJob.seeDetail({ _id: item._id, tieude: item.tieude })" />
                            <q-btn v-else class="apply-now q-mr-md" color="grey" label="Đã ứng tuyển" disable />
                            <q-btn v-if="!item.isYeuThich"
                              @click="storeJob.yeuThichPost(item._id, storeAuthen.idUngTuyenVien)" class="favorite"
                              icon="favorite_border" />
                            <q-btn v-else @click="storeJob.huyYeuThichPost(item.yeuThichId)" class="favorite text-green"
                              icon="favorite" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div v-if="storeJob.listData.length" class="q-pa-lg flex flex-center">
                      <q-pagination color="green-7" v-model="storeJob.panigateSelected"
                        :max="storeJob.lengthResponse / 5 + 1" :max-pages="6" direction-links />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="storeJob.isSeeDetail">
          <q-card>
            <q-card-section class="row items-center">
              Bạn có chắc chắn muốn ứng tuyển tin "{{ storeJob.ungTuyenSelectedData.tieude }}" không ?
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Đồng ý" color="primary" v-close-popup
                @click="storeJob.ungTuyenTinTuyenDung(storeJob.ungTuyenSelectedData._id)" />
              <q-btn flat label="Hủy" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<style lang="scss" scoped>
@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

.box-company-logo {
  align-items: center;
  border: 2px solid #eee;
  border-radius: 75px;
  display: flex;
  height: 110px;
  overflow: hidden;
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: inline-block;
    max-width: 100%;
    max-height: 100% !important;
    -o-object-fit: contain;
    object-fit: contain;
    width: 75%;
    vertical-align: middle;
  }
}

.box-title {
  border-left: 7px solid #00b14f;
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-left: 12px;
}

.job-title {
  font-size: 22px;
  line-height: 29px;
  margin-bottom: 16px;
  color: #00b14f;
  font-weight: 600;
}

.company-name {
  font-weight: 600;
  font-size: 1.4em;
}

p.p-underline {
  color: #333;
  font-weight: 700;
  margin-bottom: 16px;
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.default {
  background: #fff 0 0 no-repeat padding-box;
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  display: flex;
  margin: auto auto 16px;
  padding: 16px;
  transition: all .2s;

  &:hover {
    background-color: #f0f0f0;
  }
}

.box-info {
  background: rgba(0, 177, 79, .051);
  border-radius: 3px;
  margin-bottom: 8px px;
  padding: 16px 16px 0;

  .box-main {
    display: grid;
    grid-template-columns: 50% 50%;

    .box-item {
      display: flex;
      margin-bottom: 16px;

      img {
        height: 32px;
        margin-right: 16px;
        width: 32px;
      }
    }
  }
}

.box-share-job {
  border: 1px solid #eee;
  margin-bottom: 24px;
  padding: 16px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 16px;
  }

  p {
    margin: 0 0 10px;
    font-size: 14px;
  }

  .box-copy {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .url-copy {
      background: #fafafa;
      border-radius: 5px;
      overflow: hidden !important;
      padding: 10px 14px;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      width: 86%;
    }

    .btn-copy {
      width: 11%;
    }
  }

  .box-share {}
}

a.open-link {
  color: #00b14f;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.post-info {
  h3 {
    color: #000;
    font-size: 18px;
    font-weight: 700;
  }
}

.skills {
  margin-bottom: 12px;
  margin-top: 0;
  display: flex;

  label.item {
    background: #e5f7ed;
    border-radius: 20px;
    color: #00b14f;
    font-weight: 400;
    padding: 4px 8px;
  }
}

.item {
  &.item-hover {
    box-shadow: -1px 1px 2px rgba(0, 0, 0, .01);
    transition: all .3s;
  }
}
</style>
