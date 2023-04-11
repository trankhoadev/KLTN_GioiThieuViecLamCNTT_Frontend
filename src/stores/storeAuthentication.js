import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useStoreAuthentication = defineStore("storeAuthentication", {
  state: () => {
    return {
      isPwd: true,
      isAdmin: false,
      email: "",
      userName: "yonnon",
      password: "123456",
      rePassword: "",
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
      this.email = "";
      this.userName = "";
      this.password = "";
    },
    async login(user, pass) {
      try {
        this.isLoadingLogin = true;
        await api
          .post("auth/login", { userName: user, password: pass })
          .then((response) => {
            if (response.data.status == 200) {
              let data = response.data.data;
              api.defaults.headers["token_bombom"] = data.accessToken; //set token_bombom cho headers
              this.accessToken = data.accessToken;
              this.isAdmin = data.userData.accessData.accessDataStaff.isAdmin;
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("token", data.accessToken);
              this.router.push("/");
              this.password = "";
              this.isLoadingLogin = false;
            } else {
              this.isLoadingLogin = false;
              Notify.create({
                message: response.data.message,
                timeout: 2000,
                icon: "mood_bad",
                color: "negative",
                position: "top",
              });
            }
          });
      } catch (err) {
        if (err) throw err;
        this.isLoadingLogin = false;
        Notify.create({
          message: err,
          timeout: 2000,
          position: "top",
          color: "negative",
          icon: "mood_bad",
        });
      }
    },

    logOut() {
      if (api.defaults.headers.token_bombom) {
        localStorage.clear();
        api.post("auth/logout").then((result) => {
          if (result.data) {
            api.defaults.headers.token_bombom = null;
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
  },
});
