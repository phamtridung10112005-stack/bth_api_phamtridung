export class CongTrinhDTO {
  constructor({ MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC }) {
    this.MaCT = MACT;
    this.TenCT = TENCT;
    this.DiaDiem = DIADIEM;
    this.NgayCapGP = NGAYCAPGP;
    this.NgayKC = NGAYKC;
  }
}