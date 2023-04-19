<script setup>
import { useStoreJob } from 'src/stores/storeJob';
import { useQuasar } from 'quasar';
const storeJob = useStoreJob();
const $q = useQuasar();
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-grey-3">
        <div class="row justify-evenly q-py-md container" style="margin: 0 auto;"
          v-bind:style="$q.screen.lt.md ? { 'width': '95%' } : { 'width': '70%' }">
          <div class="row justify-evenly bg-white q-pa-md full-width">
            <div class="col-md-3 col-12 q-my-md">
              <q-input type="text" placeholder="Tên công việc, vị trí muốn ứng tuyển..." outlined
                v-model="storeJob.searchInput">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectSkill"
                :options="storeJob.listSkill" label="Lĩnh vực">
                <template v-slot:append>
                  <q-icon name="business" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectLevel"
                :options="storeJob.optionLevel" label="Cấp bậc">
                <template v-slot:append>
                  <q-icon name="badge" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="storeJob.selectSalary"
                :options="storeJob.optionSalary" label="Mức lương">
                <template v-slot:append>
                  <q-icon name="monetization_on" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 flex flex-center">
              <q-btn color="light-green-10" icon="search" label="Tìm kiếm" @click="() => { }" />
            </div>
          </div>

          <div class="row q-my-lg q-px-md full-width bg-white q-py-lg">
            <div class="col-2">
              <div class="box-company-logo">
                <img :src=storeJob.oneJobSelected.picture alt="">
              </div>
            </div>

            <div class="col-10">
              <div class="job-title">
                {{ storeJob.oneJobSelected.title }}
              </div>
              <p class="company-name">{{ storeJob.oneJobSelected.companyName }}</p>
            </div>
          </div>

          <div class="row q-py-lg q-px-md full-width">
            <q-tabs v-model="storeJob.tabJobDetail" narrow-indicator dense align="justify"
              class="text-black text-green-7">
              <a href="#tab-info">
                <q-tab :ripple="false" name="news" icon="mail" label="Tin tuyển dụng" />
              </a>
              <a href="#tab-info-company">
                <q-tab :ripple="false" name="info" icon="alarm" label="Thông tin công ty" />
              </a>
              <a href="#tab-job">
                <q-tab :ripple="false" name="relate" icon="movie" label="Việc làm liên quan" />
              </a>
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
                      <span>{{ storeJob.oneJobSelected.salary }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg" alt="">
                    <div>
                      <strong>Số lượng tuyển </strong>
                      <br>
                      <span>{{ storeJob.oneJobSelected.amount }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg" alt="">
                    <div>
                      <strong>Hình thức làm việc </strong>
                      <br>
                      <span>{{ storeJob.oneJobSelected.workingType }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/6.svg" alt="">
                    <div>
                      <strong>Cấp bậc </strong>
                      <br>
                      <span>{{ storeJob.oneJobSelected.level }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/3.svg" alt="">
                    <div>
                      <strong>Giới tính </strong>
                      <br>
                      <span>{{ storeJob.oneJobSelected.gender }}</span>
                    </div>
                  </div>

                  <div class="box-item">
                    <img src="https://www.topcv.vn/v4/image/job-detail/icon/7.svg" alt="">
                    <div>
                      <strong>Kinh nghiệm </strong>
                      <br>
                      <span>{{ storeJob.oneJobSelected.experience }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="box-info q-mt-md q-py-md">
                <p class="p-underline">Địa điểm làm việc</p>
                <span class="q-py-md">- {{ storeJob.oneJobSelected.address }}</span>
              </div>

              <div class="q-mt-md post-info">
                <div class="post-item">
                  <h3>Mô tả công việc</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 25px;">{{
                      storeJob.oneJobSelected.moTaCongViec }}</p>
                  </div>
                </div>

                <div class="post-item">
                  <h3>Yêu cầu ứng viên</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 25px;">{{
                      storeJob.oneJobSelected.yeuCauUngVien }}</p>
                  </div>
                </div>

                <div class="post-item">
                  <h3>Quyền lợi</h3>
                  <div>
                    <p class="q-px-md" style="white-space: pre-wrap; line-height: 25px;">{{
                      storeJob.oneJobSelected.quyenLoiUngVien }}</p>
                  </div>
                </div>

                <div class="post-item">
                  <h3>Cách thức ứng tuyển</h3>
                  <div>
                    <q-btn color="green-7" label="Ứng tuyển ngay" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 q-mt-lg">
              <div class="box-share-job">
                <h3>Chia sẻ tin tuyển dụng</h3>
                <p>Sao chép đường dẫn</p>
                <div class="box-copy">
                  <div class="url-copy">
                    http://localhost:3000
                  </div>
                  <div class="btn-copy">
                    <q-btn color="green" class="bg-white" size="md" icon="content_copy" />
                  </div>
                </div>
                <p>Chia sẻ qua mạng xã hội</p>
                <div class="box-share">
                  <a href="" target="_blank">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/facebook.png" alt="">
                  </a>
                  <a href="" target="_blank" class="q-mx-md">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/twitter.png" alt="">
                  </a>
                  <a href="" target="_blank">
                    <img src="https://www.topcv.vn/v4/image/job-detail/share/linkedin.png" alt="">
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row bg-white full-width q-px-lg justify-evenly q-mt-md q-pb-lg q-pt-md" id="tab-info-company">
            <div class="col-12 q-my-md q-mx-lg">
              <div class="flex justify-between">
                <h6 class="box-title">Thông tin {{ storeJob.oneJobSelected.companyName }}</h6>
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
                          <p class="q-pr-lg">Là doanh nghiệp tiên phong trong phát triển nền tảng thương mại điện tử du
                            lịch B2B. Travel
                            Connect cung cấp nền tảng kết nối, mua bán giao dịch và phân phối dịch vụ cho tất cả các đơn
                            vị
                            kinh doanh du lịch trong nước và quốc tế. </p>
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
                        <p class="q-mb-none text-bold">Quy mô</p>
                        <span class="content">
                          <p class="q-pr-lg">10-24 nhân viên.</p>
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
                          <p class="q-pr-lg">{{ storeJob.oneJobSelected.address }}</p>
                        </span>
                      </div>
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
                  <div class="item highlight q-pa-none q" v-for="item in storeJob.listRecruiter" :key="item.id">
                    <div class="row q-my-md default">
                      <div class="col-md-2 col-12">
                        <div class="avatar">
                          <img class="" style="max-width: 100px; max-height: 100px;" :src=item.picture alt="">
                        </div>
                      </div>
                      <div class="col-md-7 col-12">
                        <div class="title">
                          <a>{{ item.title }}</a>
                        </div>
                        <div class="q-pt-sm">{{ item.companyName }}</div>
                        <div class="q-pt-sm"> {{ item.datePost }}</div>
                        <div class="q-pt-sm">
                          <div class="skills">
                            <label class="item" v-for="tag in item.tag" :key="tag">
                              {{ tag }}
                            </label>
                          </div>
                        </div>
                        <div class="flex">
                          <div>
                            <q-icon name="location_on" size="sm" class="text-green-7" />
                            <span class="q-ml-sm">{{ item.address }}</span>
                          </div>

                          <div class="q-ml-md">
                            <q-icon name="access_time_filled" size="sm" class="text-green-7" />
                            <span class="q-ml-sm">Còn <b>{{ 25 }}</b> ngày để ứng tuyển</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="row column flex-right justify-between full-height">
                          <div class="salary text-right">
                            <span class="title-salary">
                              {{ item.salary }}
                            </span>
                          </div>
                          <div class="function flex text-right flex-right justify-end">
                            <q-btn class="apply-now q-mr-md" color="green-7" label="Ứng tuyển" />
                            <q-btn class="favorite" icon="favorite_border" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="q-pa-lg flex flex-center">
                      <q-pagination color="green-7" v-model="storeJob.panigateSelected" :max="5" direction-links />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>
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
</style>
