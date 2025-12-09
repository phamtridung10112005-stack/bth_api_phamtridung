import { z } from "zod";

// Schema chung cho Nhân Viên
export const nhanVienSchema = z.object({
  MANV: z.string({ required_error: "Mã nhân viên là bắt buộc" }).max(10),
  HOTEN: z.string({ required_error: "Họ tên là bắt buộc" }).max(50),
  NGAYSINH: z.string().optional(), // Nhận chuỗi YYYY-MM-DD
  PHAI: z.string().max(5).optional(),
  DIACHI: z.string().max(100).optional(),
  MAPB: z.string({ required_error: "Mã phòng ban là bắt buộc" }).max(10)
});

// Schema cập nhật (cho phép thiếu trường)
export const updateNhanVienSchema = nhanVienSchema.partial().omit({ MANV: true });

export function validateCreateNhanVien(data) {
  return nhanVienSchema.parse(data);
}

export function validateUpdateNhanVien(data) {
  return updateNhanVienSchema.parse(data);
}