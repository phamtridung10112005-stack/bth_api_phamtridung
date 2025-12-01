import { pool } from "../services/mysql.js";

export const sachRepo = {
    // --- CÁC HÀM CRUD CƠ BẢN ---
    getSach: async () => {
        const [rows] = await pool.query("SELECT * FROM SACH");
        return rows;
    },
    getSachById: async (maSach) => {
        const [rows] = await pool.query("SELECT * FROM SACH WHERE MASH = ?", [maSach]);
        return rows[0];
    },
    postSach: async (maSach, tenSach, tacGia, nhaXB, namXB) => {
        const sql = "INSERT INTO SACH (MASH, TENSACH, TACGIA, NHAXB, NAMXB) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [maSach, tenSach, tacGia, nhaXB, namXB]);
        return result;
    },
    deleteSach: async (maSach) => {
        const [result] = await pool.query("DELETE FROM SACH WHERE MASH = ?", [maSach]);
        return result;
    },
    updateSach: async (maSach, tenSach, tacGia, nhaXB, namXB) => {
        const sql = "UPDATE SACH SET TENSACH = ?, TACGIA = ?, NHAXB = ?, NAMXB = ? WHERE MASH = ?";
        const [result] = await pool.query(sql, [tenSach, tacGia, nhaXB, namXB, maSach]);
        return result;
    },

    // --- CÁC HÀM TÌM KIẾM THEO YÊU CẦU ---

    // 1. Tìm theo tên sách (Chứa tham số -> Dùng LIKE)
    searchByTenSach: async (tenSach) => {
        const sql = "SELECT * FROM SACH WHERE TENSACH LIKE ?";
        const [rows] = await pool.query(sql, [`%${tenSach}%`]);
        return rows;
    },

    // 2. Tìm theo tác giả (Là tác giả -> Dùng =)
    searchByTacGia: async (tacGia) => {
        const sql = "SELECT * FROM SACH WHERE TACGIA = ?";
        const [rows] = await pool.query(sql, [tacGia]);
        return rows;
    },

    // 3. Tìm theo NXB (Là NXB -> Dùng =)
    searchByNhaXB: async (nhaXB) => {
        const sql = "SELECT * FROM SACH WHERE NHAXB = ?";
        const [rows] = await pool.query(sql, [nhaXB]);
        return rows;
    },

    // 4. Tìm sách mới (5 năm tính từ hiện tại)
    getSachMoi: async () => {
        const currentYear = new Date().getFullYear();
        const limitYear = currentYear - 5;
        // Lấy sách có năm xuất bản >= năm hiện tại - 5
        const sql = "SELECT * FROM SACH WHERE NAMXB >= ?";
        const [rows] = await pool.query(sql, [limitYear]);
        return rows;
    }
};