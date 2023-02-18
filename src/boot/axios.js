import { boot } from "quasar/wrappers";
import axios from "axios";
import { useStoreAuthentication } from "src/stores/storeAuthentication";
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
    return request;
  });

  api.interceptors.response.use(async (response) => {
    // if (response.data.code === 401) {
    //   return await api
    //     .post("/auth/refreshToken")
    //     .then((re) => {
    //       if (re.data === 1) {
    //         return router.push("/");
    //       } else {
    //         return router.push("/");
    //       }
    //     })
    //     .catch((err) => {
    //       return router.push("/asl");
    //     });
    // }

    return response;
  });

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
