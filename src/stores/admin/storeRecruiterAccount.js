import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";

export const useStoreRecruiterAccount = defineStore("storeRecruiterAccount", {
  state: () => {
    return {
      filter: "",
      listData: [],
      listSelectRecruiterAccount: ref(),
      taiKhoanNtd: 0,
      taiKhoanNtdDangHoatDong: 0,
      taiKhoanNtdDaKhoa: 0,
      dialogResetOne: ref(false),
      dialogDenyOne: ref(false),
      confirmDenyOne: ref(false),
      dialogDenyAll: ref(false),
      confirmDenyAll: ref(false),
      oneAccountSelectId: "",
      oneAccountSelectName: "",
      oneAccountSelectEmail: "",
      resultImplement: reactive({
        acceptOne: false,
        acceptAll: false,
        denyOne: false,
        denyAll: false,
        resetOne: false,
      }),
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
          label: "Tên nhà tuyển dụng",
          field: "name",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "email",
          required: true,
          label: "Email đăng ký",
          field: "email",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "date",
          required: true,
          label: "Ngày đăng ký",
          field: "date",
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
          1: đã duyệt
          2: đang chờ
        }
      */
      rowDataRecruiterAccount: [
        {
          name: "yonnon1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quae eaque voluptatum at tempora explicabo cupiditate voluptate illo odio suscipit delectus provident sequi eligendi aliquid voluptates fugit repudiandae, similique dolor?",
          email:
            "ayonnon@gmail.com Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quae eaque voluptatum at tempora explicabo cupiditate voluptate illo odio suscipit delectus provident sequi eligendi aliquid voluptates fugit repudiandae, similique dolor?",
          date: "22-10-2001",
          state: "đang chờ",
        },
        {
          name: "yonnon2",
          email: "byonnon@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
        },
        {
          name: "yonnon3",
          email: "cyonnon@gmail.com",
          date: "22-10-2004",
          state: "đã duyệt",
        },
        {
          name: "yonnon4",
          email: "dyonnon@gmail.com",
          date: "22-10-2004",
          state: "đã hủy",
        },
        {
          name: "yonnon5",
          email: "dawdawyonnon@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
        },
        {
          name: "yonnon6",
          email: "byfawfwaonnon@gmail.com",
          date: "22-10-2004",
          state: "đã duyệt",
        },
        {
          name: "yonnon7",
          email: "byofafannon@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
        },
        {
          name: "yonnon8",
          email: "byonwdnon@gmail.com",
          date: "22-10-2004",
          state: "đã hủy",
        },
        {
          name: "yonnon9",
          email: "byonnfawfawon@gmail.com",
          date: "22-10-2004",
          state: "đã duyệt",
        },
        {
          name: "yonnon10",
          email: "byonnofda awfawn@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
        },
        {
          name: "yonnon11",
          email: "byonnofawfawn@gmail.com",
          date: "22-10-2004",
          state: "đã hủy",
        },
        {
          name: "yonnon12",
          email: "byofawnnon@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
        },
        {
          name: "yonnon13",
          email: "byonfawnon@gmail.com",
          date: "22-10-2004",
          state: "đang chờ",
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

    acceptAll() {
      if (
        !this.listSelectRecruiterAccount ||
        this.listSelectRecruiterAccount.length === 0
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

    checkDenyOne(name, email) {
      this.dialogDenyOne = true;
      this.oneAccountSelectName = name;
      this.oneAccountSelectEmail = email;
    },

    checkResetOne(id, name, email) {
      this.dialogResetOne = true;
      this.oneAccountSelectId = id;
      this.oneAccountSelectName = name;
      this.oneAccountSelectEmail = email;
    },

    checkDenyAll() {
      if (
        !this.listSelectRecruiterAccount ||
        this.listSelectRecruiterAccount.length === 0
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

    /* get all tai khoan ung tuyen vien */
    async getAllData() {
      const url = "api/user";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data.filter((e) => {
              console.log(e);
              if (e.loaitaikhoan === "recruiter") {
                return e;
              }
            });
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    /* reset passwork */
    async resetPasswork(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      const url = "api/user/forgot-password/" + id + "/reset";
      const data = {
        password: "123456",
      };

      try {
        api.post(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.resetOne = true;
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          if (this.resultImplement.resetOne) {
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
  },
});
