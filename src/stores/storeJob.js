import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";
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
      listRecruiter: [],
      listDataOneRecruiter: [],
      listPostNhaTuyenDungById: [],
      ungTuyenSelectedData: [],
      listDonUngTuyen: [],
      sortRadio: ref(""),
      lengthResponse: ref(0),
      panigateSelected: ref(1),
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
      // listCompany: [
      //   {
      //     id: "1",
      //     name: "CÔNG TY TNHH AMARIS VIỆT NAM",
      //     picture:
      //       "https://cdn.topcv.vn/48/company_logos/9c7G3P3T9ax2xjTUuFrGuzERBnewqWCr_1655459515____7c02ee0971f3c131d91cb63cbdbdf588.png",
      //     amount: "17",
      //   },

      //   {
      //     id: "2",
      //     name: "Công ty TNHH Công nghệ số Adamo",
      //     picture:
      //       "https://cdn.topcv.vn/48/company_logos/cong-ty-tnhh-cmc-global-1d94bf2be044cc832cd72d2f4f8fad66-5e72d0edadcfb.jpg",
      //     amount: "8",
      //   },
      // ],

      oneJobSelected: {
        id: "1",
        picture:
          "https://cdn.topcv.vn/80/company_logos/cong-ty-tnhh-giai-phap-ket-noi-du-lich-viet-nam-59db4efdb678f_rs.jpg",
        title: "Lập trình viên Frontend VueJS",
        companyName: "Công ty TNHH giải pháp kết nối du lịch việt nam",
        salary: "Tới 20 triệu",
        workingType: "Toàn thời gian",
        gender: "Không yêu cầu",
        amount: "3", // so luong can tuyen
        level: "nhân viên",
        experience: "Không yêu cầu kinh nghiệm",
        address:
          "Hà Nội: Số 2, đường 3.5, khu đô thị Gamuda Gardens, P. Trần Phú, Q. Hoàng Mai. Ra tết sẽ chuyển qua Xã Đàn, Quận Đống Đa, TP Hà Nội",
        moTaCongViec:
          "Viết API Firebase cho Web và mobile app.\nLên kế hoạch, chuẩn bị giải pháp, thiết kế hệ thống phía server-side cùng các kiến trúc cơ sở dữ liệu lớn.\nTham gia viết tài liệu, mô tả hệ thống, kỹ thuật cho hệ thống phần mềm.\nỨng dụng các công nghệ, kỹ thuật mới để cải tiến hiệu năng và nâng cao chất lượng phần mềm.\nHỗ trợ các công việc liên quan cơ sở hạ tầng (Web Server, Database…).",
        yeuCauUngVien:
          "Ít nhất 6 tháng kinh nghiệm làm API.\nÍt nhất 6 tháng kinh nghiệm làm việc với Firebase.\nChủ động, đam mê công việc, sẵn sàng chấp nhận thách thức, luôn chú ý phát triển bản thân lên tầm cao mới.\nCó kinh nghiệm về RESTful API, API-first design.\nCó kinh nghiệm thiết kế đặc tả API và xây dựng tài liệu API.\nCó hiểu biết về các kỹ thuật tối ưu API performance.\nCó kiến thức cơ bản về Design Patterns và kiến trúc Microservice Architecture pattern.\nCó hiểu biết về phân tích, thiết kế và tối ưu database (đặc biệt là MongoDB hoặc hệ cơ sở dữ liệu NoSQL).\nCó kinh nghiệm lập trình đa luồng, lập trình thời gian thực (real-time chat/voice) và xử lý dữ liệu lớn là một lợi thế.\nCó kinh nghiệm về ReactJS là một lợi thế.",
        quyenLoiUngVien:
          "Mức lương cạnh tranh, xứng đáng với năng lực.\nCó cơ hội làm việc với nhiều công nghệ mới nhất trên thế giới.\nĐược tăng lương hàng năm và thưởng đặc biệt theo hiệu quả công việc. \nĐược làm việc trong một môi trường có sự chuyên môn hóa sâu về công việc. \nĐược làm việc với các đồng nghiệp thân thiện, hòa đồng và sẵn sàng giúp đỡ. \nĐược tạo điều kiện và trao cơ hội thăng tiến lên các vị trí cao hơn nếu đủ năng lực và thể hiện tốt. \nThường xuyên được đào tạo nội bộ kiến thức chuyên môn và kỹ năng mềm \nChế độ thưởng, phúc lợi theo chính sách Công ty (lế, tết, sinh nhật, hiếu hỷ, …) \nĐược hưởng chế độ bảo hiểm y tế, bảo hiểm xã hội theo quy định",
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
