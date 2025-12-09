import { phongBanService } from "../services/phongban.service.js";

export const PhongBanController = {
  // Req 6: GET /api/phongban
  getAll: async (req, res) => {
    try {
      const result = await phongBanService.getAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};