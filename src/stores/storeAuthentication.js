import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useStoreAuthentication = defineStore("storeAuthentication", {
  state: () => {
    return {
      isPwd: false,
      isAdmin: false,
      email: "",
      userName: "",
      password: "",
      rePassword: "",
      picture: "",
      accessToken: null,
      isLoadingLogin: false,
      isDark: false,
      isDataUserAvailable: false,
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
      try {
        this.isLoadingLogin = true;
        await api
          .post("api/user/login", { email: email, password: pass })
          .then((res) => {
            if (res.status == 200) {
              api.defaults.headers["Bearer"] = res.data.token; //set Bearer cho headers
              this.accessToken = res.data.token;
              localStorage.setItem("id", res.data._id);
              localStorage.setItem("userName", res.data.username);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("loaiTaiKhoan", res.data.loaitaikhoan);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("picture", res.data.pic);
              localStorage.setItem("accessToken", res.data.token);
              this.router.push("/");
              this.userName = res.data.username;
              this.password = "";
              this.isLoadingLogin = false;
              Notify.create({
                message: "Đăng nhập thành công",
                position: "bottom",
                timeout: 2000,
                color: "green",
                icon: "mood",
              });
            } else {
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
        if (err) throw err;
        this.isLoadingLogin = false;
        Notify.create({
          message: "Đăng nhập thất bại",
          timeout: 2000,
          position: "bottom",
          color: "negative",
          icon: "mood_bad",
        });
      }
    },

    logOut() {
      if (api.defaults.headers.Bearer) {
        localStorage.clear();
        api.post("auth/logout").then((result) => {
          if (result.data) {
            api.defaults.headers.Bearer = null;
            // localStorage.clear();
            sessionStorage.clear();
            this.router.push("/");
            window.location.reload();
          }
        });
      } else {
        this.router.push("/");
      }
    },

    // getData() {
    //   const url = 'api/user/:email'
    //   api.get(url, {email: 'yonnon2210@gmail.com'})
    //     .then(data => {
    //       if(data) {
    //         console.log(data);
    //       }
    //     })
    // }
  },
});
