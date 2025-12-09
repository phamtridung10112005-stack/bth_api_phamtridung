import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanpham/sanpham.dto.js";

export const sanphamService = {
  getAllNoPaging: async () => {
    const list = await sanphamRepository.getAllNoPaging();
    return list.map(item => new SanPhamDTO(item));
  },

  getPagingAndSort: async (query) => {
    let { page, size, sort } = query;
    // Mặc định page 1, size 10 nếu không truyền
    page = page ? parseInt(page) : 1;
    size = size ? parseInt(size) : 10;
    
    // Xử lý sort: donGia,desc -> DonGia DESC
    let sortField = 'DonGia';
    let sortType = 'ASC';
    if (sort) {
        const parts = sort.split(',');
        if (parts[0]) sortField = parts[0] === 'donGia' ? 'DonGia' : 'Ma'; 
        if (parts[1]) sortType = parts[1].toUpperCase();
    }

    const list = await sanphamRepository.getPagingAndSort(page, size, sortField, sortType);
    return list.map(item => new SanPhamDTO(item));
  },

  getById: async (ma) => {
    const sp = await sanphamRepository.getById(ma);
    if (!sp) throw new Error("Sản phẩm không tồn tại");
    return new SanPhamDTO(sp);
  },

  getByDanhMuc: async (maDanhMuc) => {
    const list = await sanphamRepository.getByDanhMuc(maDanhMuc);
    return list.map(item => new SanPhamDTO(item));
  },

  create: async (data) => {
    return await sanphamRepository.create(data);
  },

  update: async (ma, data) => {
    return await sanphamRepository.update(ma, data);
  },

  delete: async (ma) => {
    return await sanphamRepository.delete(ma);
  },

  search: async (keyword) => {
    const list = await sanphamRepository.searchByName(keyword);
    return list.map(item => new SanPhamDTO(item));
  },

  getStats: async () => {
    return await sanphamRepository.getStats();
  }
};