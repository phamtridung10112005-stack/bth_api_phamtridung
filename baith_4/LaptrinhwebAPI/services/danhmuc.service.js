import { danhmucRepository } from "../repositories/danhmuc.repository.js";

export const danhmucService = {
  getAll: async () => {
    return await danhmucRepository.getAll();
  }
};