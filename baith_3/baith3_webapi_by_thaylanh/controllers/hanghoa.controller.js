import { hanghoaService } from "../services/hanghoa.services.js"; 
import { logger } from "../config/logger.js";

export const HangHoaController = {
  // --- 1. CÁC HÀM CŨ (Đọc dữ liệu cơ bản) ---
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /HangHoas");
      const result = await hanghoaService.getAllhanghoas();
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaLoai: async (req, res) => {
    const MaLoai = req.params.MaLoai;
    logger.info(`Controller: GET /HangHoas/${MaLoai}`);
    try {
      const result = await hanghoaService.gethanghoaByMaLoai(MaLoai);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${MaLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  getByTenLoai: async (req, res) => {
    const TenLoai = req.params.TenLoai;
    logger.info(`Controller: GET /HangHoas/tenloai/${TenLoai}`);
    try {
      const result = await hanghoaService.gethanghoaByTenLoai(TenLoai);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: getByTenLoai failed (${TenLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  getLessOrEqualFive: async (req, res) => {
    try {
      logger.info("Controller: GET /HangHoas/lessorequalfive");
      const result = await hanghoaService.getLessOrEqualFive();
      res.json(result);
    } catch (err) {
      logger.error("Controller Error: getLessOrEqualFive failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  // --- 2. CÁC HÀM XỬ LÝ GIÁ (Đã cập nhật theo bảng GiaBan) ---

  // Get giá hiện tại
  getCurrentPrice: async (req, res) => {
    try {
      const result = await hanghoaService.getCurrentPrice(req.params.MaHang);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Filter theo khoảng giá
  getByPriceRange: async (req, res) => {
    try {
      const { min, max } = req.query;
      const result = await hanghoaService.getByPriceRange(min, max);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Lịch sử giá
  getPriceHistory: async (req, res) => {
    try {
      const result = await hanghoaService.getPriceHistory(req.params.MaHang);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Thêm giá
  addPrice: async (req, res) => {
    try {
      await hanghoaService.addPrice(req.body);
      res.status(201).json({ message: "Thêm giá thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Sửa giá (Dùng NgayBD thay vì NgayApDung)
  updatePrice: async (req, res) => {
    try {
      const { MaHang } = req.params;
      const { NgayBD, Gia } = req.body; // Cập nhật tham số đúng với bảng GiaBan
      await hanghoaService.updatePrice(MaHang, NgayBD, Gia);
      res.json({ message: "Cập nhật giá thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Xóa giá (Dùng NgayBD)
  deletePrice: async (req, res) => {
    try {
      const { MaHang } = req.params;
      const { NgayBD } = req.body;
      await hanghoaService.deletePrice(MaHang, NgayBD);
      res.json({ message: "Xóa giá thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get Chi tiết HangHoa + Giá hiện tại
  getDetailWithPrice: async (req, res) => {
    try {
      const result = await hanghoaService.getDetailWithPrice(req.params.MaHang);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  // --- 3. CÁC HÀM CRUD HÀNG HÓA (Create, Update, Delete) ---

  create: async (req, res) => {
    try {
      await hanghoaService.createHangHoa(req.body);
      res.status(201).json({ message: "Tạo hàng hóa thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Đây chính là hàm bị thiếu gây lỗi "argument handler must be a function"
  update: async (req, res) => {
    try {
      await hanghoaService.updateHangHoa(req.params.MaHang, req.body);
      res.json({ message: "Update hàng hóa thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await hanghoaService.deleteHangHoa(req.params.MaHang);
      res.json({ message: "Xóa hàng hóa thành công" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

};