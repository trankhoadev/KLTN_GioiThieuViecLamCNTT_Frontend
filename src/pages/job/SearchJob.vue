<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row q-gutter-lg justify-evenly q-py-md" style="padding: 0 10em;">
          <div class="col-12 col-md-2">
            <q-select filled v-model="storeJob.selectLevel" multiple :options="storeJob.optionLevel" label="Cấp độ" style="width: 250px" />
          </div>

          <div class="col-12 col-md-2">
            <q-select filled v-model="storeJob.selectSalary" :options="storeJob.optionSalary" label="Lương" style="width: 250px" />
          </div>

          <div class="col-12 col-md-2">
            <q-select filled v-model="storeJob.selectExperiment" :options="storeJob.optionExperiment" label="Kinh nghiệm" style="width: 250px" />
          </div>

          <div class="col-12 col-md-2">
            <q-select filled v-model="multiple" multiple :options="storeJob.optionLevel" label="Hình thức làm việc" style="width: 250px" />
          </div>

          <div class="col-12 col-md-3">
            <q-select filled v-model="multiple" multiple :options="storeJob.optionLevel" label="Cấp độ" style="width: 250px" />
          </div>

        </div>
        <div class="row q-gutter-lg justify-evenly q-py-md">
          <div class="col-12 col-md-5">
            <q-input v-model="storeJob.searchInput" type="text" label="Search" outlined />
          </div>
          <div class="col-12 col-md-5">
            <q-btn color="primary" icon="search" size="lg" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useStoreJob } from 'src/stores/storeJob';
const storeJob = useStoreJob();
</script>

<style lang="scss" scoped></style>
