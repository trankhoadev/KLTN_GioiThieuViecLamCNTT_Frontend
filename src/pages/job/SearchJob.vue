<script setup>
import { useQuasar } from 'quasar';
import { useStoreJob } from 'src/stores/storeJob';
import { useMyStore } from 'src/stores/myStore';
import { useRoute } from 'vue-router';
import { onMounted, onUpdated, watch } from 'vue';
import { Loading } from 'quasar';
import { useStoreAuthentication } from 'src/stores/storeAuthentication';

const route = useRoute();
const myStore = useMyStore();
const storeJob = useStoreJob();
const storeAuthen = useStoreAuthentication();
const $q = useQuasar();


onMounted(async () => {
  storeJob.searchInput = route.params.id;
  await storeJob.reloadSearchJob(route.params.id);
  await storeJob.getListTag();
  await storeJob.getAllNhaTuyenDung();
  await storeJob.getAllDonUngTuyen();
  await storeJob.getListYeuThich();

  /* pagination for job */
  if (storeJob.listDataSearch.length > 9) {
    let arr = [];
    for (let i = 0; i < 10; ++i) {
      arr.push(storeJob.listDataSearch[i]);
    }
    storeJob.listDataSearch = [...arr];
  }

  /* Note: Because cant get data directly from server so need using that. Have some problem like object promise before */
  /* Handle get data of tag from server */
  for (let i = 0; i < storeJob.listDataSearch.length; ++i) {
    for (let j = 0; j < storeJob.listDataSearch[i].ngonngu.length; ++j) {
      storeJob.listSkill.map((e) => {
        if (storeJob.listDataSearch[i].ngonngu[j] === e._id) {
          storeJob.listDataSearch[i].ngonngu[j] = e.ngonngu;
        }
      });
    }
  }

  /* Get picture and name of recruiter */
  for (let i = 0; i < storeJob.listDataSearch.length; ++i) {
    await storeJob.getNhaTuyenDungById(storeJob.listDataSearch[i].nhatuyendung);
    storeJob.listDataSearch[i].tennhatuyendung = storeJob.listDataOneRecruiter.tencongty;
    storeJob.listDataSearch[i].anhdaidien = storeJob.listDataOneRecruiter.anhdaidien;
  }

  /* Get amount job of every recruiter */
  for (let i = 0; i < storeJob.listRecruiter.length; ++i) {
    await storeJob.getAllPostDangTuyenDungByNhaTuyenDungId(storeJob.listRecruiter[i]._id);
    storeJob.listRecruiter[i].amount = storeJob.listPostNhaTuyenDungById.length;
  }

  /* Get favorite of every post */
  storeJob.listFavorite.filter((e) => {
    for (let i = 0; i < storeJob.listDataSearch.length; ++i) {
      if (e.tintuyendung._id === storeJob.listDataSearch[i]._id && e.ungtuyenvien._id === storeAuthen.idUngTuyenVien) {
        storeJob.listDataSearch[i].isYeuThich = true;
        storeJob.listDataSearch[i].yeuThichId = e._id;
      }
    }
  })

  /* Hide "Ứng tuyển" button */
  await storeJob.getAllDonUngTuyen();
  storeJob.listDonUngTuyen.filter((e) => {
    for (let i = 0; i < storeJob.listDataSearch.length; ++i) {
      if (e.tintuyendung._id === storeJob.listDataSearch[i]._id &&
        e.ungtuyenvien._id === localStorage.getItem("idUngTuyenVien")) {
        storeJob.listDataSearch[i].isUngTuyen = true;
      }
    }
  });
});

watch(() => storeJob.panigateSelected, val => {
  const executePanigation = async () => {
    Loading.show({
      message: "Vui lòng đợi trong giấy lát...",
      boxClass: "bg-grey-2 text-grey-9",
      spinnerColor: "primary",
    });

    storeJob.listData = [];
    await storeJob.reloadSearchJob(route.params.id);

    for (let i = (storeJob.panigateSelected - 1) * 10; i < storeJob.panigateSelected * 10; ++i) {
      if (storeJob.listDataSearch[i] !== undefined) {
        storeJob.listData.push(storeJob.listDataSearch[i]);
      }
    }

    setTimeout(() => {
      storeJob.listDataSearch = [...storeJob.listData];
      Loading.hide();
    }, 300);

    /* Handle get data of tag from server */
    for (let i = 0; i < storeJob.listDataSearch.length; ++i) {
      for (let j = 0; j < storeJob.listDataSearch[i].ngonngu.length; ++j) {
        storeJob.listSkill.map((e) => {
          if (storeJob.listDataSearch[i].ngonngu[j] === e._id) {
            storeJob.listDataSearch[i].ngonngu[j] = e.ngonngu;
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
  }
  executePanigation();
})

</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-grey-3">
        <div class="row justify-evenly q-pt-md container" style="margin: 0 auto;"
          v-bind:style="$q.screen.lt.md ? { 'width': '95%' } : { 'width': '70%' }">
          <div class="col-12 q-mt-lg">
            <div class="flex banner" style="border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <div class="ml-auto">
                <h1 class="title">Việc làm IT</h1>
                <p class="description">Việc làm IT xịn dành cho Developer chất</p>
                <div class="label-tag">
                  <label class="label-remote"><i class="fa-solid fa-circle-check"></i> Backend</label>
                  <label class="label-remote"><i class="fa-solid fa-circle-check"></i> Frontend</label>
                  <label class="label-remote"><i class="fa-solid fa-circle-check"></i> Tester</label>
                  <label class="label-remote"><i class="fa-solid fa-circle-check"></i> Business Analyst</label>
                </div>
              </div>
              <div class="image">
                <img src="https://www.topcv.vn/v4/image/it/Banner.png" alt="Việc làm IT" title="Việc làm IT"
                  class="w-100">
              </div>
            </div>
          </div>

          <div class="row justify-evenly bg-white q-pa-md full-width">
            <div class="col-md-3 col-12 q-my-md">
              <q-form @submit="storeJob.searchJob()">
                <q-input type="text" placeholder="Tên công việc, vị trí muốn ứng tuyển..." outlined
                  v-model="storeJob.searchInput">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-form>
            </div>
            <div class="col-md-2 col-12 q-my-md">
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
            </div>
            <div class="col-md-2 flex flex-center">
              <q-btn v-if="storeJob.selectLevel || storeJob.selectSalary || storeJob.selectSkill" color="light-green-10"
                icon="search" label="Tìm kiếm" @click="storeJob.searchAdvanced(route.params.id)" />
              <q-btn v-else color="light-green-10" icon="search" label="Tìm kiếm" @click="storeJob.searchJob()" />
            </div>

            <div class="col-12 q-pa-md">
              <div v-if="storeJob.listDataSearch.length">Đã tìm thấy <span class="text-highlight">{{
                storeJob.lengthResponse }}</span> việc làm phù hợp với yêu cầu của bạn.</div>
              <div v-else>Chưa tìm thấy việc làm phù hợp với yêu cầu tìm kiếm của bạn.</div>
            </div>
          </div>

          <div v-if="storeJob.listDataSearch.length" class="row bg-white full-width">
            <div class="col-12">
              <hr class="q-mt-sm q-mb-md">
            </div>
            <div class="col-12">
              <div class="q-px-lg">
                <span class="custom-important">
                  Ưu tiên hiển thị:
                </span>

                <q-radio @click="storeJob.sortPostDate(route.params.id)" v-model="storeJob.sortRadio" val="new"
                  label="Tin mới nhất" />
                <q-radio @click="storeJob.sortPostSalary(route.params.id)" v-model="storeJob.sortRadio" val="salary"
                  label="Lương cao nhất" />
              </div>
            </div>

            <div class="col-12 q-pa-none">
              <hr class="q-mt-md q-mb-lg">
            </div>
          </div>

          <!-- {{ storeJob.getLanguageName(storeJob.listDataSearch[0].ngonngu[0]) }} -->

          <div class="row bg-white full-width q-px-md justify-evenly">
            <div class="col-md-7 col-12">
              <div class="item highlight q-pa-none q" v-for="item in storeJob.listDataSearch" :key="item._id">
                <div class="row q-my-md">
                  <div class="col-md-2 col-12">
                    <div class="avatar">
                      <img class="" style="max-width: 100px; max-height: 100px;" :src=item.anhdaidien alt="">
                    </div>
                  </div>
                  <div class="col-md-7 col-12">
                    <div class="title">
                      <router-link :to="`/search/job/${item._id}`" target="_blank">{{ item.tieude }}</router-link>
                    </div>
                    <div class="q-pt-sm text-uppercase">{{ item.tennhatuyendung }}</div>
                    <div class="q-pt-sm"> <b>Ngày đăng:</b> {{ new Date(item.createdAt).toLocaleDateString('en-GB') }}
                    </div>
                    <div class="q-pt-sm">
                      <div class="skills">
                        <label class="item" v-for="tag in item.ngonngu" :key="tag">
                          {{ tag }}
                        </label>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="row">
                        <div class="col-6">
                          <div>
                            <div class="row">
                              <div class="col-2">
                                <q-icon name="location_on" size="sm" class="text-green-7" />
                              </div>
                              <div class="col-10">
                                <span class="text-justify">{{ item.diaChi }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="q-ml-md">
                            <div class="row">
                              <div class="col-2">
                                <q-icon name="access_time_filled" size="sm" class="text-green-7" />
                              </div>
                              <div class="col-10">
                                <span>Còn <b>{{ ((new Date(item.ngayHetHan).getTime() - new Date().getTime()) / (1000 * 60
                                  * 60 * 24)).toFixed(0) > 0 ? ((new Date(item.ngayHetHan).getTime() - new
                                    Date().getTime())
                                    / (1000 * 60
                                      * 60 * 24)).toFixed(0) : 0 }}</b> ngày để ứng tuyển</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="row column flex-right justify-between full-height">
                      <div class="salary text-right">
                        <span class="title-salary">
                          {{ item.mucluong }}
                        </span>
                      </div>
                      <div class="function flex text-right flex-right justify-end">
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
                <div v-if="storeJob.listDataSearch.length" class="q-pa-lg flex flex-center">
                  <q-pagination color="green-7" v-model="storeJob.panigateSelected"
                    :max="storeJob.lengthResponse / 10 + 1" :max-pages="6" direction-links />
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12">
              <h6 class="text-bold">Top công ty nổi bật</h6>
              <div class="list-company" v-for="item in storeJob.listRecruiter" :key="item._id">
                <div class="item item-hover">
                  <div class="row full-width">
                    <div class="col-md-2">
                      <img :src=item.anhdaidien alt="">
                    </div>
                    <div class="col-md-10 flex column justify-between">
                      <b class="text-uppercase">{{ item.tencongty }}</b>
                      <p class="count">{{ item.amount }} việc làm</p>
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

.ml-auto {
  margin-right: auto;
}

.text-highlight {
  color: #00b14f;
  font-weight: 600;
}

hr {
  height: 1px;
  background-color: #c7c8c9;
}

span.custom-important {
  color: #999;
  font-size: 14px;
}

.item {
  background: #fff 0 0 no-repeat padding-box;
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  margin-bottom: 16px;
  padding: 16px;
  transition: all .2s;

  &.highlight {
    background-color: #f2fbf6;
  }

  &:hover {
    border: 1px solid #00b04e;
  }
}

.avatar {
  background-color: #fff;
  border-radius: 8px;
  flex-shrink: 0;
  height: 100px;
  outline: 1px solid #e9eaec;
  padding: 8px;
  width: 100px;

  img {
    border-radius: 5px;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    width: 100%;
  }
}

.title {
  font-weight: 600;
  font-size: 1.2em;

  a {
    color: #212f3f;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: all ease .1s;

    &:hover {
      text-decoration: underline;
    }
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

span.title-salary {
  color: #00b14f;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 0;
  margin-top: 0;
  white-space: nowrap;
}

button {
  &.apply-now {
    background: #00b14f;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    height: 28px;
    outline: none;
    padding: 6px 16px;
  }

  &.favorite {
    align-items: center;
    background: #e5f7ed;
    color: #00b14f;
    display: inline-flex;
    font-size: 12px;
    height: 28px;
    justify-content: center;
    padding: 0 8px;
    white-space: nowrap;
    width: 28px;
  }
}

.list-company {
  .item {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 12px;
    padding: 12px;

    &.item-hover {
      box-shadow: -1px 1px 2px rgba(0, 0, 0, .01);
      transition: all .3s;
    }

    img {
      border: 1px solid #f7f7f7;
      border-radius: 5px;
      height: 48px;
      -o-object-fit: contain;
      object-fit: contain;
      width: 48px;
    }

    p.count {
      color: #999;
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 0;
    }
  }
}

.banner {
  background: #00b14f;
  border-radius: 5px px 5px 0 0;
  min-height: 185px;
  padding: 5px 0 0 32px;

  .container {
    @include sm() {
      padding: 0 !important;
      width: 100%;
    }
  }

  .title {
    color: #fff;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin: initial;
    margin-bottom: 8px;
    margin-top: 26px;
  }

  p {
    margin: 0 0 10px;
    color: white;
  }

  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;

    &.label-remote {
      background: #fff;
      border-radius: 12px;
      color: #27ae60;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 16px;
      margin-right: 14px;
      padding: 4px 8px;
    }
  }

  .image {
    align-items: center;
    display: flex;
  }

  img {
    vertical-align: middle;
    border: 0;
    right: 0;
  }

}
</style>
