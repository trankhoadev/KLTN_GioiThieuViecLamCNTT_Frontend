import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";

export const useStoreCompanyInfo = defineStore("storeCompanyInfo", {
  state: () => {
    return {
      listData: [],
    };
  },
  getters: {},
  actions: {
    _init() {},

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

    async getDataOfUserById(id) {
      const url = "api/nhatuyendung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data;
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },
  },
});
