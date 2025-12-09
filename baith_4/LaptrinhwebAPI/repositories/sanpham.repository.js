import { pool } from "../config/database.js";

export const sanphamRepository = {
  // 1. Lấy tất cả (Không phân trang)
  getAllNoPaging: async () => {
    const db = await pool;
    const query = `
      SELECT s.Ma, s.Ten, s.DonGia, s.MaDanhMuc, d.TenDanhMuc 
      FROM SanPham s 
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  // 9. Lấy có Phân trang & Sắp xếp
  getPagingAndSort: async (page, size, sortField, sortType) => {
    const db = await pool;
    let query = `
      SELECT s.Ma, s.Ten, s.DonGia, s.MaDanhMuc, d.TenDanhMuc 
      FROM SanPham s 
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc
    `;
    
    // Validate tên cột để tránh lỗi SQL
    const validFields = ['Ma', 'Ten', 'DonGia'];
    if (!validFields.includes(sortField)) sortField = 'DonGia';

    query += ` ORDER BY s.${sortField} ${sortType} LIMIT ? OFFSET ?`;
    const offset = (page - 1) * size;
    const [rows] = await db.query(query, [+size, +offset]);
    return rows;
  },

  getById: async (ma) => {
    const db = await pool;
    const query = `
      SELECT s.*, d.TenDanhMuc 
      FROM SanPham s 
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc 
      WHERE s.Ma = ?
    `;
    const [rows] = await db.query(query, [ma]);
    return rows[0];
  },

  getByDanhMuc: async (maDanhMuc) => {
    const db = await pool;
    // Join để lấy thêm tên danh mục cho đẹp
    const query = `
      SELECT s.*, d.TenDanhMuc 
      FROM SanPham s 
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc
      WHERE s.MaDanhMuc = ?
    `;
    const [rows] = await db.query(query, [maDanhMuc]);
    return rows;
  },

  create: async (data) => {
    const db = await pool;
    await db.query("INSERT INTO SanPham SET ?", data);
    return data;
  },

  update: async (ma, data) => {
    const db = await pool;
    await db.query("UPDATE SanPham SET ? WHERE Ma = ?", [data, ma]);
    return true;
  },

  delete: async (ma) => {
    const db = await pool;
    await db.query("DELETE FROM SanPham WHERE Ma = ?", [ma]);
    return true;
  },

  searchByName: async (keyword) => {
    const db = await pool;
    const query = `
      SELECT s.*, d.TenDanhMuc 
      FROM SanPham s 
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc
      WHERE s.Ten LIKE ?
    `;
    const [rows] = await db.query(query, [`%${keyword}%`]);
    return rows;
  },

  getStats: async () => {
    const db = await pool;
    const query = `
      SELECT d.MaDanhMuc, d.TenDanhMuc, COUNT(s.Ma) as SoLuongSanPham
      FROM DanhMuc d
      LEFT JOIN SanPham s ON d.MaDanhMuc = s.MaDanhMuc
      GROUP BY d.MaDanhMuc, d.TenDanhMuc
    `;
    const [rows] = await db.query(query);
    return rows;
  }
};