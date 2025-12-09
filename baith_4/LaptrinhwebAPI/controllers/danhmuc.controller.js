import { danhmucService } from "../services/danhmuc.service.js";

export const DanhMucController = {
  getAll: async (req, res) => {
    try {
      const result = await danhmucService.getAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};