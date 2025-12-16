// sinhvien.controller.js
// TODO: Thay dòng dưới bằng đường dẫn tới file kết nối DB của bạn
import { pool as db } from '../config/database.js';// 1. Lấy thông tin theo mã
export const getByMaSV = async (req, res) => {
  try {
    const { masv } = req.params;
    const [rows] = await db.query("SELECT * FROM SinhVien WHERE MASV = ?", [masv]);
    
    if (rows.length === 0) return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Lấy toàn bộ danh sách
export const getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM SinhVien");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Thêm mới
export const create = async (req, res) => {
  try {
    const { masv, hoten } = req.body;
    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!masv || !hoten) {
      return res.status(400).json({ message: "Vui lòng nhập MASV và HOTEN" });
    }

    await db.query("INSERT INTO SinhVien (MASV, HOTEN) VALUES (?, ?)", [masv, hoten]);
    res.status(201).json({ message: "Thêm sinh viên thành công" });
  } catch (err) {
    // Bắt lỗi trùng khóa chính (MASV đã tồn tại)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Mã sinh viên đã tồn tại" });
    }
    res.status(500).json({ error: err.message });
  }
};

// 4. Sửa thông tin
export const update = async (req, res) => {
  try {
    const { masv } = req.params;
    const { hoten } = req.body;
    
    const [result] = await db.query("UPDATE SinhVien SET HOTEN = ? WHERE MASV = ?", [hoten, masv]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy sinh viên để sửa" });
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Xóa thông tin
export const remove = async (req, res) => {
  try {
    const { masv } = req.params;
    const [result] = await db.query("DELETE FROM SinhVien WHERE MASV = ?", [masv]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Không tìm thấy sinh viên để xóa" });
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};