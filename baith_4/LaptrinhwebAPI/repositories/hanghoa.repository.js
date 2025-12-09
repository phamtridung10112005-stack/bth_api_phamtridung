import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const hanghoaRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all hanghoas");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaLoai: async (MaLoai) => {
    logger.info(`Repository: Fetching hanghoa with MaLoai ${MaLoai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE MaLoai = ?", [MaLoai]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaLoai failed for MaLoai ${MaLoai}`, err);
      throw err;
    }
  }
};
