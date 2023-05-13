<script setup>
import { onMounted } from 'vue';
import { useStoreAddStuff } from 'src/stores/admin/storeAddStuff';

const storeAddStuff = useStoreAddStuff();
onMounted(async () => {
  await storeAddStuff.getAllNgonNgu();
});

</script>

<template>
  <div class="q-gutter-md q-pa-lg">
    <h6 class="text-uppercase text-weight-bold">Thêm ngôn ngữ mới</h6>
    <q-input outlined bottom-slots v-model="storeAddStuff.inputData" label="Nhập tên ngành nghề cần thêm" counter
      maxlength="50">
      <template v-slot:before>
        <q-icon name="work" />
      </template>

      <template v-slot:append>
        <q-btn @click="storeAddStuff.addTag(storeAddStuff.inputData)" round flat icon="add" />
      </template>
    </q-input>

    <q-input v-for="item in storeAddStuff.listTag" :key="item._id" outlined bottom-slots v-model="item.ngonngu"
      filled>
      <template v-slot:append>
        <q-btn @click="storeAddStuff.checkRemoveJob(item._id)" round flat icon="delete" />
      </template>
    </q-input>

    <q-dialog v-model="storeAddStuff.dialogRemoveJob">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span style="max-width: 400px;" class="q-ml-sm">Bạn có chắc chắn muốn xóa ngôn ngữ này không ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đồng ý" color="primary" v-close-popup
            @click="storeAddStuff.removeTag(storeAddStuff.oneJobSelectId)" />
          <q-btn flat label="Hủy" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
