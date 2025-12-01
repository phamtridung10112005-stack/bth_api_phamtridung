import { sachRepo } from "../repositories/sach.js";

// --- CRUD CƠ BẢN ---

export const getSach = async (req, res) => {
    try {
        const books = await sachRepo.getSach();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSachById = async (req, res) => {
    try {
        const { maSach } = req.params;
        const book = await sachRepo.getSachById(maSach);
        if (book) res.json(book);
        else res.status(404).json({ message: "Không tìm thấy sách" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postSach = async (req, res) => {
    try {
        const { MASH, TENSACH, TACGIA, NHAXB, NAMXB } = req.body;
        if (!MASH) return res.status(400).json({ message: "Vui lòng nhập MASH" });

        await sachRepo.postSach(MASH, TENSACH, TACGIA, NHAXB, NAMXB);
        res.status(201).json({ message: "Thêm sách thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteSach = async (req, res) => {
    try {
        const { maSach } = req.params;
        await sachRepo.deleteSach(maSach);
        res.json({ message: "Xoá sách thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateSach = async (req, res) => {
    try {
        const { maSach } = req.params;
        const { TENSACH, TACGIA, NHAXB, NAMXB } = req.body;
        
        const result = await sachRepo.updateSach(maSach, TENSACH, TACGIA, NHAXB, NAMXB);
        
        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Cập nhật sách thành công" });
        } else {
            res.status(404).json({ success: false, message: "Không tìm thấy sách để sửa" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- TÌM KIẾM NÂNG CAO (Search) ---

export const searchSach = async (req, res) => {
    try {
        // Lấy tham số từ URL: ?tenSach=...&tacGia=...&nhaXB=...
        const { tenSach, tacGia, nhaXB } = req.query;
        let result = [];

        // Logic ưu tiên hoặc kết hợp tuỳ bạn chọn. 

        
        if (tenSach) {
            // Yêu cầu 1: Tên sách chứa tham số
            result = await sachRepo.searchByTenSach(tenSach);
        } 
        else if (tacGia) {
            // Yêu cầu 2: Tên tác giả là...
            result = await sachRepo.searchByTacGia(tacGia);
        }
        else if (nhaXB) {
            // Yêu cầu 3: Tên NXB là...
            result = await sachRepo.searchByNhaXB(nhaXB);
        } else {
            // Nếu không truyền gì thì trả về tất cả hoặc báo lỗi
            result = await sachRepo.getSach(); 
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- LẤY SÁCH MỚI (Yêu cầu 4) ---
export const getNewBooks = async (req, res) => {
    try {
        const books = await sachRepo.getSachMoi();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};