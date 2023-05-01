import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";

export const useStoreRecruiterPost = defineStore("storeRecruiterPost", {
  state: () => {
    return {
      filter: "",
      listData: [],
      getDataSuccessfully: false,
      listSelectRecruiter: ref(),
      tinTuyenDung: 0,
      tinTuyenDungDangCho: 0,
      tinTuyenDungDangTuyen: 0,
      tinTuyenDungDungTuyen: 0,
      tinTuyenDungTuChoi: 0,
      columnRecruiterAccount: [
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
          name: "name",
          required: true,
          label: "Tin tuyển dụng",
          field: "name",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "profile",
          required: true,
          label: "Hồ sơ",
          field: "profile",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "state",
          required: true,
          label: "Trạng thái",
          field: "state",
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
          1: đang tuyển
          2: đang chờ
        }
      */
      // rowDataRecruiterAccount: [
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "dừng tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "dừng tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "dừng tuyển",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },
      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đang chờ",
      //   },

      //   {
      //     name: "Nhân viên thực tập nodejs",
      //     address: "tỉnh Hà nội, huyện Ba Vì",
      //     profile: "/",
      //     dateCreate: "22-10-2001",
      //     dateExpired: "22-10-2001",
      //     state: "đã xóa",
      //   },
      // ],
    };
  },
  getters: {},
  actions: {
    _init() {},

    logOut() {},
    /* For recruiter User */
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

    checkDenyOne(name, email) {
      this.dialogDenyOne = true;
      this.oneAccountSelectName = name;
      this.oneAccountSelectEmail = email;
    },

    getAllPost() {
      const url = "api/tintuyendung";
      try {
        api.get(url).then((res) => {
          if (res) {
            this.listData = res.data;
            this.getDataSuccessfully = true;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
        // if (this.getDataSuccessfully) {
        //   for (let i = 0; i < this.listData.length; ++i) {
        //     if (this.listData[i].trangthai === "đang chờ") {
        //       this.tinTuyenDungDangCho++;
        //     }
        //     if (this.listData[i].trangthai === "đang tuyển") {
        //       this.tinTuyenDungDangTuyen++;
        //     }
        //     if (this.listData[i].trangthai === "dừng tuyển") {
        //       this.tinTuyenDungDungTuyen++;
        //     }
        //   }
        // }
      }
    },
  },
});
