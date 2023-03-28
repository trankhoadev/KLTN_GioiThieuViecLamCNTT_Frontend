import { boot } from "quasar/wrappers";
import axios from "axios";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
import { Dialog } from "quasar";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: "http://172.16.55.111:3000/" });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  api.defaults.headers["token_bombom"] = useStoreAuthentication().accessToken;

  api.interceptors.request.use((request) => {
    api.defaults.headers["token_bombom"] = localStorage.getItem("accessToken");
    return request;
  });

  api.interceptors.response.use(async (response) => {
    async (response) => {
      return response;
    },
      async (error) => {
        let originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          let url = "/auth/create-token";
          return api
            .post(url, { reToken: localStorage.getItem("refreshToken") })
            .then(async (re) => {
              if (re.status === 200) {
                originalRequest._retry = true;
                localStorage.setItem("accessToken", re.data.data.accessToken);
                api.defaults.headers["token_bombom"] =
                  localStorage.getItem("accessToken");
                originalRequest.headers["token_bombom"] =
                  localStorage.getItem("accessToken");
                return api(originalRequest);
              }

              useStoreAuthentication.$reset();
              localStorage.clear();
              Dialog.create({
                title: "Thông báo",
                message: "Bạn đã hết phiên đăng nhập, Vui lòng đăng nhập lại!",
                persistent: true,
              }).onOk(() => {
                return window.location.reload();
              });
            })
            .catch((err) => {
              useStoreAuthentication.$reset();
              localStorage.clear();
              Dialog.create({
                title: "Thông báo",
                message: "Bạn đã hết phiên đăng nhập, Vui lòng đăng nhập lại!",
                persistent: true,
              }).onOk(() => {
                return window.location.reload();
              });
            });
        }
      };
  });

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
