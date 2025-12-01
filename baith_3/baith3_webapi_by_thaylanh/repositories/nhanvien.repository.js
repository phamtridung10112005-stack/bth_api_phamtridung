import { pool } from "../config/database.js"; // Dùng lại kết nối cũ

export const nhanvienRepository = {
  // 1. Lấy tất cả nhân viên
  getAll: async () => {
    try {
      const db = await pool; // Lấy kết nối từ pool cũ
      const [rows] = await db.query("SELECT * FROM Nhanvien");
      return rows;
    } catch (err) { throw err; }
  },

  // 2. Lấy nhân viên theo MANV
  getById: async (MANV) => {
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Nhanvien WHERE MANV = ?", [MANV]);
      return rows[0];
    } catch (err) { throw err; }
  },

  // 3. Thêm nhân viên mới
  create: async (data) => {
    try {
      const db = await pool;
      // data gồm: { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }
      await db.query("INSERT INTO Nhanvien SET ?", data);
      return data;
    } catch (err) { throw err; }
  },

  // 4. Sửa nhân viên
  update: async (MANV, data) => {
    try {
      const db = await pool;
      await db.query("UPDATE Nhanvien SET ? WHERE MANV = ?", [data, MANV]);
      return true;
    } catch (err) { throw err; }
  },

  // 5. Xóa nhân viên
  delete: async (MANV) => {
    try {
      const db = await pool;
      // Xóa ở bảng Cong trước (nếu có) để tránh lỗi khóa ngoại
      await db.query("DELETE FROM Cong WHERE MANV = ?", [MANV]); 
      // Sau đó xóa Nhân viên
      await db.query("DELETE FROM Nhanvien WHERE MANV = ?", [MANV]);
      return true;
    } catch (err) { throw err; }
  }
};