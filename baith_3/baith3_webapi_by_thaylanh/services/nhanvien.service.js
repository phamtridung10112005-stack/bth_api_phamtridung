import { nhanvienRepository } from "../repositories/nhanvien.repository.js";

export const nhanvienService = {
  getAll: async () => {
    return await nhanvienRepository.getAll();
  },

  getById: async (MANV) => {
    const nv = await nhanvienRepository.getById(MANV);
    if (!nv) throw new Error("Không tìm thấy nhân viên");
    return nv;
  },

  create: async (data) => {
    return await nhanvienRepository.create(data);
  },

  update: async (MANV, data) => {
    return await nhanvienRepository.update(MANV, data);
  },

  delete: async (MANV) => {
    return await nhanvienRepository.delete(MANV);
  }
};