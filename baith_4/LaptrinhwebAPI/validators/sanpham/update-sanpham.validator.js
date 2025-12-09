import { z } from "zod";

export const updateSanPhamSchema = z.object({
  Ten: z.string().max(50).optional(),
  DonGia: z.number().min(0).optional(),
  MaDanhMuc: z.number().int().optional()
});

export function validateUpdateSanPham(data) {
  return updateSanPhamSchema.parse(data);
}