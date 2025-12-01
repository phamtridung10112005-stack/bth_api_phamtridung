import { hanghoaRepository } from "../repositories/hanghoa.repositori.js";
import { HangHoaDTO } from "../dtos/hanghoas/hanghoa.dto.js";
import { logger } from "../config/logger.js";
import { GiaHangHoaDTO, HangHoaWithPriceDTO } from "../dtos/hanghoas/giahanghoa.dto.js";

export const hanghoaService = {
  getAllhanghoas: async () => {
    logger.info("Service: Getting all hanghoa");
    const hanghoas = await hanghoaRepository.getAll();
    return hanghoas.map((u) => new HangHoaDTO(u));
  },

  gethanghoaByMaLoai: async (MaLoai) => {
    logger.info(`Service: Getting hanghoa by MaLoai ${MaLoai}`);
    const hanghoa = await hanghoaRepository.getByMaLoai(MaLoai);
    if (!hanghoa) {
      logger.warn(`Service Warning: hanghoa ${MaLoai} not found`);
      throw new Error("hanghoa not found");
    }
    return new HangHoaDTO(hanghoa);
  },

  gethanghoaByTenLoai: async (TenLoai) => {
    logger.info(`Service: Getting hanghoa by TenLoai ${TenLoai}`);
    // 1. Nhận mảng dữ liệu từ Repository
    const hanghoaList = await hanghoaRepository.getByTenLoai(TenLoai);
    // 2. Kiểm tra nếu mảng rỗng (không tìm thấy)
    if (!hanghoaList || hanghoaList.length === 0) {
      logger.warn(`Service Warning: hanghoa with TenLoai ${TenLoai} not found`);
      throw new Error("Không tìm thấy hàng hóa nào thuộc loại này");
    }
    // 3. Chuyển đổi từng phần tử trong mảng thành DTO
    return hanghoaList.map((item) => new HangHoaDTO(item));
  },

  getLessOrEqualFive: async () => {
    logger.info("Service: Getting hanghoas with SoLuongCon <= 5");
    const hanghoas = await hanghoaRepository.getLessOrEqualFive();
    return hanghoas.map((item) => new HangHoaDTO(item));
  }, // <--- QUAN TRỌNG: Thêm dấu phẩy ở đây để nối tiếp các hàm dưới

  // --- CÁC HÀM MỚI ĐƯỢC ĐƯA VÀO TRONG ---

  // 1. Lấy giá hiện tại
  getCurrentPrice: async (MaHang) => {
    const gia = await hanghoaRepository.getCurrentGiaBan(MaHang);
    if (!gia) throw new Error("Chưa có giá cho mặt hàng này");
    return new GiaHangHoaDTO(gia);
  },

  // 2. Lấy hàng hóa theo khoảng giá
  getByPriceRange: async (min, max) => {
    const list = await hanghoaRepository.getByPriceRange(min, max);
    return list.map((item) => new HangHoaWithPriceDTO(item));
  },

  // 3. Lấy lịch sử giá
  getPriceHistory: async (MaHang) => {
    const list = await hanghoaRepository.getPriceHistory(MaHang);
    return list.map((item) => new GiaHangHoaDTO(item));
  },

 // 4. Thêm/Sửa/Xóa Giá
  addPrice: async (data) => {
      // Data truyền vào cần có: MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT
      return await hanghoaRepository.addPrice(data);
  },
  
  // Update cần MaHang, NgayBD (để tìm record) và Giá mới
  updatePrice: async (MaHang, NgayBD, GiaBan) => {
      return await hanghoaRepository.updatePrice(MaHang, NgayBD, GiaBan);
  },

  deletePrice: async (MaHang, NgayBD) => {
      return await hanghoaRepository.deletePrice(MaHang, NgayBD);
  },

  // 5. Lấy Chi tiết Hàng + Giá
  getDetailWithPrice: async (MaHang) => {
    const item = await hanghoaRepository.getDetailWithPrice(MaHang);
    if (!item) throw new Error("Không tìm thấy hàng hóa");
    return new HangHoaWithPriceDTO(item);
  },

  // 6. CRUD HangHoa
  createHangHoa: async (data) => {
    // Có thể thêm validate ở đây
    return await hanghoaRepository.create(data);
  },

  updateHangHoa: async (MaHang, data) => {
    return await hanghoaRepository.update(MaHang, data);
  },

  deleteHangHoa: async (MaHang) => {
    return await hanghoaRepository.delete(MaHang);
  },
}; // <--- Đóng ngoặc object ở cuối cùng file
