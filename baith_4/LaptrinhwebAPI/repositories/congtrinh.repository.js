import { pool } from "../config/database.js";

export const congTrinhRepository = {
  // Req 8: Lấy danh sách công trình
  getAll: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM Congtrinh");
    return rows;
  },

  // Req 9: Phân công (Thêm vào bảng Cong)
  assignWork: async (data) => {
    const db = await pool;
    // Dùng INSERT IGNORE hoặc ON DUPLICATE KEY UPDATE nếu muốn tránh lỗi trùng lặp
    const query = `
        INSERT INTO Cong (MACT, MANV, SLNGAYCONG) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE SLNGAYCONG = VALUES(SLNGAYCONG)
    `;
    await db.query(query, [data.MACT, data.MANV, data.SLNGAYCONG]);
    return data;
  },

  // Req 10: Thống kê ngày công
  getWorkStats: async (manv) => {
    const db = await pool;
    const query = `
      SELECT MANV, SUM(SLNGAYCONG) as TongNgayCong
      FROM Cong
      WHERE MANV = ?
      GROUP BY MANV
    `;
    const [rows] = await db.query(query, [manv]);
    return rows[0]; // Trả về object chứa tổng
  }
};