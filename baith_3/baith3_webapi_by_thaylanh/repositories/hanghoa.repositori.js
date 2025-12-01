import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const hanghoaRepository = {
  // 1. Lấy tất cả hàng hóa
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

  // 2. Lấy hàng hóa theo Mã Loại
  getByMaLoai: async (MaLoai) => {
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE MaLoai = ?", [MaLoai]);
      return rows[0]; // Trả về object đầu tiên hoặc undefined
    } catch (err) { throw err; }
  },

  // 3. Lấy hàng hóa theo Tên Loại (JOIN bảng LoaiHang)
  getByTenLoai: async (TenLoai) => {
    try {
        const db = await pool;
        const query = `
            SELECT h.* FROM HangHoa h
            JOIN LoaiHang l ON h.MaLoai = l.MaLoai 
            WHERE l.TenLoai LIKE ?
        `;
        const [rows] = await db.query(query, [`%${TenLoai}%`]);
        return rows; 
    } catch (err) { throw err; }
  },

  // 4. Lấy hàng hóa sắp hết
  getLessOrEqualFive: async () => {
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE SoLuongCon <= 5");
      return rows;
    } catch (err) { throw err; }
  },

  // --- CÁC HÀM XỬ LÝ GIÁ (Đã sửa theo bảng GiaBan) ---

  // 5. Get giá bán hiện tại của 1 hàng hóa (Dựa vào ngày hiện tại)
  getCurrentGiaBan: async (MaHang) => {
    logger.info(`Repository: Fetching current GiaBan for MaHang ${MaHang}`);
    try {
      const db = await pool;
      // Lấy giá mà ngày hiện tại nằm trong khoảng NgayBD và NgayKT
      const query = `
        SELECT * FROM GiaBan 
        WHERE MaHang = ? 
        AND CURRENT_DATE() BETWEEN NgayBD AND NgayKT
        LIMIT 1
      `;
      const [rows] = await db.query(query, [MaHang]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getCurrentGiaBan failed`, err);
      throw err;
    }
  },

  // 6. Get hàng hóa có GIÁ HIỆN TẠI nằm trong khoảng Min-Max
  getByPriceRange: async (min, max) => {
    try {
      const db = await pool;
      // Join HangHoa với GiaBan hiện tại
      const query = `
        SELECT h.*, g.Gia 
        FROM HangHoa h
        JOIN GiaBan g ON h.MaHang = g.MaHang
        WHERE (CURRENT_DATE() BETWEEN g.NgayBD AND g.NgayKT)
        AND g.Gia >= ? AND g.Gia <= ?
      `;
      const [rows] = await db.query(query, [min, max]);
      return rows;
    } catch (err) { throw err; }
  },

  // 7. Lấy lịch sử giá (toàn bộ bảng GiaBan của mã hàng đó)
  getPriceHistory: async (MaHang) => {
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaBan WHERE MaHang = ? ORDER BY NgayBD DESC", [MaHang]);
      return rows;
    } catch (err) { throw err; }
  },

  // 8. Thêm Giá Mới (Lưu ý: Bạn phải gửi MaGB trong body vì DB yêu cầu)
  addPrice: async (data) => { 
    // Data gồm { MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT }
    try {
      const db = await pool;
      await db.query("INSERT INTO GiaBan SET ?", data);
      return data;
    } catch (err) { throw err; }
  },
  
  // 9. Sửa Giá (Dựa theo MaHang và NgayBD)
  updatePrice: async (MaHang, NgayBD, GiaMoi) => {
    try {
      const db = await pool;
      // Update cột Gia trong bảng GiaBan
      await db.query("UPDATE GiaBan SET Gia = ? WHERE MaHang = ? AND NgayBD = ?", [GiaMoi, MaHang, NgayBD]);
      return true;
    } catch (err) { throw err; }
  },

  // 10. Xóa Giá
  deletePrice: async (MaHang, NgayBD) => {
    try {
      const db = await pool;
      await db.query("DELETE FROM GiaBan WHERE MaHang = ? AND NgayBD = ?", [MaHang, NgayBD]);
      return true;
    } catch (err) { throw err; }
  },

  // 11. Get info HangHoa + Giá hiện tại
  getDetailWithPrice: async (MaHang) => {
    try {
      const db = await pool;
      const query = `
        SELECT h.*, g.Gia
        FROM HangHoa h
        LEFT JOIN GiaBan g ON h.MaHang = g.MaHang 
             AND (CURRENT_DATE() BETWEEN g.NgayBD AND g.NgayKT)
        WHERE h.MaHang = ?
      `;
      const [rows] = await db.query(query, [MaHang]);
      return rows[0];
    } catch (err) { throw err; }
  },

  // --- CRUD Hàng Hóa cơ bản ---
  create: async (data) => {
    try {
        const db = await pool;
        await db.query("INSERT INTO HangHoa SET ?", data);
        return data;
    } catch (err) { throw err; }
  },
  
  update: async (MaHang, data) => {
      try {
          const db = await pool;
          await db.query("UPDATE HangHoa SET ? WHERE MaHang = ?", [data, MaHang]);
          return true;
      } catch (err) { throw err; }
  },

  delete: async (MaHang) => {
      try {
          const db = await pool;
          // Xóa giá trước để tránh lỗi khóa ngoại
          await db.query("DELETE FROM GiaBan WHERE MaHang = ?", [MaHang]); 
          await db.query("DELETE FROM HangHoa WHERE MaHang = ?", [MaHang]);
          return true;
      } catch (err) { throw err; }
  }
};