export class GiaHangHoaDTO {
    constructor({ MaGB, MaHang, NgayBD, NgayKT, Gia }) {
        this.MaGB = MaGB;
        this.MaHang = MaHang;
        this.NgayBD = NgayBD;
        this.NgayKT = NgayKT;
        this.GiaBan = Gia; // Map từ cột Gia trong DB sang GiaBan
    }
}

export class HangHoaWithPriceDTO {
    constructor({ MaHang, MaLoai, Tenhang, SoLuong, SoLuongCon, Gia }) {
        this.MaHang = MaHang;
        this.MaLoai = MaLoai;
        this.Tenhang = Tenhang;
        this.SoLuong = SoLuong;
        this.SoLuongCon = SoLuongCon;
        this.GiaBan = Gia || 0; // Map cột Gia
    }
}