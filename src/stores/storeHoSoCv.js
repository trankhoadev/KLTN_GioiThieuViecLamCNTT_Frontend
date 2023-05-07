import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";

export const useStoreHoSoCv = defineStore("storeHoSoCv", {
  state: () => {
    return {
      /* step 1 */
      listData: [],
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
      listSkill: [],
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
      resultExecute: {
        updateGioiThieuBanThan: false,
        updateKinhNghiemLamViec: false,
        updateKyNang: false,
        updateHocVan: false,
        updateChungChi: false,
        updateGiaiThuong: false,
      },
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
    getDataOfUserById(id) {
      const url = "api/ungtuyenvien/" + id;
      try {
        api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data;
            console.log(this.listData);
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },
    getListSkill() {
      const url = "api/ngonngu/";
      try {
        api.get(url).then((res) => {
          if (res.data) {
            this.listSkill = res.data;
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    updateGioiThieuBanThan() {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      const url = "api/ungtuyenvien/updateThongTinUngTuyenVien";
      const data = {
        ungTuyenVienId: localStorage.getItem("idUngTuyenVien"),
        hovaten: this.listData.hovaten,
        anhdaidien: this.listData.anhdaidien,
        sdt: this.listData.sdt,
        gioithieubanthan: this.listData.gioithieubanthan,
        ngaysinh: new Date(this.listData.ngaysinh),
        diachi: this.listData.diachi,
        email: this.listData.email,
      };
      try {
        api.put(url, data).then((res) => {
          if (res.data) {
            console.log(res.data);
            this.resultExecute.updateGioiThieuBanThan = true;
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        setTimeout(() => {
          if (this.resultExecute.updateGioiThieuBanThan) {
            Loading.hide();
            Notify.create({
              message: "Thao tác thành công",
              position: "bottom",
              timeout: 2000,
              color: "green",
              icon: "mood",
            });
            setTimeout(() => {
              return window.location.reload();
            }, 1500);
          } else {
            Loading.hide();
            Dialog.create({
              message: "Thao tác thất bại! Vui lòng thử lại.",
              title: "Thông báo",
              color: "red",
            });
          }
        }, 1000);
      }
    },
  },
});
