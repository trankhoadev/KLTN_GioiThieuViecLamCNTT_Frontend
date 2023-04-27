import { defineStore } from "pinia";

export const useStoreRegex = defineStore("storeRegex", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    isValidEmail(data) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(data) || false;
    },
    formatDate(dateSave, dateValue) {
      try {
        let date = new Date(dateValue);
        dateSave = [
          date.getDate(),
          date.getMonth() + 1,
          date.getFullYear(),
        ].join("-");
      } catch (error) {
        console.log("Have error when format date value: ", error);
      }
    },
  },
});
