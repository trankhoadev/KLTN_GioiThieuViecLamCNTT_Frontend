import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, reactive } from "vue";
import { Dialog, Loading, Notify } from "quasar";

export const useStoreRecruiterApplyJob = defineStore("storeRecruiterApplyJob", {
  state: () => {
    return {
      filter: "",
      listData: [],
      listSelectRecruiter: ref(),
      listSelectDonUngTuyen: ref(),
      donUngTuyen: 0,
      donUngTuyenDangCho: 0,
      donUngTuyenDaDuyet: 0,
      donUngTuyenTuChoi: 0,
      resultImplement: reactive({
        acceptOne: false,
        acceptAll: false,
        denyOne: false,
        denyAll: false,
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
          name: "hovaten",
          required: true,
          label: "Thông tin ứng viên",
          field: "hovaten",
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

    checkDenyOne(name, email) {
      this.dialogDenyOne = true;
      this.oneAccountSelectName = name;
      this.oneAccountSelectEmail = email;
    },

    async getAllDonUngTuyen() {
      const url = "api/donungtuyen/nhatuyendung/";
      try {
        await api.get(url).then((res) => {
          if (res.data) {
            this.listData = res.data.filter((e) => {
              if (
                e.tintuyendung.nhatuyendung ===
                localStorage.getItem("idNhaTuyenDung")
              ) {
                return e;
              }
            });
          }
        });
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    /* For recruiter User */
    async duyetDonTuyenDung(id) {
      Loading.show({
        message: "Đang xử lí...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      const url = "api/donungtuyen/update/";
      const data = {
        donUngTuyenId: id,
        trangthai: "đã ứng tuyển",
      };
      try {
        api.put(url, data).then((res) => {
          if (res.data) {
            this.resultImplement.acceptOne = true;
          }
        });
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

    /* For recruiter User */
    async tuChoiDonUngTuyen(id, email, title) {
      Dialog.create({
        dark: true,
        title: "Cảnh báo",
        message: "Vui lòng nhập lí do từ chối ?",
        prompt: {
          model: "",
          type: "text",
        },
        cancel: true,
      })
        .onOk(async (reason) => {
          const urlSendEmail = "api/tintuyendung/emailfeedback";
          const dataSendEmail = {
            email: email,
            content:
              'Chúng tôi xin thông báo về đơn xin ứng tuyển công việc "' +
              title +
              '"của bạn đã không được duyệt vì lí do ' +
              reason +
              ". Xin chia buồn và chúc bạn may mắn trong việc tìm kiếm những công việc khác!",
          };

          try {
            await api.post(urlSendEmail, dataSendEmail).then((res) => {
              if (res.data) {
              }
            });
          } catch (err) {
            console.log("Send email error: ", err);
          }

          Loading.show({
            message: "Đang xử lí...",
            boxClass: "bg-grey-2 text-grey-9",
            spinnerColor: "primary",
          });
          const url = "api/donungtuyen/update/";
          const data = {
            donUngTuyenId: id,
            trangthai: "đã từ chối",
          };

          try {
            api.put(url, data).then((res) => {
              if (res.data) {
                this.resultImplement.acceptOne = true;
              }
            });
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
        })
        .onCancel(() => {})
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
});
