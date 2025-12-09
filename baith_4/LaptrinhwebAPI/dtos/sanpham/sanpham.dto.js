export class SanPhamDTO {
  constructor({ Ma, Ten, DonGia, MaDanhMuc, TenDanhMuc }) {
    this.Ma = Ma;
    this.Ten = Ten;
    this.DonGia = DonGia;
    this.MaDanhMuc = MaDanhMuc;
    this.TenDanhMuc = TenDanhMuc || null; // Trả về null nếu không có tên danh mục
  }
}

