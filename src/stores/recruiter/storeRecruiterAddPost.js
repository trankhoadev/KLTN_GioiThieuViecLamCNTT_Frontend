import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { app } from "src/data/address";
import { Loading, Notify } from "quasar";

export const useStoreRecruiterAddPost = defineStore("storeRecruiterAddPost", {
  state: () => {
    return {
      titleName: "",
      provinceSelected: "",
      listProvince: app.listProvince,
      districtSelected: "",
      listDistrict: [],
      careerSelected: "",
      listCareer: ["test"],
      amount: "",
      positionSelected: "",
      listPosition: [
        "Sinh viên",
        "Thực tập sinh",
        "Mới tốt nghiệp",
        "Nhân viên",
        "Trưởng phòng",
        "Giám sát",
        "Quản lý",
        "Phó giám đốc",
        "Giám đốc",
      ],
      styleSelected: "",
      listStyle: [
        "Toàn thời gian",
        "Bán thời gian",
        "Thực tập sinh",
        "Thời vụ",
        "Hợp đồng",
        "Khác (liên hệ sau)",
      ],
      salarySelected: "",
      specificSalary: "",
      listSalary: [
        {
          value: "0",
          label: "≥ 5 triệu đồng",
        },

        {
          value: "1",
          label: "≥ 15 triệu đồng",
        },

        {
          value: "2",
          label: "≥ 25 triệu đồng",
        },

        {
          value: "3",
          label: "≥ 40 triệu đồng",
        },

        {
          value: "4",
          label: "cụ thể",
        },

        {
          value: "5",
          label: "thỏa thuận",
        },
      ],
      experienceSelected: "",
      listExperience: [
        "Chưa có kinh nghiệm",
        "Dưới 1 năm",
        "1 năm",
        "2 năm",
        "3 năm",
        "4 năm",
        "5 năm",
        "trên 5 năm",
      ],
      degreeSelected: "",
      listDegree: [
        "Trung học cơ sở",
        "Trung học phổ thông",
        "Trung cấp nghề",
        "Cao cấp nghề",
        "Đại học",
        "Tốt nghiệp đại học",
        "Học nghề đại học",
        "Không cần bằng cấp",
      ],
      genderSelected: "",
      listGender: ["Nam", "Nữ", "Không cần phân biệt"],
      dateExpired: ref(""),
      minAge: "",
      maxAge: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      limitCharacterJob: "",
      limitCharacterRequire: "",
      limitCharacterBenefit: "",
      accept: ref(false),
    };
  },
  getters: {},
  actions: {
    _init() {},
    getListDistrict() {
      for (let i = 0; i < app.listDistrict.length; ++i) {
        if (app.listDistrict[i].province_code == this.provinceSelected.code) {
          this.listDistrict.push(app.listDistrict[i]);
        }
      }
    },
    submitForm() {
      if (this.accept !== true) {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message:
            "Bạn cần xác nhận các thông tin đã nhập là chính xác trước khi đến bước tiếp theo.",
        });
      } else {
        Loading.show({
          message: "Đang xử lí...",
          boxClass: "bg-grey-2 text-grey-9",
          spinnerColor: "primary",
        });
        setTimeout(() => {
          Loading.hide();
          this.router.push("/recruiter/preview-post");
        }, 1500);
      }
    },
  },
});
