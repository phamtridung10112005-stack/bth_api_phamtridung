import { pool } from "../config/database.js";

export const danhmucRepository = {
  getAll: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM DanhMuc");
    return rows;
  }
};