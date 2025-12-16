import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoa.controller.js";
import { sanphamController } from "../controllers/sanpham.controller.js";
// Import controller SinhVien mới
import * as sinhVienController from "../controllers/sinhvien.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
// Import middleware phân quyền riêng (RBAC) mới tạo
import { checkPermission } from "../middlewares/rbac.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// ----------------------- USERS -------------------------------------
// Admin: xem tất cả users
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

// User hoặc Admin: xem chính mình
router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

// Tạo user mới (chỉ Admin)
router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

// Cập nhật user (Admin hoặc chính mình)
router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

// Xóa user (chỉ Admin)
router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);

// ----------------------- HANGHOAS -------------------------------------
router.get("/hanghoas", hanghoaController.getAll);
router.get("/hanghoas/ma-loai/:MaLoai", hanghoaController.getByMaLoai);
router.get("/hanghoas/ten-loai/:TenLoai", hanghoaController.getByTenLoai);
router.get("/hanghoas/sap-het", hanghoaController.getAllSapHet);

// ----------------------- SANPHAMS -------------------------------------
router.get("/sanphams", sanphamController.getAllsanphams);

// ----------------------- SINHVIEN (MỚI) -------------------------------------
// Yêu cầu: Tất cả người dùng được phép lấy thông tin theo mã
router.get(
  "/sinhvien/:masv",
  authenticate,
  checkPermission(["Admin", "User"]), 
  sinhVienController.getByMaSV
);

// Yêu cầu: Người dùng quyền user & admin có quyền lấy thông tin toàn bộ
router.get(
  "/sinhvien",
  authenticate,
  checkPermission(["Admin", "User"]),
  sinhVienController.getAll
);

// Yêu cầu: Người dùng quyền user & admin có quyền thêm
router.post(
  "/sinhvien",
  authenticate,
  checkPermission(["Admin", "User"]),
  sinhVienController.create
);

// Yêu cầu: User KHÔNG có quyền sửa (Chỉ Admin)
router.put(
  "/sinhvien/:masv",
  authenticate,
  checkPermission(["Admin"]),
  sinhVienController.update
);

// Yêu cầu: User KHÔNG có quyền xóa (Chỉ Admin)
router.delete(
  "/sinhvien/:masv",
  authenticate,
  checkPermission(["Admin"]),
  sinhVienController.remove
);

export default router;