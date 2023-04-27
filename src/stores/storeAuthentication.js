import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Dialog, Loading, Notify } from "quasar";
import { ref } from "vue";

export const useStoreAuthentication = defineStore("storeAuthentication", {
  state: () => {
    return {
      idUser: "",
      isPwd: false,
      isAdmin: false,
      isLogin: false,
      email: "",
      userName: "",
      password: "",
      rePassword: "",
      picture: "",
      accessToken: null,
      isLoadingLogin: false,
      isDark: false,
      isDataUserAvailable: false,
      accept: ref(false),
      dialogOtp: ref(false),
      count: 0,
      otp: "",
      listRole: [
        { label: "Ứng tuyển viên", value: "user" },
        { label: "Nhà tuyển dụng", value: "recruiter" },
      ],
      roleSelected: "",
    };
  },
  // lưu lại các state sau, có load lại cũng không bị mất
  persist: {
    storage: localStorage,
    paths: ["userName", "accessToken", "isAdmin"],
  },
  getters: {},
  actions: {
    _init() {
      this.userName = "";
      this.password = "";
    },
    async login(email, pass) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      try {
        this.isLoadingLogin = true;
        await api
          .post("api/user/login", { email: email, password: pass })
          .then((res) => {
            if (res.status == 200) {
              api.defaults.headers["Bearer"] = res.data.token; //set Bearer cho headers
              localStorage.setItem("id", res.data._id);
              localStorage.setItem("userName", res.data.username);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("loaiTaiKhoan", res.data.loaitaikhoan);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("picture", res.data.pic);
              localStorage.setItem("accessToken", res.data.token);

              Notify.create({
                message: "Đăng nhập thành công",
                position: "bottom",
                timeout: 2000,
                color: "green",
                icon: "mood",
              });
              if (res.data.loaitaikhoan === "user") {
                setTimeout(() => {
                  Loading.show({
                    message: "Đang chuyển trang...",
                    boxClass: "bg-grey-2 text-grey-9",
                    spinnerColor: "primary",
                  });
                  this.router.push("/");
                }, 1500);
              } else if (res.data.loaitaikhoan === "recruiter") {
                setTimeout(() => {
                  Loading.show({
                    message: "Đang chuyển trang...",
                    boxClass: "bg-grey-2 text-grey-9",
                    spinnerColor: "primary",
                  });
                  this.router.push("/recruiter/welcome");
                }, 1500);
              } else if (res.data.loaitaikhoan === "admin") {
                setTimeout(() => {
                  Loading.show({
                    message: "Đang chuyển trang...",
                    boxClass: "bg-grey-2 text-grey-9",
                    spinnerColor: "primary",
                  });
                  this.router.push("/admin/welcome");
                }, 1500);
              }
              setTimeout(() => {
                Loading.hide();
                window.location.reload();
              }, 2500);
            } else {
              Loading.hide();
              this.isLoadingLogin = false;
              Notify.create({
                message: "Đăng nhập thất bại",
                timeout: 2000,
                position: "bottom",
                color: "negative",
                icon: "mood_bad",
              });
            }
          });
      } catch (err) {
        Loading.hide();
        this.isLoadingLogin = false;
        Notify.create({
          message: "Sai tên tài khoản hoặc mật khẩu",
          timeout: 2000,
          position: "bottom",
          color: "negative",
          icon: "mood_bad",
        });
        if (err) throw err;
      }
    },

    logOut() {
      localStorage.clear();
      this.router.push("/dang-nhap");
      setTimeout(() => {
        Notify.create({
          message: "Đăng xuất thành công",
          position: "bottom",
          timeout: 2000,
          color: "green",
          icon: "mood",
        });
        window.location.reload();
      }, 500);
    },

    signUp() {
      if (this.accept !== true) {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message:
            "Bạn cần xác nhận các thông tin đã nhập là chính xác trước khi đến bước tiếp theo.",
        });
      } else {
        Loading.show({
          message: "Đang xử lí...",
          boxClass: "bg-grey-2 text-grey-9",
          spinnerColor: "primary",
        });
        try {
          const data = {
            username: this.userName,
            email: this.email,
            password: this.password,
            loaitaikhoan: this.roleSelected.value,
          };
          api.post("api/user/", data).then((res) => {
            if (res) {
              this.idUser = res.data._id;
              setTimeout(() => {
                Loading.hide();
                this.dialogOtp = true;
              }, 1500);
            }
          });
        } catch (error) {
          console.log("Internal server error: ", error);
        }
      }
    },

    getOtp() {
      try {
        const data = {
          username: this.userName,
          email: this.email,
          password: this.password,
          loaitaikhoan: this.roleSelected.value,
        };
        api.post("api/user/", data).then((res) => {
          if (res) {
            Notify.create({
              message: "Vui lòng kiểm tra hòm thư của bạn.",
              position: "bottom",
              timeout: 2000,
              color: "green",
              icon: "mood",
            });
          } else {
            Notify.create({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Không thể gửi mã về mail của bạn.",
            });
          }
        });
      } catch (error) {
        console.log("Internal server error: ", error);
      }
    },

    verifyOtp() {
      const url = "api/user/verify";
      const data = {
        userId: this.idUser,
        otp: this.otp,
      };
      console.log(data);
      try {
        api.post(url, data).then((res) => {
          console.log(res);
          if (res.data) {
            Notify.create({
              message: "Tạo tài khoản thành công",
              position: "bottom",
              timeout: 2000,
              color: "green",
              icon: "mood",
            });
            setTimeout(() => {
              Loading.show({
                message: "Đang chuyển trang...",
                boxClass: "bg-grey-2 text-grey-9",
                spinnerColor: "primary",
              });
              this.router.push("/dang-nhap");
            }, 1500);

            setTimeout(() => {
              Loading.hide();
              window.location.reload();
            }, 2500);
          } else {
            Notify.create({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Tạo tài khoản thất bại.",
            });
          }
        });
      } catch (error) {
        console.log("Internal server error: ", error);
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Tạo tài khoản thất bại.",
        });
      }
    },
  },
});
