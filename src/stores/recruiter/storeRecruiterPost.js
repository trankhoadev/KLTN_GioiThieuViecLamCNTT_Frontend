import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Loading, Notify } from "quasar";

export const useStoreRecruiterPost = defineStore("storeRecruiterPost", {
  state: () => {
    return {
      filter: "",
      listData: [],
      listOnePost: ref[""],
      dialogDenyOne: ref(false),
      isSeeDetail: ref(false),
      seeDetailSelect: "",
      getDataSuccessfully: false,
      listSelectRecruiter: ref(),
      tinTuyenDung: 0,
      tinTuyenDungDangCho: 0,
      tinTuyenDungDangTuyen: 0,
      tinTuyenDungDungTuyen: 0,
      tinTuyenDungTuChoi: 0,
      onePostSelectTitle: "",
      onePostSelectDateCreated: "",
      dialogViewPost: false,
      resultExecuted: reactive({
        resultPostById: false,
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
          name: "tieude",
          required: true,
          label: "Tin tuyển dụng",
          field: "tieude",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "profile",
          required: true,
          label: "Hồ sơ",
          field: "profile",
          align: "left",
          sortable: true,
          headerStyle: "font-size: 1.1em; font-weight: bold",
        },

        {
          name: "trangthai",
          required: true,
          label: "Trạng thái",
          field: "trangthai",
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

    async seeDetail(data) {
      this.isSeeDetail = true;
      this.seeDetailSelect = data;
      await this.getPostById(data);
    },

    checkDenyOne(title, dateCreated) {
      this.onePostSelectTitle = title;
      this.onePostSelectDateCreated = dateCreated;
      this.dialogDenyOne = true;
    },

    getAllPost(id) {
      const url = "api/tintuyendung/nhatuyendung/" + id;
      try {
        api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data;
            this.getDataSuccessfully = true;
          }
        });
      } catch (error) {
        console.log("Internal Server Error: ", error);
      } finally {
      }
    },

    async getPostById(id) {
      const url = "api/tintuyendung/" + id;
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listOnePost = res.data;
            this.resultExecuted.resultPostById = true;
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      } finally {
        if (this.resultExecuted.resultPostById) {
          this.dialogViewPost = true;
        }
      }
    },
  },
});
