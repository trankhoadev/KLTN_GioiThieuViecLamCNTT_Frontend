<script setup>
import { onMounted } from "vue";
import { useStoreRecruiterAddPost } from "stores/recruiter/storeRecruiterAddPost";
import { useStoreRegex } from 'stores/middleware/storeRegex'
import { useMyStore } from 'stores/myStore'
import { ref } from 'vue';
const storeRecruiterAddPost = useStoreRecruiterAddPost();
const storeRegex = useStoreRegex();
const myStore = useMyStore();

onMounted(() => {
  storeRecruiterAddPost.getListTag();
  storeRecruiterAddPost.getListCareer();
})

const filteredOptions = ref([]);

const filterTag = async (val, update) => {
  if (val === '') {
    update(() => {
      filteredOptions.value = storeRecruiterAddPost.listTag;
    })
  }

  update(() => {
    const needed = val.toLowerCase()
    filteredOptions.value = storeRecruiterAddPost.listTag.filter(option => {
      return option.ngonngu.toLowerCase().includes(needed);
    })
  })
}

const updateIdTag = () => {
  if (storeRecruiterAddPost.tagsSelected) {
    storeRecruiterAddPost.listTagId = [];
    storeRecruiterAddPost.tagsSelected.map(e => storeRecruiterAddPost.listTagId.push(e._id));
  }
}
</script>

<template>
  <q-form @submit="storeRecruiterAddPost.submitForm" class="q-gutter-md">

    <div class="q-gutter-lg q-pa-lg bg-white"
      v-bind:style="$q.screen.lt.sm ? { 'padding': '2em' } : { 'padding': '2em 8em' }">
      <div class="step-1">
        <h4>1. Tiêu đề Tin Tuyển Dụng</h4>
        <div class="container q-pa-lg">
          <label for="">Tiêu đề tuyển dụng <span class="text-red">(*)</span></label>
          <q-input filled v-model="storeRecruiterAddPost.titleName" type="text" label="Nhập tiêu đề tin tuyển dụng"
            :rules="[
                val => !!val || 'Tiêu đề không được rỗng',
              ]" lazy-rules />
          <span class="hint">
            <div class="q-py-md">
              <b>Nên: </b>
              <ul class="q-px-lg" style="list-style: circle;">
                <li>Viết đầy đủ và viết bằng tiếng Việt có dấu.</li>
                <li>Điền các chức năng, vị trí cần tuyển và số lượng cần tuyển</li>
              </ul>
            </div>

            <div>
              <b>Không nên: </b>
              <ul class="q-px-lg" style="list-style: circle;">
                <li>Viết đầy đủ và viết bằng tiếng Việt có dấu.</li>
                <li>Điền các chức năng, vị trí cần tuyển và số lượng cần tuyển</li>
              </ul>
            </div>
            <br>
            <b>Ví dụ: </b> <span>Tuyển nhân viên Frontend có trên 2 năm kinh nghiệm</span>
          </span>
        </div>
      </div>

      <div class="step-2" style="padding-top: 3%;">
        <h4>2. Thông tin công việc tuyển dụng</h4>
        <div class="container q-pa-lg">
          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Tỉnh/Thành phố <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.provinceSelected" :options="storeRecruiterAddPost.listProvince"
                label="Chọn tỉnh thành" filled @update:model-value="storeRecruiterAddPost.getListDistrict" :rules="[
                    val => !!val || 'Tỉnh thành không được rỗng',
                  ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Quận/Huyện <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.districtSelected" :options="storeRecruiterAddPost.listDistrict"
                label="Chọn quận huyện" filled :rules="[
                    val => !!val || 'Quận huyện không được rỗng',
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Ngành nghề <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.careerSelected" :options="storeRecruiterAddPost.listCareer"
                label="Chọn ngành nghề" option-label="tennganhnghe" option-value="_id" filled :rules="[
                    val => !!val || 'Ngành nghề không được rỗng',
                  ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Vị trí <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.positionSelected" :options="myStore.optionPosition"
                label="Chọn vị trí" filled :rules="[
                    val => !!val || 'Vị trí không được rỗng',
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Số lượng tuyển <span class="text-red">(*)</span></label>
              <q-input filled v-model="storeRecruiterAddPost.amount" type="text" label="Nhập số lượng cần tuyển" :rules="[
                  val => !!val || 'Số lượng cần tuyển không được rỗng',
                  val => val > 0 || 'Số lượng cần tuyển tối thiểu là 1',
                ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Hình thức làm việc <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.styleSelected" :options="storeRecruiterAddPost.listStyle"
                label="Chọn hình thức làm việc" filled :rules="[
                    val => !!val || 'Hình thức làm việc không được rỗng',
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Mức lương <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.salarySelected" :options="myStore.optionSalary"
                label="Chọn mức lương mong muốn" filled :rules="[
                    val => !!val || 'Mức lương không được rỗng',
                  ]" lazy-rules />
            </div>


            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Tags <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.tagsSelected" :options="filteredOptions" label="Chọn tag" multiple
                clearable option-label="ngonngu" @change="updateIdTag" option-value="_id" use-input @filter="filterTag"
                filled :rules="[
                    val => !!val || 'Tag không được rỗng',
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <div class="col-12 q-px-sm">
              <label for="">Mô tả công việc</label>
              <q-input v-model="storeRecruiterAddPost.limitCharacterJob" filled type="textarea" :maxlength="5000"
                rows="15" />
              <span>{{ storeRecruiterAddPost.limitCharacterJob.length }}/5000 kí tự</span>

              <span class="hint">
                <div class="q-py-md">
                  <b>Nên: </b>
                  <ul class="q-px-lg" style="list-style: circle;">
                    <li>Viết tiếng Việt đầy đủ và có dấu.</li>
                    <li>Mô tả cụ thể công việc, nơi làm việc và giờ làm.</li>
                    <li>Yêu cầu các loại bằng cấp kĩ năng</li>
                    <li>Phúc lợi nếu có</li>
                  </ul>
                </div>

                <div>
                  <b>Không nên: </b>
                  <ul class="q-px-lg" style="list-style: circle;">
                    <li>Không điền các thông tin cá nhân như: số điện thoại hay email trong nội dung.</li>
                    <li>Không điền form link dẫn đến các website khác trong nội dung.</li>
                  </ul>
                </div>

                <div class="q-py-md">
                  <b>Ví dụ: </b>
                  <ul class="q-px-lg" style="list-style: circle;">
                    <li>Viết API Firebase cho Web và mobile app.</li>
                    <li>Lên kế hoạch, chuẩn bị giải pháp, thiết kế hệ thống phía server-side cùng các kiến trúc cơ sở dữ
                      liệu lớn.</li>
                    <li>Tham gia viết tài liệu, mô tả hệ thống, kỹ thuật cho hệ thống phần mềm.</li>
                    <li>Ứng dụng các công nghệ, kỹ thuật mới để cải tiến hiệu năng và nâng cao chất lượng phần mềm.</li>
                    <li>Hỗ trợ các công việc liên quan cơ sở hạ tầng (Web Server, Database…).</li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="step-3" style="padding-top: 3%;">
        <h4>3. Yêu cầu ứng viên</h4>

        <div class="container q-pa-lg">
          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Kinh nghiệm <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.experienceSelected" :options="storeRecruiterAddPost.listExperience"
                label="Chọn kinh nghiệm mong muốn" filled :rules="[
                    val => !!val || 'Kinh nghiệm không được rỗng',
                  ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Bằng cấp <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.degreeSelected" :options="storeRecruiterAddPost.listDegree"
                label="Chọn bằng cấp mong muốn" filled :rules="[
                    val => !!val || 'Bằng cấp không được rỗng',
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Giới tính <span class="text-red">(*)</span></label>
              <q-select v-model="storeRecruiterAddPost.genderSelected" :options="storeRecruiterAddPost.listGender"
                label="Chọn giới tính mong muốn" filled :rules="[
                    val => !!val || 'Giới tính không được rỗng',
                  ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for="">Ngày hết hạn <span class="text-red">(*)</span></label>
              <q-input filled v-model="storeRecruiterAddPost.dateExpired" mask="date" :rules="['date']"
                label="Ngày hết hạn">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="storeRecruiterAddPost.dateExpired">
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

          <div class="row q-py-lg">
            <div class="col-12 q-px-sm">
              <label for="">Độ tuổi <span class="text-red">(*)</span></label>
            </div>
            <div class="col-md-6 col-12 q-px-sm">
              <q-input filled v-model="storeRecruiterAddPost.minAge" type="number" label="Từ khoảng" :rules="[
                  val => !!val || 'Tuổi không được rỗng',
                  val => val > 17 || 'Số tuổi tối thiểu phải là 18',
                  val => val < 100 || 'Số tuổi tối đa là 100',
                ]" lazy-rules />
            </div>

            <div class="col-md-6 col-12 q-px-sm">
              <label for=""></label>
              <q-input filled v-model="storeRecruiterAddPost.maxAge" type="number" label="Đến khoảng" :rules="[
                  val => !!val || 'Tuổi không được rỗng',
                  val => val > 17 || 'Số tuổi tối thiểu phải là 18',
                  val => val < 100 || 'Số tuổi tối đa là 100',
                  val => val > storeRecruiterAddPost.minAge || 'Không được bé hơn hoặc bằng số tuổi tối thiểu',
                ]" lazy-rules />
            </div>

            <div class="col-md-12 col-12 q-px-sm">
              <br>
              <label for="">Mô tả yêu cầu</label>
              <q-input v-model="storeRecruiterAddPost.limitCharacterRequire" filled type="textarea" :maxlength="5000"
                rows="15" />
              <span>{{ storeRecruiterAddPost.limitCharacterRequire.length }}/5000 kí tự</span>

              <span class="hint">
                <div class="q-py-md">
                  <b>Lưu ý: </b> <span>Nên ghi chú đầy đủ các kĩ năng của ứng viên để đáp ứng đầy đủ nhu cầu của công
                    việc,
                    các kỹ năng yêu cầu cần có của ứng viên.</span>
                  <br>
                  <b>Ví dụ: </b>
                  <ul class="q-px-lg" style="list-style: circle;">
                    <li>Ít nhất 6 tháng kinh nghiệm làm API.</li>
                    <li>Ít nhất 6 tháng kinh nghiệm làm việc với Firebase.</li>
                    <li>Chủ động, đam mê công việc, sẵn sàng chấp nhận thách thức, luôn chú ý phát triển bản thân lên tầm
                      cao mới.</li>
                    <li>Có kinh nghiệm về RESTful API, API-first design.</li>
                    <li>Có kinh nghiệm thiết kế đặc tả API và xây dựng tài liệu API.</li>
                    <li>Có hiểu biết về các kỹ thuật tối ưu API performance.</li>
                    <li>Có kiến thức cơ bản về Design Patterns và kiến trúc Microservice Architecture pattern.</li>
                    <li>Có hiểu biết về phân tích, thiết kế và tối ưu database (đặc biệt là MongoDB hoặc hệ cơ sở dữ liệu
                      NoSQL).</li>
                    <li>Có kinh nghiệm lập trình đa luồng, lập trình thời gian thực (real-time chat/voice) và xử lý dữ
                      liệu
                      lớn là một lợi thế.</li>
                    <li>Có kinh nghiệm về ReactJS là một lợi thế.</li>
                  </ul>
                </div>
              </span>
            </div>

            <div class="col-12 q-px-sm">
              <label for="">Quyền lợi ứng viên</label>
              <q-input v-model="storeRecruiterAddPost.limitCharacterBenefit" filled type="textarea" :maxlength="5000"
                rows="15" />
              <span>{{ storeRecruiterAddPost.limitCharacterBenefit.length }}/5000 kí tự</span>

              <span class="hint">
                <div class="q-py-md">
                  <b>Ví dụ: </b>
                  <ul class="q-px-lg" style="list-style: circle;">
                    <li>Mức lương cạnh tranh, xứng đáng với năng lực.</li>
                    <li>Có cơ hội làm việc với nhiều công nghệ mới nhất trên thế giới.</li>
                    <li>Được tăng lương hàng năm và thưởng đặc biệt theo hiệu quả công việc.</li>
                    <li>Được làm việc trong một môi trường có sự chuyên môn hóa sâu về công việc.</li>
                    <li>Được làm việc với các đồng nghiệp thân thiện, hòa đồng và sẵn sàng giúp đỡ.</li>
                    <li>Được tạo điều kiện và trao cơ hội thăng tiến lên các vị trí cao hơn nếu đủ năng lực và thể hiện
                      tốt.
                    </li>
                    <li>Thường xuyên được đào tạo nội bộ kiến thức chuyên môn và kỹ năng mềm</li>
                    <li>Chế độ thưởng, phúc lợi theo chính sách Công ty (lế, tết, sinh nhật, hiếu hỷ, …)</li>
                    <li>Tham gia BHXH full lương theo yêu cầu.</li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="step-4" style="padding-top: 3%;">
        <h4>4. Thông tin liên hệ</h4>

        <div class="container q-pa-lg">
          <div class="row q-py-lg">
            <div class="col-md-4 col-12 q-px-sm">
              <label for="">Tên người liên hệ: <span class="text-red">(*)</span></label>
              <q-input filled v-model="storeRecruiterAddPost.contactName" type="text" placeholder="Tran Van A" :rules="[
                  val => !!val || 'Tên người liên hệ không được rỗng',
                ]" lazy-rules />
            </div>

            <div class="col-md-4 col-12 q-px-sm">
              <label for="">Số điện thoại: <span class="text-red">(*)</span></label>
              <q-input filled v-model="storeRecruiterAddPost.contactPhone" type="number" placeholder="0123456789" :rules="[
                  val => !!val || 'Số điện thoại liên hệ không được rỗng',
                  val => val[0] == 0 || 'Số điện thoại phải bắt đầu bằng số 0',
                  val => val.length > 8 || 'Số điện thoại tối thiểu 9 số và tối đa 11 số',
                  val => val.length < 12 || 'Số điện thoại tối thiểu 9 số và tối đa 11 số',
                ]" lazy-rules />
            </div>

            <div class="col-md-4 col-12 q-px-sm">
              <label for="">Email: <span class="text-red">(*)</span></label>
              <q-input filled v-model="storeRecruiterAddPost.contactEmail" type="text" placeholder="company@gmail.com"
                :rules="[
                    val => !!val || 'Email liên hệ không được rỗng',
                    val => storeRegex.isValidEmail(val) || 'Email không đúng định dạng'
                  ]" lazy-rules />
            </div>
          </div>

          <div class="row q-py-lg">
            <q-checkbox class="q-pb-md" right-label v-model="storeRecruiterAddPost.accept"
              label="Tôi đã đọc rõ các thông tin và không cần sửa đổi gì thêm" color="red" />
            <q-btn color="primary" icon="arrow_forward_ios" type="submit" label="Tiếp tục" class="full-width q-py-md"
              @click="updateIdTag" />
          </div>
        </div>
      </div>
    </div>
  </q-form>
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

ul li {
  list-style: inside;
}

body {
  background-color: #ffffff;
}
</style>
