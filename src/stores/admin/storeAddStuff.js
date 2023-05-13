import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";

export const useStoreAddStuff = defineStore("storeAddStuff", {
  state: () => {
    return {
      filter: "",
      listData: [],
      listTag: [],
      resultImplement: reactive({
        add: false,
        remove: false,
      }),
      dialogRemoveJob: ref(false),
      oneJobSelectId: "",
      inputData: "",
    };
  },
  getters: {},
  actions: {
    _init() {},
    checkRemoveJob(id) {
      this.dialogRemoveJob = true;
      this.oneJobSelectId = id;
    },

    /* get all nganh nghe */
    async getAllData() {
      const url = "api/nganhnghe";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    /* get all ngon ngu */
    async getAllNgonNgu() {
      const url = "api/ngonngu";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            console.log(res.data);
            this.listTag = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async addStuff(name) {
      if (this.inputData.length < 6) {
        Dialog.create({
          message: "Vui lòng nhập tối thiểu 6 kí tự.",
          title: "Thông báo",
          color: "red",
        });
        return;
      }

      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/nganhnghe";
      const data = {
        tennganhnghe: name,
      };

      try {
        api.post(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.add = true;
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.add) {
            Loading.hide();
            Notify.create({
              message: "Thêm thành công",
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
              message: "Thêm thất bại! Vui lòng thử lại.",
              title: "Thông báo",
              color: "red",
            });
          }
        }, 1000);
      }
    },

    async removeJob(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/nganhnghe/" + id;

      try {
        api.delete(url).then((res) => {
          if (res.data) {
            this.resultImplement.remove = true;
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.remove) {
            Loading.hide();
            Notify.create({
              message: "Xóa thành công",
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
              message: "Xóa thất bại! Vui lòng thử lại.",
              title: "Thông báo",
              color: "red",
            });
          }
        }, 1000);
      }
    },

    async addTag(name) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/ngonngu";
      const data = {
        ngonngu: name,
      };

      try {
        api.post(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.add = true;
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.add) {
            Loading.hide();
            Notify.create({
              message: "Thêm thành công",
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
              message: "Thêm thất bại! Vui lòng thử lại.",
              title: "Thông báo",
              color: "red",
            });
          }
        }, 1000);
      }
    },

    async removeTag(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/ngonngu/" + id;

      try {
        api.delete(url).then((res) => {
          if (res.data) {
            this.resultImplement.remove = true;
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.remove) {
            Loading.hide();
            Notify.create({
              message: "Xóa thành công",
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
              message: "Xóa thất bại! Vui lòng thử lại.",
              title: "Thông báo",
              color: "red",
            });
          }
        }, 1000);
      }
    },
  },
});
