import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";

export const useStoreManagePost = defineStore("storeManagePost", {
  state: () => {
    return {
      listData: "",
      loadData: false,
      listSelectManagePost: ref(),
      tinDangCho: 0,
      tinDaDuyet: 0,
      tinTuChoi: 0,
      isSeeDetail: ref(false),
      seeDetailSelect: "",
      dialogDenyOne: ref(false),
      confirmDenyOne: ref(false),
      dialogDenyAll: ref(false),
      confirmDenyAll: ref(false),
      oneAccountSelectName: "",
      oneAccountSelectEmail: "",
      filter: "",
      resultImplement: reactive({
        acceptOne: false,
        acceptAll: false,
        denyOne: false,
        denyAll: false,
      }),
      columnManagePost: [
        {
          name: "stt",
          required: true,
          label: "STT",
          field: "stt",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "title",
          required: true,
          label: "Tin tuyển dụng",
          field: "tieude",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "name",
          required: true,
          label: "Nhà tuyển dụng",
          field: "name",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "date",
          required: true,
          label: "Ngày đăng tuyển",
          field: "createdAt",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "state",
          required: true,
          label: "Trạng thái",
          field: "trangthai",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "action",
          required: true,
          label: "Thao tác",
          field: "action",
          align: "left",
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },
      ],
      /*
        state: {
          0： từ chối
          1: đã duyệt
          2: đang chờ
        }
      */
      rowDataManagePost: [
        // {
        //   name: "Nhà tuyển dụng 1",
        //   title:
        //     "Tuyển nhân viên làm việc bán thời gian cho nhà ngày 100-200 tiếng",
        //   address: "Tỉnh Quảng Ninh",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "ayonnon@gmail.com",
        //   date: "22-10-2001",
        //   state: "đang chờ",
        // },
        // {
        //   name: "Nhà tuyển dụng ABC",
        //   title:
        //     "Tuyển nhân viên làm việc bán thời gian. Tuyển nhân viên làm việc bán thời gian cho nhà ngày 100-200 tiếng",
        //   address: "thành phố Hồ Chí Minh",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
        // {
        //   name: "2 thành viên, 2 thành viên, 2 thành viên, 2 thành viên, 2 thành viên",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "Hà nội",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "cyonnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã duyệt",
        // },
        // {
        //   name: "Công Ty TNHH 3 con gà",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "tỉnh Quy Nhơn",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "dyonnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã hủy",
        // },
        // {
        //   name: "Hỏng biết nữa",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "Huyện Cái Bè",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "dawdawyonnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
        // {
        //   name: "yonnon6",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byfawfwaonnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã duyệt",
        // },
        // {
        //   name: "yonnon7",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byofafannon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
        // {
        //   name: "yonnon8",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonwdnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã hủy",
        // },
        // {
        //   name: "yonnon9",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonnfawfawon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã duyệt",
        // },
        // {
        //   name: "yonnon10",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonnofda awfawn@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
        // {
        //   name: "yonnon11",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonnofawfawn@gmail.com",
        //   date: "22-10-2004",
        //   state: "đã hủy",
        // },
        // {
        //   name: "yonnon12",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byofawnnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
        // {
        //   name: "yonnon13",
        //   title: "Tuyển nhân viên làm việc bán thời gian",
        //   address: "",
        //   idPost: "https://templateurl.com",
        //   danhGia: "2",
        //   email: "byonfawnon@gmail.com",
        //   date: "22-10-2004",
        //   state: "đang chờ",
        // },
      ],
    };
  },
  getters: {},
  actions: {
    _init() {},

    logOut() {},
    checkDenyOne(name, email) {
      this.dialogDenyOne = true;
      this.oneAccountSelectName = name;
      this.oneAccountSelectEmail = email;
    },

    checkDenyAll() {
      if (
        !this.listSelectManagePost ||
        this.listSelectManagePost.length === 0
      ) {
        Notify.create({
          message:
            "Vui lòng chọn đối tượng ở bảng bên dưới để thực hiện thao tác.",
          color: "primary",
          actions: [
            {
              label: "OK",
              color: "white",
              handler: () => {},
            },
          ],
        });
      } else {
        this.dialogDenyAll = true;
      }
    },

    acceptOne(inputData) {
      let data = inputData;
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      try {
        this.resultImplement.acceptOne = true;
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.acceptOne) {
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

    acceptAll() {
      if (
        !this.listSelectManagePost ||
        this.listSelectManagePost.length === 0
      ) {
        Notify.create({
          message:
            "Vui lòng chọn đối tượng ở bảng bên dưới để thực hiện thao tác.",
          color: "primary",
          actions: [
            {
              label: "OK",
              color: "white",
              handler: () => {},
            },
          ],
        });
      } else {
        Loading.show({
          message: "Đang xử lí...",
          boxClass: "bg-grey-2 text-grey-9",
          spinnerColor: "primary",
        });

        try {
          this.resultImplement.acceptAll = true;
        } catch (error) {
        } finally {
          setTimeout(() => {
            if (this.resultImplement.acceptAll) {
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
      }
    },

    denyOne() {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      try {
        this.resultImplement.denyOne = true;
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.denyOne) {
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

    denyAll() {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      try {
        this.resultImplement.denyAll = true;
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.denyAll) {
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
    seeDetail(data) {
      this.isSeeDetail = true;
      this.seeDetailSelect = data;
    },

    async getAllPost() {
      this.loadData = true;
      const url = "api/tintuyendung";
      try {
        await api.get(url).then((res) => {
          if (res) {
            this.rowDataManagePost = res.data;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
        this.loadData = false;
      }
    },
  },
});
