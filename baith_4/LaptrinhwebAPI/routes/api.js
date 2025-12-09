import { Router } from "express";
import { DanhMucController } from "../controllers/danhmuc.controller.js";
import { SanPhamController } from "../controllers/sanpham.controller.js";

import { NhanVienController } from "../controllers/nhanvien.controller.js";
import { PhongBanController } from "../controllers/phongban.controller.js";
import { CongTrinhController } from "../controllers/congtrinh.controller.js";
const router = Router();
// ==========================================

// Req 3: Lấy danh sách danh mục
router.get("/danhmuc", DanhMucController.getAll);

// Req 4: Sản phẩm theo danh mục
router.get("/danhmuc/:maDanhMuc/sanpham", SanPhamController.getByDanhMuc);

// Req 10: Thống kê
router.get("/thongke/sanpham-danhmuc", SanPhamController.getStats);

// Req 8: Tìm kiếm (Đặt trước route :ma)
router.get("/sanpham/timkiem", SanPhamController.search);

// Req 1: Lấy tất cả (Route riêng biệt)
router.get("/sanpham/all", SanPhamController.getAll);

// // Req 9: Phân trang & Sắp xếp (Route gốc)
router.get("/sanpham", SanPhamController.getPaging);

// Req 2: Chi tiết
router.get("/sanpham/:ma", SanPhamController.getById);

// Req 5: Thêm mới
router.post("/sanpham", SanPhamController.create);

// Req 6: Cập nhật
router.put("/sanpham/:ma", SanPhamController.update);

// Req 7: Xóa
router.delete("/sanpham/:ma", SanPhamController.delete);






// ==========================================
// QUẢN LÝ NHÂN VIÊN (Req 1, 2, 3, 4, 5)
// ==========================================

// Req 1: Lấy danh sách nhân viên
router.get("/nhanvien", NhanVienController.getAll);

// Req 2: Lấy thông tin chi tiết nhân viên
router.get("/nhanvien/:manv", NhanVienController.getById);

// Req 3: Thêm mới nhân viên
router.post("/nhanvien", NhanVienController.create);

// Req 4: Cập nhật thông tin nhân viên
router.put("/nhanvien/:manv", NhanVienController.update);

// Req 5: Xóa nhân viên
router.delete("/nhanvien/:manv", NhanVienController.delete);


// ==========================================
// QUẢN LÝ PHÒNG BAN (Req 6, 7)
// ==========================================

// Req 6: Lấy danh sách phòng ban
router.get("/phongban", PhongBanController.getAll);

// Req 7: Lấy nhân viên theo phòng ban
// (Logic lấy nhân viên nằm trong NhanVienController nhưng route bắt đầu bằng /phongban)
router.get("/phongban/:mapb/nhanvien", NhanVienController.getByPhongBan);


// ==========================================
// CÔNG TRÌNH & CHẤM CÔNG (Req 8, 9, 10)
// ==========================================

// Req 8: Lấy danh sách công trình
router.get("/congtrinh", CongTrinhController.getAll);

// Req 9: Phân công nhân viên tham gia công trình
router.post("/cong", CongTrinhController.assignWork);

// Req 10: Thống kê số ngày công của nhân viên
router.get("/thongke/nhanvien/:manv/ngaycong", CongTrinhController.getStats);


export default router;

