import { z } from "zod";

export const createDanhMucSchema = z.object({
  MaDanhMuc: z.number().min(0, "Mã danh mục phải lớn hơn hoặc bằng 0").optional(),
  TenDanhMuc: z.string({ required_error: "Tên sản phẩm là bắt buộc" }).max(50),

});

export function validateCreateDanhMuc(data) {
return createDanhMucSchema.parse(data);
}