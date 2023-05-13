<script setup>
import { onMounted } from 'vue';
import { useStoreAddStuff } from 'src/stores/admin/storeAddStuff';

const storeAddStuff = useStoreAddStuff();
onMounted(async () => {
  await storeAddStuff.getAllData();
});

console.log(storeAddStuff.listData);

</script>

<template>
  <div class="q-gutter-md q-pa-lg">
    <h6 class="text-uppercase text-weight-bold">Thêm ngành nghề mới</h6>
    <q-input outlined bottom-slots v-model="storeAddStuff.inputData" label="Nhập tên ngành nghề cần thêm" counter
      maxlength="50">
      <template v-slot:before>
        <q-icon name="work" />
      </template>

      <template v-slot:append>
        <q-btn @click="storeAddStuff.addStuff(storeAddStuff.inputData)" round flat icon="add" />
      </template>
    </q-input>

    <q-input v-for="item in storeAddStuff.listData" :key="item._id" outlined bottom-slots
      v-model="item.tennganhnghe" filled>
      <template v-slot:append>
        <q-btn round flat icon="delete" />
      </template>
    </q-input>
  </div>
</template>

<style lang="scss" scoped></style>
