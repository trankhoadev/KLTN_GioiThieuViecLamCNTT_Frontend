import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";

export const useStoreCompanyInfo = defineStore("storeCompanyInfo", {
  state: () => {
    return {
      listData: [],
      resultExecute: reactive({
        updateCompanyInfo: false,
      }),
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

    updateThongTinCongTyNhaTuyenDung() {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      let day = new Date(this.listData.ngaythamgia).getDate();
      let month = new Date(this.listData.ngaythamgia).getMonth() + 1;
      let year = new Date(this.listData.ngaythamgia).getFullYear() + 2;

      let dayCurrent = new Date().getDate();
      let monthCurrent = new Date().getMonth() + 1;
      let yearCurrent = new Date().getFullYear();

      if (
        day === dayCurrent &&
        month === monthCurrent &&
        year === yearCurrent
      ) {
        this.listData.loainhatuyendung = "lâu năm";
      }
      // let finalDate = new Date(month + "/" + day + "/" + year);

      const url = "api/nhatuyendung/update";
      const data = {
        nhatuyendungId: localStorage.getItem("idNhaTuyenDung"),

        tennhatuyendung: this.listData.tennhatuyendung,

        anhdaidien: this.listData.anhdaidien,

        tencongty: this.listData.tencongty,

        mota: this.listData.mota,

        ngaythanhlap: new Date(this.listData.ngaythanhlap),

        diachi: this.listData.diachi,

        diachiWebsite: this.listData.diachiWebsite,

        ngaythamgia: new Date(this.listData.ngaythamgia),

        email: this.listData.email,

        loainhatuyendung: this.listData.loainhatuyendung,
      };

      try {
        api.put(url, data).then((res) => {
          if (res.data) {
            this.resultExecute.updateCompanyInfo = true;
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        setTimeout(() => {
          if (this.resultExecute.updateCompanyInfo) {
            Loading.hide();
            Notify.create({
              message: "Thao tác thành công",
              position: "bottom",
              timeout: 2000,
              color: "green",
              icon: "mood",
            });
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

    // updateLevelAutomatically() {
    //   let day = new Date(this.listData.ngaythamgia).getDate();
    //   let month = new Date(this.listData.ngaythamgia).getMonth() + 1;
    //   let year = new Date(this.listData.ngaythamgia).getFullYear() + 2;
    //   let finalDate = new Date(month + "/" + day + "/" + year);
    // },
  },
});
