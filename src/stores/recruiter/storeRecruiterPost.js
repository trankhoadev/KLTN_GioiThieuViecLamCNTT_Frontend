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
          name: "tieude",
          required: true,
          label: "Tin tuyển dụng",
          field: "tieude",
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
          name: "trangthai",
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
      }
    },
  },
});
