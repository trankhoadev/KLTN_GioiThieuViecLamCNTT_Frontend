import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Dialog, Loading, Notify } from "quasar";
import { reactive, ref } from "vue";

export const useStoreAuthentication = defineStore("storeAuthentication", {
  state: () => {
    return {
      idUser: "",
      loaiTaiKhoan: localStorage.getItem("loaiTaiKhoan"),
      idUngTuyenVien: localStorage.getItem("idUngTuyenVien"),
      isPwd: false,
      isAdmin: false,
      isLogin: false,
      email: "",
      userName: "",
      password: "",
      rePassword: "",
      picture: localStorage.getItem("picture"),
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
      result: reactive({
        resultAutoCreateId: false,
      }),
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
        // try {
        //   const data = {
        //     username: this.userName,
        //     email: this.email,
        //     password: this.password,
        //     loaitaikhoan: this.roleSelected.value,
        //   };
        //   api.post("api/user/", data).then((res) => {
        //     if (res) {
        //       this.idUser = res.data._id;
        //       setTimeout(() => {
        //         Loading.hide();
        //         this.dialogOtp = true;
        //       }, 1500);
        //     }
        //   });
        // } catch (error) {
        //   console.log("Internal server error: ", error);
        // }
        setTimeout(() => {
          Loading.hide();
          this.dialogOtp = true;
        }, 1500);
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
            this.idUser = res.data.userId;
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
      try {
        api.post(url, data).then((res) => {
          console.log(res.data);
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
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Tạo tài khoản thất bại.",
        });
        console.log("Internal server error: ", error);
      }
    },

    async checkExistUngTuyenVien() {
      let url = "api/ungtuyenvien";
      const id = localStorage.getItem("id");
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            res.data.map((e) => {
              if (id === e.taikhoan._id) {
                localStorage.setItem("idUngTuyenVien", e._id);
                this.result.resultAutoCreateId = true;
                return;
              }
            });
            // for (let i = 0; i < res.data.length; ++i) {
            //   if (id === res.data[i].taikhoan._id) {
            //     console.log("tim thay");
            //     localStorage.setItem("idUngTuyenVien", res.data[i]._id);
            //     this.result.resultAutoCreateId = true;
            //   }
            // }
          }
          if (this.result.resultAutoCreateId === false) {
            localStorage.setItem("idUngTuyenVien", "");
            return;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async checkCreateUngTuyenVien() {
      // const idUtv = localStorage.getItem("idUngTuyenVien");
      // if (idUtv) {
      //   const url = "api/ungtuyenvien/" + "6456ce4af5a24023cf1d65ad";
      //   api.get(url).then((res) => {
      //     if (res.data) {
      //       console.log("hello");
      //       return;
      //     }
      //     localStorage.setItem("idUngTuyenVien", "");
      //   });
      // }
      // this.checkExistUngTuyenVien();
      // return;
      let loaiTaiKhoan = localStorage.getItem("loaiTaiKhoan");
      if (loaiTaiKhoan === "user") {
        await this.checkExistUngTuyenVien();
        if (this.result.resultAutoCreateId === false) {
          try {
            let url = "api/ungtuyenvien";
            const data = {
              hovaten: localStorage.getItem("userName"),
              anhdaidien: localStorage.getItem("picture"),
              sdt: "",
              gioithieubanthan: "",
              ngaysinh: "",
              diachi: "",
              email: localStorage.getItem("email"),
              chucvu: "",
              tencty: "",
              tungayKinhNghiemLV: "",
              denngayKinhNghiemLV: "",
              motachitietKinhNghiemLV: "",
              kiNang: "",
              tenNganhHoc: "",
              tenTruongHoc: "",
              tungayHocVan: "",
              denngayHocVan: "",
              motachitietHocVan: "",
              tenchungchi: "",
              tochuc: "",
              motachitietChungChi: "",
              ngaycap: "",
              ngayhethan: "",
              tenGiaiThuong: "",
              tochucGiaiThuong: "",
              thang: "",
              nam: "",
              motachitietGiaiThuong: "",
            };
            api.post(url, data).then((res) => {
              if (res.data) {
                // console.log("tao acc ne");
                // console.log(res.data);
                localStorage.setItem("idUngTuyenVien", res.data._id);
                return;
              }
            });
          } catch (err) {
            console.log("Internal Server Error: ", err);
          }
        }
      }
    },
  },
});
