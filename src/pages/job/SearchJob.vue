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
        <div class="row justify-evenly q-pt-md container" style="margin: 0 auto;"
          v-bind:style="$q.screen.lt.sm ? { 'width': '100%' } : { 'width': '70%' }">
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
              <q-input type="text" placeholder="Tên công việc, vị trí muốn ứng tuyển..." outlined v-model="text"
                :dense="dense">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="model" :options="options"
                label="Lĩnh vực">
                <template v-slot:append>
                  <q-icon name="event" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="model" :options="options"
                label="Cấp bậc">
                <template v-slot:append>
                  <q-icon name="event" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-12 q-my-md">
              <q-select color="grey-3" outlined label-color="light-green-10" v-model="model" :options="options"
                label="Mức lương">
                <template v-slot:append>
                  <q-icon name="event" color="light-green-10" />
                </template>
              </q-select>
            </div>
            <div class="col-md-2 flex flex-center">
              <q-btn color="light-green-10" icon="search" label="Tìm kiếm" @click="onClick" />
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

.ml-auto {
  margin-right: auto;
}
</style>
