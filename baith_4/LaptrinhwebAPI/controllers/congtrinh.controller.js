import { congTrinhService } from "../services/congtrinh.service.js";
import { validatePhanCong } from "../validators/cong/cong.validator.js";
export const CongTrinhController = {
  // Req 8: GET /api/congtrinh
  getAll: async (req, res) => {
    try {
      const result = await congTrinhService.getAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Req 9: POST /api/cong
  assignWork: async (req, res) => {
    try {
      const validatedData = validatePhanCong(req.body);
      await congTrinhService.assignWork(validatedData);
      res.status(201).json({ message: "Phân công thành công" });
    } catch (err) {
      if (err.issues) return res.status(400).json({ message: "Dữ liệu lỗi", errors: err.issues });
      res.status(500).json({ message: err.message });
    }
  },

  // Req 10: GET /api/thongke/nhanvien/{manv}/ngaycong
  getStats: async (req, res) => {
    try {
      const result = await congTrinhService.getWorkStats(req.params.manv);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};