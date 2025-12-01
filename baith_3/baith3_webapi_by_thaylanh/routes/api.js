import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { HangHoaController } from "../controllers/hanghoa.controller.js";
import { NhanVienController } from "../controllers/nhanvien.controller.js";
const router = Router();

// --- USER ROUTES ---
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// --- HANG HOA ROUTES ---

// 1. CÁC ROUTE LỌC/TÌM KIẾM (Đặt lên đầu để tránh xung đột)

// Yêu cầu: Get các HangHoa sắp hết ( SoLuongCon <5)
router.get("/hanghoas/loe", HangHoaController.getLessOrEqualFive);

// Yêu cầu: Get thông tin của các HangHoa có GiaBan vào thời điểm hiện tại trong khoảng GiaMin tới GiaMax
router.get("/hanghoas/filter/price", HangHoaController.getByPriceRange);

// Yêu cầu: Get các HangHoa theo TenLoai
router.get("/hanghoas/tenloai/:TenLoai", HangHoaController.getByTenLoai);


// 2. CÁC ROUTE QUẢN LÝ GIÁ BÁN (Price Management)

// Yêu cầu: Thêm sửa xóa giá bán của 1 mặt hàng (theo mã)
router.post("/giahanghoa", HangHoaController.addPrice); // Thêm giá
router.put("/giahanghoa/:MaHang", HangHoaController.updatePrice); // Sửa giá
router.delete("/giahanghoa/:MaHang", HangHoaController.deletePrice); // Xóa giá


// 3. CÁC ROUTE CHI TIẾT SẢN PHẨM VÀ GIÁ

// Yêu cầu: Lấy toàn bộ thông tin HangHoa và giá bán hiện tại (theo mã hàng)
router.get("/hanghoas/:MaHang/detail", HangHoaController.getDetailWithPrice);

// Yêu cầu: Get thông tin GiaBan của HangHoa có MaHang vào thời điểm hiện tại
router.get("/hanghoas/:MaHang/price/current", HangHoaController.getCurrentPrice);

// Yêu cầu: Lấy toàn bộ thông tin giá bán (theo mã hàng) - Lịch sử giá
router.get("/hanghoas/:MaHang/price", HangHoaController.getPriceHistory);


// 4. CÁC ROUTE CRUD CƠ BẢN VÀ THAM SỐ (Đặt cuối cùng)

router.get("/hanghoas", HangHoaController.getAll); // Lấy tất cả (Mặc định)

// Yêu cầu: Thêm sửa xóa HangHoa (theo mã hàng) - Phần THÊM
router.post("/hanghoas", HangHoaController.create);

// Yêu cầu: Get các HangHoa theo MaLoai
// Lưu ý: Route này bắt tham số :MaLoai, cần cẩn thận trùng với :MaHang nếu cấu trúc giống nhau
router.get("/hanghoas/:MaLoai", HangHoaController.getByMaLoai); 

// Yêu cầu: Thêm sửa xóa HangHoa (theo mã hàng) - Phần SỬA và XÓA
router.put("/hanghoas/:MaHang", HangHoaController.update);
router.delete("/hanghoas/:MaHang", HangHoaController.delete);


// --- BÀI MỚI: QUẢN LÝ NHÂN VIÊN ---

router.get("/nhanvien", NhanVienController.getAll);

router.get("/nhanvien/:MANV", NhanVienController.getById);

router.post("/nhanvien", NhanVienController.create);



router.put("/nhanvien/:MANV", NhanVienController.update);

router.delete("/nhanvien/:MANV", NhanVienController.delete);
export default router;