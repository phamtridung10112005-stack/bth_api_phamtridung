import { z } from "zod";

export const createSanPhamSchema = z.object({
  Ma: z.string({ required_error: "Mã sản phẩm là bắt buộc" }).max(30),
  Ten: z.string({ required_error: "Tên sản phẩm là bắt buộc" }).max(50),
  DonGia: z.number().min(0, "Đơn giá phải lớn hơn hoặc bằng 0").optional(),
  MaDanhMuc: z.number({ required_error: "Mã danh mục là bắt buộc" }).int()
});

export function validateCreateSanPham(data) {
return createSanPhamSchema.parse(data);
}