import { pool } from "../services/mysql.js";

export const nhanvienRepo = {
    // Lấy tất cả
    getnhanvien: async () => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM NHANVIEN");
        return rows;
    },

    // 1. Tìm theo Tên (Trả về List<NHANVIEN>)
    getnhanvienByName: async (TenNV) => {
        const sql = "SELECT * FROM NHANVIEN WHERE TenNV LIKE ?"; 
        const db = await pool;
        // Dùng % để tìm gần đúng hoặc bỏ % nếu muốn tìm chính xác
        const [rows] = await db.query(sql, [`%${TenNV}%`]); 
        return rows; 
    },

    // 2. Tìm theo Số điện thoại (Trả về List<NHANVIEN>)
    getnhanvienBySDT: async (SDT) => {
        const sql = "SELECT * FROM NHANVIEN WHERE SDT = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [SDT]);
        return rows;
    },

    // 3. Tìm theo Tên + SĐT (Trả về List<NHANVIEN>)
    getnhanvienByNameAndSDT: async (TenNV, SDT) => {
        const sql = "SELECT * FROM NHANVIEN WHERE TenNV LIKE ? AND SDT = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [`%${TenNV}%`, SDT]);
        return rows;
    },

    // 4. Tìm theo Tên + Giới tính + SĐT (Trả về List<NHANVIEN>)
    getnhanvienByFullFilter: async (TenNV, GioiTinh, SDT) => {
        const sql = "SELECT * FROM NHANVIEN WHERE TenNV LIKE ? AND GioiTinh = ? AND SDT = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [`%${TenNV}%`, GioiTinh, SDT]);
        return rows;
    },

    // Lấy theo ID (Giữ nguyên trả về 1 đối tượng)
    getnhanvienById: async (maNV) => {
        const sql = "SELECT * FROM NHANVIEN WHERE maNV = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [maNV]);
        return rows[0];
    },

    // Thêm mới
    postnhanvien: async (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) => {
        const sql = "INSERT INTO NHANVIEN (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) VALUES (?, ?, ?, ?, ?, ?)";
        const db = await pool;
        const [rows] = await db.query(sql, [maNV, TenNV, GioiTinh, NgaySinh, email, SDT]);
        return rows;
    },

    // Xoá
    deletenhanvien: async (maNV) => {
        const sql = "DELETE FROM NHANVIEN WHERE maNV = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [maNV]);
        return rows;
    },

    // Cập nhật
    updatenhanvien: async (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) => {
        const sql = "UPDATE NHANVIEN SET TenNV = ?, GioiTinh = ?, NgaySinh = ?, email = ?, SDT = ? WHERE maNV = ?";
        const db = await pool;
        const [rows] = await db.query(sql, [TenNV, GioiTinh, NgaySinh, email, SDT, maNV]);
        return rows;
    },
};