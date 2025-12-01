import { nhanvienRepo } from "../repositories/nhanvien.js";

// --- CÁC HÀM GET CƠ BẢN ---
export const getnhanvien = async (req, res) => {
  try {
    const nhanvien = await nhanvienRepo.getnhanvien();
    res.json(nhanvien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getnhanvienById = async (req, res) => {
  try {
    const maNV = req.params.maNV;
    const nhanvien = await nhanvienRepo.getnhanvienById(maNV);
    if (nhanvien) res.json(nhanvien);
    else res.status(404).json({ message: "Nhân viên không tồn tại" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getnhanvienByName = async (req, res) => {
  try {
    const TenNV = req.params.TenNV;
    const nhanvien = await nhanvienRepo.getnhanvienByName(TenNV);
    res.json(nhanvien); // Trả về List
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- CONTROLLER TÌM KIẾM NÂNG CAO (Đáp ứng 3 yêu cầu HttpGet) ---
export const searchNhanVien = async (req, res) => {
  try {
    const { tenNV, sdt, gt } = req.query;
    let result = [];

    // 1. public List<NHANVIEN> getNhanVien_TenNV_SDT(String tenNV, String gt, String sdt)
    if (tenNV && gt && sdt) {
      result = await nhanvienRepo.getnhanvienByFullFilter(tenNV, gt, sdt);
    } 
    // 2. public List<NHANVIEN> getNhanVien_TenNV_SDT(String tenNV, String sdt)
    else if (tenNV && sdt) {
      result = await nhanvienRepo.getnhanvienByNameAndSDT(tenNV, sdt);
    } 
    // 3. public List<NHANVIEN> getNhanVien_TenNV(String tenNV) 
  
    else if (sdt) {
       result = await nhanvienRepo.getnhanvienBySDT(sdt);
    }
    else if (tenNV) {
       result = await nhanvienRepo.getnhanvienByName(tenNV);
    }
    else {
      return res.status(400).json({ message: "Cần truyền tham số: tenNV, sdt hoặc gt" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- HÀM PUT (Cập nhật) ---
export const updatenhanvien = async (req, res) => {
  try {
    const { maNV } = req.params;
    // req.body chính là đối tượng "nHANVIEN" chứa thông tin cần sửa
    const { TenNV, GioiTinh, NgaySinh, email, SDT } = req.body;
    
    const result = await nhanvienRepo.updatenhanvien(maNV, TenNV, GioiTinh, NgaySinh, email, SDT);
    
    if (result.affectedRows > 0) {
        // Trả về true/thành công
        res.json({ success: true, message: "Cập nhật thành công" });
    } else {
        // Trả về false/thất bại
        res.status(404).json({ success: false, message: "Không tìm thấy NV" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- CÁC HÀM POST, DELETE ---
export const postnhanvien = async (req, res) => {
  try {
    const { maNV, TenNV, GioiTinh, NgaySinh, email, SDT } = req.body;
    if (!maNV) return res.status(400).json({ message: "Thiếu maNV!" });

    await nhanvienRepo.postnhanvien(maNV, TenNV, GioiTinh, NgaySinh, email, SDT);
    res.status(201).json({ message: "Thêm thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletenhanvien = async (req, res) => {
  try {
    const { maNV } = req.params;
    await nhanvienRepo.deletenhanvien(maNV);
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};