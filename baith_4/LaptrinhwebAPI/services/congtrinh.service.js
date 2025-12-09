import { congTrinhRepository } from "../repositories/congtrinh.repository.js";
import { CongTrinhDTO } from "../dtos/congtrinh.dto.js";

export const congTrinhService = {
  getAll: async () => {
    const list = await congTrinhRepository.getAll();
    return list.map(item => new CongTrinhDTO(item));
  },

  assignWork: async (data) => {
    return await congTrinhRepository.assignWork(data);
  },

  getWorkStats: async (manv) => {
    const stats = await congTrinhRepository.getWorkStats(manv);
    // Nếu chưa làm công nào thì trả về 0
    return {
        MaNV: manv,
        TongNgayCong: stats ? parseInt(stats.TongNgayCong) : 0
    };
  }
};