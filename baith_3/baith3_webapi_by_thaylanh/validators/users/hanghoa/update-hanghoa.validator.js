import { z } from "zod";

export const updateUserSchema = z.object({
  MaLoai: z.string().max(30).optional(),
  TenHang: z.string().max(50).optional(),
  SoLuong: z.int() >= 0,
   SoLuongCon: z.int() >=0,
});

export function validateHangHoaUser(data) {
  return updateHangHoaSchema.parse(data);
}