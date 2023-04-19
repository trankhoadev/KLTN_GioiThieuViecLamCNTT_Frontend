import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useStoreJob = defineStore("storeJob", {
  state: () => {
    return {
      sortRadio: ref(""),
      panigateSelected: ref(1),
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
        {
          id: "3",
          picture:
            "https://image.shutterstock.com/image-vector/company-line-icon-260nw-516651403.jpg",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "trên 10 triệu",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "HTML", "Java"],
        },
        {
          id: "4",
          picture:
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/real-estate-logo-construction-company-icon-design-template-23248ce5068b8b1a284cce0f3852f257_screen.jpg?ts=1653236541",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "Thỏa thuận",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs"],
        },
        {
          id: "5",
          picture:
            "https://static.vecteezy.com/system/resources/thumbnails/011/231/914/small/3d-cm-letter-design-logo-template-for-business-and-corporate-identity-vector.jpg",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "12-13 triệu",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["NodeJs", "Java"],
        },
        {
          id: "6",
          picture:
            "https://img.freepik.com/free-vector/ad-logo-icon-colorfuell_125964-408.jpg?w=2000",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "Thỏa thuận",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs", "Java"],
        },
        {
          id: "7",
          picture:
            "https://img.freepik.com/premium-vector/d-logo-design-symbol_332533-327.jpg?w=2000",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "Thỏa thuận",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs", "Java"],
        },
        {
          id: "8",
          picture:
            "https://t4.ftcdn.net/jpg/03/13/96/89/360_F_313968921_tqgzvlF9UJ9BFBLdnl1z8KiS8KdCGJa0.jpg",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "Thỏa thuận",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs", "Java"],
        },
        {
          id: "9",
          picture:
            "https://static.vecteezy.com/system/resources/thumbnails/004/893/949/small/ad-creative-modern-logo-design-with-orange-and-black-colors-monogram-stroke-letter-design-vector.jpg",
          companyName: "Công Ty TNHH một thành viên",
          title: "Middle Back-end Developer (PHP, MySQL)",
          salary: "Thỏa thuận",
          address: "Hà Nội",
          save: "false",
          datePost: "30-03-2023",
          tag: ["PHP", "NodeJs", "Java"],
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
      listCompany: [
        {
          id: "1",
          name: "Công Ty Cổ Phần Công Nghệ VMO Holdings",
          picture:
            "https://cdn.topcv.vn/48/company_logos/Drpdbc28IUtQjlGRyI5u1Hf4tIXtfiae_1678416305____a27ee094e700a72b093985db22e69d7e.png",
          amount: "20",
        },
        {
          id: "2",
          name: "Công ty TNHH CMC GLOBAL",
          picture:
            "https://cdn.topcv.vn/48/company_logos/cong-ty-tnhh-cmc-global-1d94bf2be044cc832cd72d2f4f8fad66-5e72d0edadcfb.jpg",
          amount: "18",
        },

        {
          id: "3",
          name: "CÔNG TY TNHH PHẦN MỀM FPT",
          picture:
            "https://cdn.topcv.vn/48/company_logos/cong-ty-tnhh-phan-mem-fpt-5e006f1d44fed.jpg",
          amount: "29",
        },

        {
          id: "4",
          name: "FPT Software",
          picture:
            "https://cdn.topcv.vn/48/company_logos/fpt-software-6073b38a10cb4.jpg",
          amount: "23",
        },

        {
          id: "5",
          name: "CÔNG TY TNHH AMARIS VIỆT NAM",
          picture:
            "https://cdn.topcv.vn/48/company_logos/9c7G3P3T9ax2xjTUuFrGuzERBnewqWCr_1655459515____7c02ee0971f3c131d91cb63cbdbdf588.png",
          amount: "17",
        },

        {
          id: "6",
          name: "Công ty TNHH Công nghệ số Adamo",
          picture:
            "https://cdn.topcv.vn/48/company_logos/cong-ty-tnhh-cong-nghe-so-adamo-5c8f238c6a15b_rs.jpg",
          amount: "8",
        },
      ],
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
