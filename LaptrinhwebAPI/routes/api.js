import express from "express";

// --- Import Controllers ---
import { getUsers } from "../controllers/userController.js";

import { 
    getnhanvien, 
    postnhanvien, 
    deletenhanvien, 
    updatenhanvien, 
    getnhanvienById, 
    getnhanvienByName,
    searchNhanVien 
} from "../controllers/nhanvienController.js";

import { 
    getSach, 
    getSachById, 
    postSach, 
    deleteSach, 
    updateSach,
    searchSach,   
    getNewBooks   
} from "../controllers/sachController.js";

import {
    getSinhVien,
    getSinhVienById,
    postSinhVien,
    updateSinhVien,
    deleteSinhVien,
    searchSinhVien,
    getSinhVienOlderThan20
} from "../controllers/sinhvienController.js";

const router = express.Router();

// Root API
router.get("/", (req, res) => {
  res.json({ message: "Welcome to API Service" });
});

// ==========================================
// 1. MODULE: USERS
// ==========================================
router.get("/users/", getUsers);


// ==========================================
// 2. MODULE: NHAN VIEN (Employees)
// ==========================================

// --- Search & Filter ---
router.get("/nhanvien/search", searchNhanVien);        // Tìm kiếm nâng cao (Query params)
router.get("/nhanvien/name/:TenNV", getnhanvienByName); // Tìm theo tên (Path param)

// --- Core CRUD ---
router.get("/nhanvien/", getnhanvien);                 // Lấy danh sách
router.post("/nhanvien/", postnhanvien);               // Thêm mới

// --- ID Operations ---
router.get("/nhanvien/id/:maNV", getnhanvienById);     // Lấy chi tiết
router.put("/nhanvien/:maNV", updatenhanvien);         // Cập nhật
router.delete("/nhanvien/:maNV", deletenhanvien);      // Xoá


// ==========================================
// 3. MODULE: SACH (Books)
// ==========================================

// --- Search & Filter ---
router.get("/sach/new", getNewBooks);                  // Lấy sách mới (5 năm)
router.get("/sach/search", searchSach);                // Tìm kiếm (Tên, Tác giả, NXB)

// --- Core CRUD ---
router.get("/sach/", getSach);                         // Lấy danh sách
router.post("/sach/", postSach);                       // Thêm mới

// --- ID Operations ---
router.get("/sach/:maSach", getSachById);              // Lấy chi tiết
router.put("/sach/:maSach", updateSach);               // Cập nhật
router.delete("/sach/:maSach", deleteSach);            // Xoá


// ==========================================
// 4. MODULE: SINH VIEN (Students)
// ==========================================

// --- Search & Filter ---
router.get("/sinhvien/age20", getSinhVienOlderThan20); // Lọc sinh viên > 20 tuổi
router.get("/sinhvien/search", searchSinhVien);        // Tìm kiếm (Địa chỉ, Tên)

// --- Core CRUD ---
router.get("/sinhvien/", getSinhVien);                 // Lấy danh sách
router.post("/sinhvien/", postSinhVien);               // Thêm mới

// --- ID Operations ---
router.get("/sinhvien/:maSV", getSinhVienById);        // Lấy chi tiết
router.put("/sinhvien/:maSV", updateSinhVien);         // Cập nhật
router.delete("/sinhvien/:maSV", deleteSinhVien);      // Xoá


export default router;