import { nhanVienService } from "../services/nhanvien.service.js";
import { validateCreateNhanVien, validateUpdateNhanVien } from "../validators/nhanvien/nhanvien.validator.js";
export const NhanVienController = {
  // Req 1: GET /api/nhanvien
  getAll: async (req, res) => {
    try {
      const result = await nhanVienService.getAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Req 2: GET /api/nhanvien/{manv}
  getById: async (req, res) => {
    try {
      const result = await nhanVienService.getById(req.params.manv);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  // Req 3: POST /api/nhanvien
  create: async (req, res) => {
    try {
      const validatedData = validateCreateNhanVien(req.body);
      await nhanVienService.create(validatedData);
      res.status(201).json({ message: "Thêm nhân viên thành công" });
    } catch (err) {
      if (err.issues) return res.status(400).json({ message: "Dữ liệu lỗi", errors: err.issues });
      res.status(500).json({ message: err.message });
    }
  },

  // Req 4: PUT /api/nhanvien/{manv}
  update: async (req, res) => {
    try {
      const validatedData = validateUpdateNhanVien(req.body);
      await nhanVienService.update(req.params.manv, validatedData);
      res.json({ message: "Cập nhật nhân viên thành công" });
    } catch (err) {
      if (err.issues) return res.status(400).json({ message: "Dữ liệu lỗi", errors: err.issues });
      res.status(500).json({ message: err.message });
    }
  },

  // Req 5: DELETE /api/nhanvien/{manv}
  delete: async (req, res) => {
    try {
      await nhanVienService.delete(req.params.manv);
      res.json({ message: "Xóa nhân viên thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Req 7: GET /api/phongban/{mapb}/nhanvien
  getByPhongBan: async (req, res) => {
    try {
      const result = await nhanVienService.getByPhongBan(req.params.mapb);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};