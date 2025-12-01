import { pool } from "../services/mysql.js";

export const sinhvienRepo = {
    // --- CRUD CƠ BẢN ---
    getAll: async () => {
        const [rows] = await pool.query("SELECT * FROM SINHVIEN");
        return rows;
    },
    getById: async (maSV) => {
        const [rows] = await pool.query("SELECT * FROM SINHVIEN WHERE maSV = ?", [maSV]);
        return rows[0];
    },
    create: async (maSV, TenSV, GioiTinh, DiaChi, NgaySinh) => {
        const sql = "INSERT INTO SINHVIEN (maSV, TenSV, GioiTinh, DiaChi, NgaySinh) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [maSV, TenSV, GioiTinh, DiaChi, NgaySinh]);
        return result;
    },
    update: async (maSV, TenSV, GioiTinh, DiaChi, NgaySinh) => {
        const sql = "UPDATE SINHVIEN SET TenSV = ?, GioiTinh = ?, DiaChi = ?, NgaySinh = ? WHERE maSV = ?";
        const [result] = await pool.query(sql, [TenSV, GioiTinh, DiaChi, NgaySinh, maSV]);
        return result;
    },
    delete: async (maSV) => {
        const [result] = await pool.query("DELETE FROM SINHVIEN WHERE maSV = ?", [maSV]);
        return result;
    },

    // --- CÁC HÀM TÌM KIẾM THEO YÊU CẦU ---

    // 1. Tìm theo Địa chỉ (Chứa tham số -> LIKE)
    searchByDiaChi: async (diaChi) => {
        const sql = "SELECT * FROM SINHVIEN WHERE DiaChi LIKE ?";
        const [rows] = await pool.query(sql, [`%${diaChi}%`]);
        return rows;
    },

    // 2. Tìm theo Tên (Chứa tham số -> LIKE)
    searchByName: async (tenSV) => {
        const sql = "SELECT * FROM SINHVIEN WHERE TenSV LIKE ?";
        const [rows] = await pool.query(sql, [`%${tenSV}%`]);
        return rows;
    },

    // 3. Tìm sinh viên trên 20 tuổi
    // Logic: Năm hiện tại - Năm sinh >= 20
    getOlderThan20: async () => {
        const sql = "SELECT * FROM SINHVIEN WHERE (YEAR(CURDATE()) - YEAR(NgaySinh)) >= 20";
        const [rows] = await pool.query(sql);
        return rows;
    }
};