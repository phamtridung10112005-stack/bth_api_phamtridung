import { pool } from "../config/database.js";

export const nhanVienRepository = {
  // Req 1: Lấy tất cả nhân viên kèm tên phòng ban
  getAll: async () => {
    const db = await pool;
    const query = `
      SELECT n.*, p.TENPB 
      FROM Nhanvien n 
      LEFT JOIN Phongban p ON n.MAPB = p.MAPB
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  // Req 2: Lấy chi tiết nhân viên
  getById: async (manv) => {
    const db = await pool;
    const query = `
      SELECT n.*, p.TENPB 
      FROM Nhanvien n 
      LEFT JOIN Phongban p ON n.MAPB = p.MAPB
      WHERE n.MANV = ?
    `;
    const [rows] = await db.query(query, [manv]);
    return rows[0];
  },

  // Req 7: Lấy nhân viên theo phòng ban
  getByPhongBan: async (mapb) => {
    const db = await pool;
    const query = `
      SELECT n.*, p.TENPB 
      FROM Nhanvien n 
      LEFT JOIN Phongban p ON n.MAPB = p.MAPB
      WHERE n.MAPB = ?
    `;
    const [rows] = await db.query(query, [mapb]);
    return rows;
  },

  // Req 3: Thêm mới
  create: async (data) => {
    const db = await pool;
    await db.query("INSERT INTO Nhanvien SET ?", data);
    return data;
  },

  // Req 4: Cập nhật
  update: async (manv, data) => {
    const db = await pool;
    await db.query("UPDATE Nhanvien SET ? WHERE MANV = ?", [data, manv]);
    return true;
  },

  // Req 5: Xóa (Cần xóa trong bảng Cong trước nếu có ràng buộc, ở đây giả sử xử lý lỗi controller)
  delete: async (manv) => {
    const db = await pool;
    // Xóa dữ liệu chấm công trước để tránh lỗi khóa ngoại (nếu DB không để ON DELETE CASCADE)
    await db.query("DELETE FROM Cong WHERE MANV = ?", [manv]); 
    await db.query("DELETE FROM Nhanvien WHERE MANV = ?", [manv]);
    return true;
  }
};