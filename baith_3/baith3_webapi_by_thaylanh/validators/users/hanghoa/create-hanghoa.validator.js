import { z } from "zod";

export const createHangHoaSchema = z.object({
  MaHang: z.string().max(30, "MAHang is required"),
  MaLoai: z.string().max(30, "MaLoai is required"),
  TenHang: z.string().max(50, "TenHang is required"),
  SoLuong: z.int() >= 0,
   SoLuongCon: z.int() >=0,
});

export function validateCreateHangHoa(data) {
  return createHangHoaSchema.parse(data);
}
