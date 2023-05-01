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
        <div class="col-12 q-px-sm">
          <h5 class="text-uppercase text-bold q-pb-lg">1. Thông tin công việc</h5>
          <hr class="q-mt-sm q-mb-lg">
          <b>Tên công việc: </b> <span class="text-uppercase">{{ storeRecruiterAddPost.titleName }}</span>
        </div>
      </div>

      <div class="row q-py-md q-mt-lg">
        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Việc làm tại: </b> <span>{{ storeRecruiterAddPost.provinceSelected.label }}, {{
            storeRecruiterAddPost.districtSelected.label }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Hạn chót nộp hồ sơ: </b> <span> {{ storeRecruiterAddPost.dateExpired }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Chức vụ: </b> <span>{{ storeRecruiterAddPost.positionSelected.label }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Mức lương: </b> <span> {{ storeRecruiterAddPost.salarySelected.label }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Số lượng: </b> <span>{{ storeRecruiterAddPost.amount }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Trình độ: </b> <span> {{ storeRecruiterAddPost.degreeSelected }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Hình thức: </b> <span>{{ storeRecruiterAddPost.styleSelected }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Kinh nghiệm: </b> <span> {{ storeRecruiterAddPost.experienceSelected }}</span>
        </div>

        <div class="col-md-6 col-12 q-px-sm q-py-sm">
          <b>Tags: </b> <span> {{ storeRecruiterAddPost.tagsSelected.map(e => e.ngonngu) }}</span>
        </div>
      </div>

      <div class="row q-py-md q-mt-lg">
        <div class="col-12">
          <b>* Mô tả công việc: </b>
          <hr class="q-mt-sm q-mb-lg">
          <q-input v-model="storeRecruiterAddPost.limitCharacterJob" filled type="input" :maxlength="5000" autogrow
            disable />
        </div>
      </div>

      <div class="row q-py-md q-mt-lg">
        <div class="col-12">
          <b>* Yêu cầu công việc: </b>
          <hr class="q-mt-sm q-mb-lg">
          <q-input v-model="storeRecruiterAddPost.limitCharacterRequire" filled type="input" :maxlength="5000" autogrow
            disable />
        </div>
      </div>

      <div class="row q-py-md q-mt-lg">
        <div class="col-12">
          <b>* Quyền lợi: </b>
          <hr class="q-mt-sm q-mb-lg">
          <q-input v-model="storeRecruiterAddPost.limitCharacterBenefit" filled type="input" :maxlength="5000" autogrow
            disable />
        </div>
      </div>

      <div class="row q-mt-lg">
        <div class="col-12 q-px-sm">
          <h5 class="text-uppercase text-bold q-pb-lg">2. Thông tin liên hệ</h5>
          <hr class="q-mt-sm q-mb-lg">
          <div class="col-12">
            <b>Tên người liên hệ: </b> <span>{{ storeRecruiterAddPost.contactName }}</span>
          </div>
          <div class="col-12 q-py-md">
            <b>Số điện thoại liên hệ: </b> <span>{{ storeRecruiterAddPost.contactPhone }}</span>
          </div>
          <div class="col-12">
            <b>Email liên hệ: </b> <span>{{ storeRecruiterAddPost.contactEmail }}</span>
          </div>

          <div class="col-12 q-py-lg">
            <q-btn color="primary" label="Xác nhận đăng tin" @click="storeRecruiterAddPost.confirmForm" class="full-width" style="height: 50px; font-size: 1.2em; font-weight: 600;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$padding: 10%;

@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}


@mixin xs {
  @media screen and (max-width: 511px) {
    @content;
  }
}

.container {
  padding-left: $padding;
  padding-right: $padding;

  @include sm {
    padding-left: 0;
    padding-right: 0;
  }
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
  font-size: 1.3em;
}

ul li {
  list-style: inside;
}

body {
  background-color: #ffffff;
}

hr {
  height: 1px;
  background-color: #c7c8c9;
}

span {
  font-size: 1.2em;
  margin-left: 1em;
}
</style>
