import { defineStore } from "pinia";
import { exportFile } from "quasar";
export const useMyStore = defineStore("myStore", {
  state: () => ({
    optionSalary: [
      {
        value: "0",
        label: "Dưới 3 triệu",
      },

      {
        value: "1",
        label: "3 - 5 triệu",
      },

      {
        value: "2",
        label: "5 - 7 triệu",
      },

      {
        value: "3",
        label: "7 - 10 triệu",
      },

      {
        value: "4",
        label: "10 - 12 triệu",
      },

      {
        value: "5",
        label: "12 - 15 triệu",
      },

      {
        value: "6",
        label: "15 - 20 triệu",
      },

      {
        value: "7",
        label: "20 - 25 triệu",
      },

      {
        value: "8",
        label: "25 - 30 triệu",
      },

      {
        value: "9",
        label: "trên 30 triệu",
      },

      {
        value: "10",
        label: "thỏa thuận",
      },
    ],

    optionPosition: [
      { value: "0", label: "Nhân viên" },
      { value: "1", label: "Trưởng nhóm" },
      { value: "2", label: "Trưởng/Phó phòng" },
      { value: "3", label: "Quản lý / Giám sát" },
      { value: "4", label: "Trưởng chi nhánh" },
      { value: "5", label: "Phó giám đốc" },
      { value: "6", label: "Giám đốc" },
      { value: "7", label: "Phó giám đốc" },
      { value: "8", label: "Thực tập sinh" },
    ],

    optionCareer: [
      {
        value: "0",
        label: "Design/Development",
      },
      {
        value: "1",
        label: "Marketing/Advertising",
      },
      {
        value: "2",
        label: "Bán lẻ - Hàng tiêu dùng - FMCG",
      },
      {
        value: "3",
        label: "Bảo hiểm",
      },
      {
        value: "4",
        label: "Bảo trì / Sửa chữa",
      },
      {
        value: "5",
        label: "Bất động sản",
      },
      {
        value: "6",
        label: "Chứng khoán",
      },
      {
        value: "7",
        label: "Cơ khí",
      },
      {
        value: "8",
        label: "Cơ quan nhà nước",
      },
      {
        value: "9",
        label: "Du lịch",
      },
      {
        value: "10",
        label: "Dược phẩm / Y tế / Công nghệ sinh học",
      },
      {
        value: "11",
        label: "Điện tử / Điện lạnh",
      },
      {
        value: "12",
        label: "Giải trí",
      },
      {
        value: "13",
        label: "Giáo dục / Đào tạo",
      },
      {
        value: "14",
        label: "In ấn / Xuất bản",
      },
      {
        value: "15",
        label: "Internet / Online",
      },
      {
        value: "16",
        label: "IT - Phần cứng",
      },
      {
        value: "17",
        label: "IT - Phần mềm",
      },
      {
        value: "18",
        label: "Kế toán / Kiểm toán",
      },
      {
        value: "19",
        label: "Logistics - Vận tải",
      },
      {
        value: "20",
        label: "Luật",
      },
      {
        value: "21",
        label: "Marketing / Truyền thông / Quảng cáo",
      },
      {
        value: "22",
        label: "Môi trường",
      },
      {
        value: "23",
        label: "Năng lượng",
      },
      {
        value: "24",
        label: "Ngân hàng",
      },
      {
        value: "25",
        label: "Nhà hàng / Khách sạn",
      },
      {
        value: "26",
        label: "Nhân sự",
      },
      {
        value: "27",
        label: "Nông lâm ngư nghiệp",
      },
      {
        value: "28",
        label: "Sản xuất",
      },
      {
        value: "29",
        label: "Tài chính",
      },
      {
        value: "30",
        label: "Thiết kế / Kiến trúc",
      },
      {
        value: "31",
        label: "Thời trang",
      },
      {
        value: "32",
        label: "Thương mại điện tử",
      },
      {
        value: "33",
        label: "Tổ chức phi lợi nhuận",
      },
      {
        value: "34",
        label: "Tự động hóa",
      },
      {
        value: "35",
        label: "Tư vấn",
      },
      {
        value: "36",
        label: "Viễn thông",
      },
      {
        value: "37",
        label: "Xây dựng",
      },
      {
        value: "38",
        label: "Xuất nhập khẩu",
      },
      {
        value: "39",
        label: "Khác",
      },
    ],
  }),
  actions: {
    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      return `"${formatted}"`;
    },

    exportTable(col, row) {
      let columns = col;
      let rows = row;
      const content = [columns.map((col) => this.wrapCsvValue(col.label))]
        .concat(
          rows.map((row) =>
            columns
              .map((col) =>
                this.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        "table-export.csv",
        "\ufeff" + content,
        "text/csv"
      );

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
});
