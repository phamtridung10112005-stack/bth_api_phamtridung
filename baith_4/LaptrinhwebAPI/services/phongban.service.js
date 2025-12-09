import { phongBanRepository } from "../repositories/phongban.repository.js";
import { PhongBanDTO } from "../dtos/phongban.dto.js";

export const phongBanService = {
  getAll: async () => {
    const list = await phongBanRepository.getAll();
    return list.map(item => new PhongBanDTO(item));
  }
};