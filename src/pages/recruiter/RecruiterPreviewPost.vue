<script setup>
import { onMounted } from "vue";
import { useStoreRecruiterAddPost } from "stores/recruiter/storeRecruiterAddPost";
const storeRecruiterAddPost = useStoreRecruiterAddPost();

onMounted(() => { })

</script>

<template>
  <div class="q-gutter-lg q-pa-lg bg-white">
    <q-btn color="primary" icon="arrow_back" label="Quay lại" to="/recruiter/add-post" />
    <h4 class="text-center text-bold">Kiểm Tra Lại Thông Tin</h4>
    <div class="q-pa-lg">
      <div class="row">
        <div class="col-12">
          <h5 class="text-uppercase text-bold q-pb-lg">1. Thông tin công việc</h5>
          <b>Tên công việc: </b> <span>{{ storeRecruiterAddPost.titleName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$padding: 10%;

.container {
  padding-left: $padding;
  padding-right: $padding;
}

label {
  font-size: 1.2em;
  font-weight: 600;
  padding: .5em 0;
}

span.hint {
  font-weight: 400;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #868686;
  padding: 20px 0;
}

b {
  font-size: 1.2em;
}

ul li {
  list-style: inside;
}

body {
  background-color: #ffffff;
}
</style>
