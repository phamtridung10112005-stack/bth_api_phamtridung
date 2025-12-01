import { nhanvienService } from "../services/nhanvien.service.js";

export const NhanVienController = {
  getAll: async (req, res) => {
    try {
      const list = await nhanvienService.getAll();
      res.json(list);
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  getById: async (req, res) => {
    try {
      const nv = await nhanvienService.getById(req.params.MANV);
      res.json(nv);
    } catch (err) { res.status(404).json({ message: err.message }); }
  },

  create: async (req, res) => {
    try {
      await nhanvienService.create(req.body);
      res.status(201).json({ message: "Thêm nhân viên thành công" });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  update: async (req, res) => {
    try {
      await nhanvienService.update(req.params.MANV, req.body);
      res.json({ message: "Cập nhật nhân viên thành công" });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  delete: async (req, res) => {
    try {
      await nhanvienService.delete(req.params.MANV);
      res.json({ message: "Xóa nhân viên thành công" });
    } catch (err) { res.status(500).json({ message: err.message }); }
  }
};