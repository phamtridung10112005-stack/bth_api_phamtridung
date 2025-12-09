import { z } from "zod";

export const phanCongSchema = z.object({
  MACT: z.string({ required_error: "Mã công trình là bắt buộc" }).max(10),
  MANV: z.string({ required_error: "Mã nhân viên là bắt buộc" }).max(10),
  SLNGAYCONG: z.number().int().min(1, "Số ngày công phải lớn hơn 0").default(0)
});

export function validatePhanCong(data) {
  return phanCongSchema.parse(data);
}