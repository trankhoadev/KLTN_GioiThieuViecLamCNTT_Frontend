import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";

export const useStoreManagePost = defineStore("storeManagePost", {
  state: () => {
    return {
      listData: [],
      loadData: false,
      listSelectManagePost: ref(),
      tinDangCho: 0,
      tinDaDuyet: 0,
      tinTuChoi: 0,
      tinDaXoa: 0,
      isSeeDetail: ref(false),
      seeDetailSelect: "",
      dialogDenyOne: ref(false),
      confirmDenyOne: ref(false),
      dialogDenyAll: ref(false),
      confirmDenyAll: ref(false),
      onePostSelectName: "",
      onePostSelectTitle: "",
      onePostSelectId: "",
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
          name: "tieude",
          required: true,
          label: "Tin tuyển dụng",
          field: "tieude",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "tencongty",
          required: true,
          label: "Nhà tuyển dụng",
          field: "tencongty",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "createdAt",
          required: true,
          label: "Ngày đăng tuyển",
          field: "createdAt",
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
    checkDenyOne(id, title, name) {
      this.dialogDenyOne = true;
      this.onePostSelectId = id;
      this.onePostSelectTitle = title;
      this.onePostSelectName = name;
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

    async acceptOne(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/tintuyendung/duyet";
      const data = {
        postId: id,
        trangthai: "đang tuyển",
      };

      try {
        await api.put(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.acceptOne = true;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
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

    async denyOne(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/tintuyendung/duyet";
      const data = {
        postId: id,
        trangthai: "đã hủy",
      };

      try {
        await api.put(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.denyOne = true;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
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
            this.listData = res.data;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
        this.loadData = false;
      }
    },

    async getOneRecruiter(id) {
      const url = "api/nhatuyendung/?id=" + id;
      try {
        await api.get(url).then((res) => {
          if (res) {
            return res.data;
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
