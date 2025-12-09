import { sanphamService } from "../services/sanpham.service.js";
import { validateCreateSanPham } from "../validators/sanpham/create-sanpham.validator.js";
import { validateUpdateSanPham } from "../validators/sanpham/update-sanpham.validator.js";

export const SanPhamController = {
  // Req 1: Lấy tất cả
  getAll: async (req, res) => {
    try {
      const result = await sanphamService.getAllNoPaging();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Req 9: Phân trang


  getPaging: async (req, res) => {
    try {
      const result = await sanphamService.getPagingAndSort(req.query);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const result = await sanphamService.getById(req.params.ma);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  getByDanhMuc: async (req, res) => {
    try {
      const result = await sanphamService.getByDanhMuc(req.params.maDanhMuc);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Thêm mới (Có Validate)
  create: async (req, res) => {
    try {
      const validatedData = validateCreateSanPham(req.body);
      await sanphamService.create(validatedData);
      res.status(201).json({ message: "Thêm sản phẩm thành công" });
    } catch (err) {
      if (err.issues) return res.status(400).json({ message: "Dữ liệu lỗi", errors: err.issues });
      res.status(500).json({ message: err.message });
    }
  },

  // Cập nhật (Có Validate)
  update: async (req, res) => {
    try {
      const validatedData = validateUpdateSanPham(req.body);
      await sanphamService.update(req.params.ma, validatedData);
      res.json({ message: "Cập nhật sản phẩm thành công" });
    } catch (err) {
      if (err.issues) return res.status(400).json({ message: "Dữ liệu lỗi", errors: err.issues });
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await sanphamService.delete(req.params.ma);
      res.json({ message: "Xóa sản phẩm thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  search: async (req, res) => {
    try {
      const { ten } = req.query;
      const result = await sanphamService.search(ten);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getStats: async (req, res) => {
    try {
      const result = await sanphamService.getStats();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};