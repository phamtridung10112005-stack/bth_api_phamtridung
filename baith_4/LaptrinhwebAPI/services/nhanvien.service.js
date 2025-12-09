import { nhanVienRepository } from "../repositories/nhanvien.repository.js";
// Đường dẫn đúng: Lùi ra 1 cấp (..) rồi vào dtos (không có thư mục con nhanvien)
import { NhanVienDTO } from "../dtos/nhanvien.dto.js";
export const nhanVienService = {
  getAll: async () => {
    const list = await nhanVienRepository.getAll();
    return list.map(item => new NhanVienDTO(item));
  },

  getById: async (manv) => {
    const nv = await nhanVienRepository.getById(manv);
    if (!nv) throw new Error("Nhân viên không tồn tại");
    return new NhanVienDTO(nv);
  },

  getByPhongBan: async (mapb) => {
    const list = await nhanVienRepository.getByPhongBan(mapb);
    return list.map(item => new NhanVienDTO(item));
  },

  create: async (data) => {
    return await nhanVienRepository.create(data);
  },

  update: async (manv, data) => {
    // Kiểm tra tồn tại trước khi update nếu cần
    const exists = await nhanVienRepository.getById(manv);
    if (!exists) throw new Error("Nhân viên không tồn tại để cập nhật");
    return await nhanVienRepository.update(manv, data);
  },

  delete: async (manv) => {
    const exists = await nhanVienRepository.getById(manv);
    if (!exists) throw new Error("Nhân viên không tồn tại để xóa");
    return await nhanVienRepository.delete(manv);
  }
};