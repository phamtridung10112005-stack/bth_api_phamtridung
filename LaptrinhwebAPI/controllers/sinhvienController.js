import { sinhvienRepo } from "../repositories/sinhvien.js";

// --- CRUD ---

export const getSinhVien = async (req, res) => {
    try {
        const list = await sinhvienRepo.getAll();
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSinhVienById = async (req, res) => {
    try {
        const { maSV } = req.params;
        const sv = await sinhvienRepo.getById(maSV);
        if (sv) res.json(sv);
        else res.status(404).json({ message: "Sinh viên không tồn tại" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postSinhVien = async (req, res) => {
    try {
        const { maSV, TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        if (!maSV || !TenSV) return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

        await sinhvienRepo.create(maSV, TenSV, GioiTinh, DiaChi, NgaySinh);
        res.status(201).json({ message: "Thêm sinh viên thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateSinhVien = async (req, res) => {
    try {
        const { maSV } = req.params;
        const { TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        
        const result = await sinhvienRepo.update(maSV, TenSV, GioiTinh, DiaChi, NgaySinh);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Cập nhật thành công" });
        } else {
            res.status(404).json({ success: false, message: "Không tìm thấy sinh viên" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteSinhVien = async (req, res) => {
    try {
        const { maSV } = req.params;
        await sinhvienRepo.delete(maSV);
        res.json({ message: "Xoá thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- TÌM KIẾM & LỌC ---

export const searchSinhVien = async (req, res) => {
    try {
        // Lấy tham số query: ?diachi=...&tenSV=...
        const { diachi, tenSV } = req.query;
        let result = [];

        if (diachi) {
            result = await sinhvienRepo.searchByDiaChi(diachi);
        } else if (tenSV) {
            result = await sinhvienRepo.searchByName(tenSV);
        } else {
            result = await sinhvienRepo.getAll();
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hàm lấy sinh viên > 20 tuổi
export const getSinhVienOlderThan20 = async (req, res) => {
    try {
        const result = await sinhvienRepo.getOlderThan20();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};