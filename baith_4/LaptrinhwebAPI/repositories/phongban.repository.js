import { pool } from "../config/database.js";

export const phongBanRepository = {
  // Req 6: Lấy danh sách phòng ban
  getAll: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM Phongban");
    return rows;
  }
};