import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify, Dialog } from "quasar";

export const useStoreViecLamCuaToi = defineStore("storeViecLamCuaToi", {
  state: () => {
    return {
      listData: [],
      listDataDonUngTuyen: [],
      tab: ref("Tất cả"),
    };
  },
  getters: {},
  actions: {
    _init() {},
    async getAllDonUngTuyenByUngTuyenVienId(id) {
      const url = "api/donungtuyen/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listDataDonUngTuyen = res.data;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },
  },
});
