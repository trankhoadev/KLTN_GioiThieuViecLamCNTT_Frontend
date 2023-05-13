import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";
import QSpinnerFacebook from "quasar/src/components/spinner/QSpinnerFacebook.js";
import { copyToClipboard } from "quasar";

export const useStoreJob = defineStore("storeJob", {
  state: () => {
    return {
      test: "",
      listData: [],
      listDataSearch: [],
      listDataJobDetail: [],
      listLanguageName: [],
      listRate: [],
      rate: ref(5),
      lengthRate: "",
      inputComment: "",
      listRecruiter: [],
      listDataOneRecruiter: [],
      listPostNhaTuyenDungById: [],
      ungTuyenSelectedData: [],
      listDonUngTuyen: [],
      sortRadio: ref(""),
      lengthResponse: ref(0),
      panigateSelected: ref(1),
      panigateCommentSelected: ref(1),
      tabJobDetail: ref("news"),
      /* optional */
      href: "",
      defaultShareFacebookUrl: "https://www.facebook.com/sharer/sharer.php?u=",
      defaultShareTwitterUrl: "https://twitter.com/intent/tweet?url=",
      defaultShareLinkedinUrl:
        "https://www.linkedin.com/uas/login?session_redirect=",
      isSeeDetail: ref(false),
      seeDetailSelect: "",
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
      resultExecuted: reactive({
        resultSearchJob: false,
        resultJobDetail: false,
        resultUngTuyen: false,
        resultDanhGia: false,
      }),
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
      optionExperiment: [
        "Chưa có kinh nghiệm",
        "≥ 1 năm",
        "≥ 2 năm",
        "≥ 4 năm",
      ],
      optionWorkType: ["Làm việc tại văn phòng", "Làm việc từ xa", "Linh hoạt"],
      listRecruiter: [
        {
          id: "1",
          picture:
            "https://www.nicepng.com/png/detail/202-2024922_markoja-company-profile-icon-png-company-profile-icon.png",
          companyName: "Công Ty TNHH một thành viên",
          title:
            "Middle Back-end Developer (PHP, MySQL)Middle Back-end Developer (PHP, MySQL)",
          salary: "7-10 triệu",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs", "Java"],
        },
        {
          id: "2",
          picture:
            "https://www.iconplc.com/_internal/gxml!0/p9kpljmzxqmu17esax1vc6lgazxitn3$ms2r6sstj81hvf80pxe77n7qp9nbfen",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "trên 20 triệu",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP"],
        },
      ],

      listLanguage: [
        {
          id: "1",
          name: "Javascript",
          picture:
            "https://techvccloud.mediacdn.vn/2018/11/23/js-15429579443112042672363-crop-1542957949936317424252.png",
        },

        {
          id: "2",
          name: "Python",
          picture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
        },

        {
          id: "3",
          name: "Java",
          picture:
            "https://nhienthai.tech/wp-content/uploads/2023/03/java-coffee-cup-logo-v1.png",
        },

        {
          id: "4",
          name: "Go",
          picture:
            "https://blog.vietnamlab.vn/content/images/15nbR1DnN8fHxFD-VtmWBRnXYMU6_wnBk.png",
        },

        {
          id: "5",
          name: "Kotlin",
          picture:
            "https://developer.android.com/images/cluster-illustrations/kotlin-hero.svg",
        },

        {
          id: "6",
          name: "PHP",
          picture:
            "https://cafedev.vn/wp-content/uploads/2020/08/cafedev_tuhoc_php.png",
        },

        {
          id: "7",
          name: "C#",
          picture:
            "https://plpsoft.vn/ckfinder/connector?command=Proxy&lang=vi&type=Files&currentFolder=%2FBaivietIT%2FCS_CB%2F&hash=c245c263ce0eced480effe66bbede6b4d46c15ae&fileName=3.png",
        },

        {
          id: "8",
          name: "Swift",
          picture: "https://developer.apple.com/swift/images/swift-og.png",
        },
      ],

      oneJobSelected: {},
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

    async getAllPost() {
      const url = "api/tintuyendung";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data.filter((e) => {
              if (e.trangthai === "đang tuyển") {
                return e;
              }
            });
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
      }
    },

    getDataFromNhaTuyenDungId() {},

    async searchJob() {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "purple-13",
        spinnerSize: 140,
        backgroundColor: "grey-7",
        message: "Vui lòng đợi trong giây lát...",
        messageColor: "white",
      });
      const url = "api/tintuyendung/search/" + this.searchInput;
      try {
        await api.get(url).then((res) => {
          if (res.data.length === 0) {
            setTimeout(() => {
              this.listDataSearch = [];
              Loading.hide();
              this.router.push("/search/" + this.searchInput);
            }, 1000);
            setTimeout(() => {
              window.location.reload();
            }, 1050);
          }
          if (res.data.length !== 0) {
            this.listDataSearch = [];
            setTimeout(() => {
              this.listDataSearch = res.data.filter((e) => {
                if (e.trangthai === "đang tuyển") {
                  return e;
                }
              });
              this.lengthResponse = this.listDataSearch.length;
              Loading.hide();
              this.router.push("/search/" + this.searchInput);
            }, 1000);
            setTimeout(() => {
              window.location.reload();
            }, 1050);
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async reloadSearchJob(data) {
      const url = "api/tintuyendung/search/" + data;
      try {
        await api.get(url).then((res) => {
          if (res.data.length !== 0) {
            this.listDataSearch = res.data.filter((e) => {
              if (e.trangthai === "đang tuyển") {
                return e;
              }
            });
            this.lengthResponse = this.listDataSearch.length;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async getDataJobDetail(id) {
      const url = "api/tintuyendung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listDataJobDetail = res.data;
            this.resultExecuted.resultJobDetail = true;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        this.href = window.location.href;
        if (!this.resultExecuted.resultJobDetail) {
          this.router.push({
            name: "NotFound",
          });
        }
      }
    },

    async getAllPostByNhaTuyenDungId(id) {
      const url = "api/tintuyendung/getByNhaTuyenDung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listPostNhaTuyenDungById = res.data;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
      }
    },

    async getAllPostDangTuyenDungByNhaTuyenDungId(id) {
      const url = "api/tintuyendung/getByNhaTuyenDung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listPostNhaTuyenDungById = res.data.filter((e) => {
              if (e.trangthai === "đang tuyển") {
                return e;
              }
            });
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
      }
    },

    async getLanguageName(id) {
      const url = "api/ngonngu/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            return res.data.ngonngu;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    returnNameTag(data) {
      this.listSkill.map((e) => {
        if (e._id === data) {
          return e.ngonngu;
        }
      });
    },

    async getListTag() {
      const url = "api/ngonngu";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listSkill = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async getAllNhaTuyenDung() {
      const url = "api/nhatuyendung";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listRecruiter = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async getNhaTuyenDungById(id) {
      const url = "api/nhatuyendung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listDataOneRecruiter = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async ungTuyenTinTuyenDung(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      const url = "api/donungtuyen/";
      let check = true;
      const data = {
        trangthai: "đang chờ",

        ungtuyenvien: localStorage.getItem("idUngTuyenVien"),

        tintuyendung: id,
      };
      try {
        await this.getAllDonUngTuyen();
        this.listDonUngTuyen.filter((e) => {
          if (
            e.tintuyendung._id === id &&
            e.ungtuyenvien._id === localStorage.getItem("idUngTuyenVien")
          ) {
            Notify.create({
              message: "Bạn đã ứng tuyển tin này rồi",
              timeout: 2000,
              position: "bottom",
              color: "negative",
              icon: "mood_bad",
            });
            setTimeout(() => {
              Loading.hide();
            }, 1000);
            return (check = false);
          }
        });
        if (check) {
          await api.post(url, data).then((res) => {
            if (res.data) {
              this.resultExecuted.resultUngTuyen = true;
            }
          });
        }
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        if (this.resultExecuted.resultUngTuyen) {
          setTimeout(() => {
            Loading.hide();
            window.location.reload();
          }, 1000);
          Notify.create({
            message: "Ứng tuyển thành công",
            position: "bottom",
            timeout: 2000,
            color: "green",
            icon: "mood",
          });
        } else {
          if (check) {
            setTimeout(() => {
              Loading.hide();
            }, 1000);
            Notify.create({
              message: "Ứng tuyển thất bại",
              timeout: 2000,
              position: "bottom",
              color: "negative",
              icon: "mood_bad",
            });
          }
        }
      }
    },

    async getAllDonUngTuyen() {
      const url = "api/donungtuyen/";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listDonUngTuyen = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async getListDanhGia(id) {
      this.listRate = [];
      const url = "api/danhgia/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listRate = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        this.lengthRate = this.listRate.length;
      }
    },

    async danhGiaPost() {
      if (this.rate === 0) {
        Dialog.create({
          message: "Vui lòng chọn số sao đánh giá.",
          title: "Thông báo",
          color: "red",
        });
        return;
      }

      if (this.inputComment.length === 0) {
        Dialog.create({
          message: "Vui lòng điền bình luận trước khi submit.",
          title: "Thông báo",
          color: "red",
        });
        return;
      }

      // let dataXepLoai;
      // if (this.rate === 5) {
      //   dataXepLoai = "NAM_SAO";
      // }

      // if (this.rate === 4) {
      //   dataXepLoai = "BON_SAO";
      // }

      // if (this.rate === 3) {
      //   dataXepLoai = "BA_SAO";
      // }

      // if (this.rate === 2) {
      //   dataXepLoai = "HAI_SAO";
      // }

      // if (this.rate === 1) {
      //   dataXepLoai = "MOT_SAO";
      // }

      const url = "api/danhgia";
      const data = {
        noidung: this.inputComment,
        ngay: new Date(),
        xeploai: this.rate,
        tintuyendung: this.listDataJobDetail._id,
        ungtuyenvien: localStorage.getItem("idUngTuyenVien"),
      };

      try {
        await api.post(url, data).then((res) => {
          if (res.data) {
            this.resultExecuted.resultDanhGia = true;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        if (this.resultExecuted.resultDanhGia) {
          setTimeout(() => {
            Loading.hide();
            window.location.reload();
          }, 1000);
          Notify.create({
            message: "Bình luận thành công",
            position: "bottom",
            timeout: 2000,
            color: "green",
            icon: "mood",
          });
        } else {
          setTimeout(() => {
            Loading.hide();
          }, 1000);
          Notify.create({
            message: "Bình luận thất bại",
            timeout: 2000,
            position: "bottom",
            color: "negative",
            icon: "mood_bad",
          });
        }
      }
    },

    /* Optional Function */
    copyToClipBoard(data) {
      copyToClipboard(data)
        .then(() => {
          Notify.create({
            message: "Sao chép thành công.",
            position: "bottom",
            timeout: 2000,
            color: "green",
            icon: "mood",
          });
        })
        .catch((err) => {
          console.log("Can't coppy text. Error: ", err);
        });
    },

    openUrl(defaultUrl, path) {
      window.open(defaultUrl + path);
    },

    seeDetail(data) {
      this.isSeeDetail = true;
      this.ungTuyenSelectedData = data;
    },
  },
});
