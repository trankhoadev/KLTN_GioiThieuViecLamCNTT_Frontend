import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useStoreHoSoCv = defineStore("storeHoSoCv", {
  state: () => {
    return {
      /* step 1 */
      chucVu: "",
      ngaySinh: ref(""),
      phone: "",
      address: "",
      moTaBanThan: "",
      /* step 2 */
      chucVuCongTy: "",
      tenCongTy: "",
      lamTuNgay: ref(""),
      lamDenNgay: ref(""),
      moTaChiTietCongViec: "",
      /* step 3 */
      listSkill: [
        "Python",
        "Java",
        "JavaScript",
        "C#",
        "Ruby",
        "Swift",
        "Kotlin",
        "Go",
        "TypeScript",
        "SQL",
        "C++",
        "Rust",
        ".Net",
        "Scala",
        "Objective-C",
        "Lua",
        "R",
        "Assembly",
        "MATLAB",
        "Visual Basic",
        "Dart",
        "DevOps",
        "VueJs",
        "ReactJs",
        "AngularJs",
        "HTML",
        "CSS",
        "Linux",
        "Designer",
      ],
      /* step 4 */
      nganhHoc: "",
      tenTruong: "",
      hocTuNgay: ref(""),
      hocDenNgay: ref(""),
      moTaChiTietHocVan: "",
      /* step 5 */
      tenChungChi: "",
      toChucChungChi: "",
      ngayNhan: ref(""),
      ngayHetHan: ref(""),
      moTaChungChi: "",
      /* step 6 */
      listMonth: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      selectMonth: "",
      listYear: [],
      selectYear: "",
      toChucGiaiThuong: "",
      moTaGiaiThuong: "",
      listSelectSkill: [],
      expandUserInfo: false,
      expandExperiment: false,
      expandSkill: false,
      expandEducation: false,
      expandCertification: false,
      expandPrize: false,
      searchInput: "",
      selectLevel: ref(null),
      selectSalary: ref(null),
      selectExperiment: ref(null),
      selectWorkType: ref(null),
      optionLevel: ["Fresher", "Junior", "Senior", "Manager"],
      optionSalary: [
        "≥ 5 triệu đồng",
        "≥ 15 triệu đồng",
        "≥ 25 triệu đồng",
        "≥ 40 triệu đồng",
      ],
      optionExperiment: [
        "Chưa có kinh nghiệm",
        "≥ 1 năm",
        "≥ 2 năm",
        "≥ 4 năm",
      ],
      optionWorkType: ["Làm việc tại văn phòng", "Làm việc từ xa", "Linh hoạt"],
    };
  },
  getters: {},
  actions: {
    _init() {
      this.expandUserInfo = false;
      this.expandExperiment = false;
      this.expandSkill = false;
      this.expandEducation = false;
      this.expandCertification = false;
      this.expandPrize = false;
    },
  },
});
