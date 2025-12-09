export class NhanVienDTO {
  constructor({ MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB, TENPB }) {
    this.MaNV = MANV;
    this.HoTen = HOTEN;
    this.NgaySinh = NGAYSINH;
    this.Phai = PHAI;
    this.DiaChi = DIACHI;
    this.MaPB = MAPB;
    this.TenPB = TENPB || null; // Trả về null nếu không có thông tin phòng ban
  }
}