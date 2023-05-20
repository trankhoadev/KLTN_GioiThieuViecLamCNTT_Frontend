import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { app } from "src/data/address";
import { Loading, Notify } from "quasar";

export const useStoreRecruiterAddPost = defineStore("storeRecruiterAddPost", {
  state: () => {
    return {
      formattedDateExpired: "",
      formattedDateCreated: "",
      titleName: "",
      provinceSelected: "",
      listProvince: app.listProvince,
      districtSelected: "",
      listDistrict: [],
      careerSelected: "",
      listCareer: [],
      amount: "",
      positionSelected: "",
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
      listTagId: [],
      listTag: ref(),
      tagsSelected: ref(null),
      experienceSelected: "",
      listExperience: [
        "Không cần kinh nghiệm",
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
    handlePayment() {
      const payment = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:9000/recruiter/add-post",
          cancel_url: "http://localhost:9000/recruiter/welcome",
        },
        transactions: [
          {
            amount: {
              total: "1",
              currency: "USD",
            },
          },
        ],
      };

      api
        .post("api/tintuyendung/create-payment", payment)
        .then((response) => {
          const approvalUrl = response.data.links.find(
            (link) => link.rel === "approval_url"
          ).href;
          window.location.href = approvalUrl;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getListDistrict() {
      this.listDistrict = [];
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

    confirmForm() {
      let userId = localStorage.getItem("idNhaTuyenDung");

      try {
        const url = "api/tintuyendung/";
        const data = {
          tieude: this.titleName,
          diaChi:
            this.provinceSelected.label + ", " + this.districtSelected.label,
          nganhNghe: this.careerSelected,
          vitri: this.positionSelected.label,
          soLuongTuyen: this.amount,
          hinhThucLamViec: this.styleSelected,
          mucluong: this.salarySelected.label,
          moTaCongViec: this.limitCharacterJob,
          kinhNghiem: this.experienceSelected,
          bangcap: this.degreeSelected,
          gioitinh: this.genderSelected,
          tutuoi: this.minAge,
          dentuoi: this.maxAge,
          moTaYeuCau: this.limitCharacterRequire,
          quyenLoiUngVien: this.limitCharacterBenefit,
          tenNguoiLienHe: this.contactName,
          soDienThoaiLienHe: this.contactPhone,
          emailLienHe: this.contactEmail,
          ngayHetHan: new Date(this.dateExpired),
          ngonngu: this.listTagId,
          trangthai: "đang chờ",
          nhatuyendung: userId,
        };

        api.post(url, data).then((res) => {
          if (res) {
            Notify.create({
              message: "Thao tác thành công",
              position: "bottom",
              timeout: 2000,
              color: "green",
              icon: "mood",
            });
            setTimeout(() => {
              Loading.show({
                message: "Đang chuyển trang...",
                boxClass: "bg-grey-2 text-grey-9",
                spinnerColor: "primary",
              });
              this.router.push("/recruiter/my-post");
            }, 1500);

            setTimeout(() => {
              Loading.hide();
              window.location.reload();
            }, 2500);
          }
        });
      } catch (error) {
        Notify.create({
          message: "Thao tác thất bại",
          timeout: 2000,
          position: "bottom",
          color: "negative",
          icon: "mood_bad",
        });
      }
    },

    async getListTag() {
      const url = "api/ngonngu";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listTag = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async getListCareer() {
      const url = "api/nganhnghe";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listCareer = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },
  },
});
