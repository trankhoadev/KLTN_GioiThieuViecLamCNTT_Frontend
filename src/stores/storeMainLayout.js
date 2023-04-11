import { defineStore } from "pinia";

export const useStoreMainLayout = defineStore("storeMainLayout", {
  state: () => {
    return {
      leftDrawerOpen: false,
      isShowingMenuAccount: false,
      isShowDropdown: false,
      active: "trang-chu",
      breadcrumd: "",
    };
  },
  getters: {},
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
