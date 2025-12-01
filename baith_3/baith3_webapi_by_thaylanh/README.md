import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { HangHoaController } from "../controllers/hanghoa.controller.js";

const router = Router();

// --- USER ROUTES ---
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// --- HANG HOA ROUTES ---

// 1. CÁC ROUTE LỌC/TÌM KIẾM (Đặt lên đầu)

// Yêu cầu: Get các HangHoa sắp hết ( SoLuongCon <5)
router.get("/hanghoas/loe", HangHoaController.getLessOrEqualFive);
// URL Postman: http://localhost:3000/api/hanghoas/loe

// Yêu cầu: Get thông tin của các HangHoa có GiaBan vào thời điểm hiện tại trong khoảng GiaMin tới GiaMax
router.get("/hanghoas/filter/price", HangHoaController.getByPriceRange);
// URL Postman: http://localhost:3000/api/hanghoas/filter/price?min=100000&max=30000000

// Yêu cầu: Get các HangHoa theo TenLoai
router.get("/hanghoas/tenloai/:TenLoai", HangHoaController.getByTenLoai);
// URL Postman: http://localhost:3000/api/hanghoas/tenloai/Điện Tử


// 2. CÁC ROUTE QUẢN LÝ GIÁ BÁN (Price Management)

// Yêu cầu: Thêm giá bán mới (Cần body JSON)
router.post("/giahanghoa", HangHoaController.addPrice); 
// URL Postman: http://localhost:3000/api/giahanghoa
// Body JSON (Tab Body -> raw -> JSON):
/*
{
    "MaGB": "GB09",
    "MaHang": "HH09",
    "Gia": 15500000,
    "DVTinh": "Cái",
    "NgayBD": "2024-01-01",
    "NgayKT": "2030-01-01"
}
*/

// Yêu cầu: Sửa giá bán (Dựa vào MaHang và NgayBD cũ để tìm)
router.put("/giahanghoa/:MaHang", HangHoaController.updatePrice); 
// URL Postman: http://localhost:3000/api/giahanghoa/HH07
// Body JSON (Cần NgayBD khớp với DB để tìm ra dòng cần sửa):
/*
{
    "NgayBD": "2023-11-01", 
    "Gia": 26000000
}
*/

// Yêu cầu: Xóa giá bán
router.delete("/giahanghoa/:MaHang", HangHoaController.deletePrice); 
// URL Postman: http://localhost:3000/api/giahanghoa/HH07
// Body JSON:
/*
{
    "NgayBD": "2023-11-01"
}
*/


// 3. CÁC ROUTE CHI TIẾT SẢN PHẨM VÀ GIÁ

// Yêu cầu: Lấy toàn bộ thông tin HangHoa và giá bán hiện tại (theo mã hàng)
router.get("/hanghoas/:MaHang/detail", HangHoaController.getDetailWithPrice);
// URL Postman: http://localhost:3000/api/hanghoas/HH07/detail
// (Lưu ý: HH07 là mã duy nhất có hạn đến năm 2030 trong data mẫu của bạn)

// Yêu cầu: Get thông tin GiaBan của HangHoa có MaHang vào thời điểm hiện tại
router.get("/hanghoas/:MaHang/price/current", HangHoaController.getCurrentPrice);
// URL Postman: http://localhost:3000/api/hanghoas/HH07/price/current

// Yêu cầu: Lấy toàn bộ thông tin giá bán (theo mã hàng) - Lịch sử giá
router.get("/hanghoas/:MaHang/price", HangHoaController.getPriceHistory);
// URL Postman: http://localhost:3000/api/hanghoas/HH01/price


// 4. CÁC ROUTE CRUD CƠ BẢN VÀ THAM SỐ (Đặt cuối cùng)

router.get("/hanghoas", HangHoaController.getAll); 
// URL Postman: http://localhost:3000/api/hanghoas

// Yêu cầu: Thêm HangHoa (theo mã hàng)
router.post("/hanghoas", HangHoaController.create);
// URL Postman: http://localhost:3000/api/hanghoas
// Body JSON:
/*
{
    "MaHang": "HH10",
    "MaLoai": "LH02",
    "Tenhang": "Máy hút bụi cầm tay",
    "SoLuong": 50,
    "SoLuongCon": 50
}
*/

// Yêu cầu: Get các HangHoa theo MaLoai
router.get("/hanghoas/:MaLoai", HangHoaController.getByMaLoai); 
// URL Postman: http://localhost:3000/api/hanghoas/LH01

// Yêu cầu: Sửa HangHoa
router.put("/hanghoas/:MaHang", HangHoaController.update);
// URL Postman: http://localhost:3000/api/hanghoas/HH10
// Body JSON:
/*
{
    "Tenhang": "Máy hút bụi Pro Max",
    "SoLuongCon": 40
}
*/

// Yêu cầu: Xóa HangHoa
router.delete("/hanghoas/:MaHang", HangHoaController.delete);
// URL Postman: http://localhost:3000/api/hanghoas/HH10




router.get("/nhanvien", NhanVienController.getAll);
// URL: http://localhost:3000/api/nhanvien

router.get("/nhanvien/:MANV", NhanVienController.getById);
// URL: http://localhost:3000/api/nhanvien/NV01

router.post("/nhanvien", NhanVienController.create);
// URL: http://localhost:3000/api/nhanvien
/* Body JSON:
{
    "MANV": "NV05",
    "HOTEN": "Nhân Viên Mới",
    "NGAYSINH": "2000-01-01",
    "PHAI": "Nam",
    "DIACHI": "Hà Nội",
    "MAPB": "PB01"  <-- Chú ý: Mã PB01 phải có sẵn trong bảng PhongBan rồi nhé
}
*/

router.put("/nhanvien/:MANV", NhanVienController.update);
// URL: http://localhost:3000/api/nhanvien/NV05

router.delete("/nhanvien/:MANV", NhanVienController.delete);
// URL: http://localhost:3000/api/nhanvien/NV05