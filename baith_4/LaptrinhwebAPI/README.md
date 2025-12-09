1. Nhóm API Lấy dữ liệu (GET)
Req 1: Lấy danh sách tất cả sản phẩm (Không phân trang)

URL: http://localhost:3000/api/sanpham/all

Req 2: Lấy chi tiết sản phẩm (Ví dụ mã SP01)

URL: http://localhost:3000/api/sanpham/SP01

Req 3: Lấy danh sách danh mục

URL: http://localhost:3000/api/danhmuc

Req 4: Lấy sản phẩm theo danh mục (Ví dụ danh mục ID = 1)

URL: http://localhost:3000/api/danhmuc/1/sanpham

Req 8: Tìm kiếm sản phẩm theo tên (Ví dụ tìm chữ "Dell")

URL: http://localhost:3000/api/sanpham/timkiem?ten=Dell

Req 9: Lấy danh sách có Phân trang & Sắp xếp

URL: http://localhost:3000/api/sanpham?page=1&size=5&sort=donGia,desc

Giải thích: Lấy trang 1, 5 sản phẩm, sắp xếp giá giảm dần (desc).

Thử cái khác: ?page=1&size=5&sort=Ma,asc

Req 10: Thống kê số lượng sản phẩm theo danh mục

URL: http://localhost:3000/api/thongke/sanpham-danhmuc

Dưới đây là danh sách đầy đủ các URL và Body mẫu để bạn copy vào Postman và test từng chức năng một cách dễ dàng.

Giả định server của bạn đang chạy ở cổng 3000.


2. Nhóm API Thêm / Sửa / Xóa (POST, PUT, DELETE)
Req 5: Thêm mới sản phẩm (POST)

URL: http://localhost:3000/api/sanpham

Body (JSON):

JSON

{
    "Ma": "SP99",
    "Ten": "Chuột Gaming Test",
    "DonGia": 550000,
    "MaDanhMuc": 1
}


Req 6: Cập nhật sản phẩm (PUT)

URL: http://localhost:3000/api/sanpham/SP99

Body (JSON):

JSON

{
    "Ten": "Chuột Gaming Test (Đã sửa)",
    "DonGia": 600000,
    "MaDanhMuc": 2
}


Req 7: Xóa sản phẩm (DELETE)

URL: http://localhost:3000/api/sanpham/SP99"# guitam" 




BÀI 2

1. Nhóm API Lấy dữ liệu (GET)
Req 1: Lấy danh sách tất cả nhân viên

URL: http://localhost:3000/api/nhanvien

Req 2: Lấy chi tiết nhân viên (Ví dụ mã NV01)

URL: http://localhost:3000/api/nhanvien/NV01

Req 6: Lấy danh sách phòng ban

URL: http://localhost:3000/api/phongban

Req 7: Lấy danh sách nhân viên thuộc phòng ban (Ví dụ phòng PB01)

URL: http://localhost:3000/api/phongban/PB01/nhanvien

Req 8: Lấy danh sách công trình

URL: http://localhost:3000/api/congtrinh

Req 10: Thống kê tổng ngày công của một nhân viên (Ví dụ NV01)

URL: http://localhost:3000/api/thongke/nhanvien/NV01/ngaycong

Nhóm API Thêm / Sửa / Xóa / Phân Công (POST, PUT, DELETE)
Req 3: Thêm mới nhân viên (POST)

URL: http://localhost:3000/api/nhanvien

Body (JSON):
{
    "MANV": "NV99",
    "HOTEN": "Nhân Viên Test",
    "NGAYSINH": "2000-01-01",
    "PHAI": "Nam",
    "DIACHI": "Hà Nội",
    "MAPB": "PB01"
}
Req 4: Cập nhật thông tin nhân viên (PUT)

URL: http://localhost:3000/api/nhanvien/NV99

Body (JSON):

JSON

{
    "HOTEN": "Nhân Viên Test (Đã sửa)",
    "DIACHI": "Hưng Yên",
    "PHAI": "Nữ"
}
Req 5: Xóa nhân viên (DELETE)

URL: http://localhost:3000/api/nhanvien/NV99

(Lưu ý: Nếu nhân viên này đã được phân công công trình, hệ thống sẽ xóa cả dữ liệu chấm công của họ trước khi xóa nhân viên).

Req 9: Phân công nhân viên vào công trình (POST)

URL: http://localhost:3000/api/cong

Body (JSON):

JSON

{
    "MACT": "CT01",
    "MANV": "NV01",
    "SLNGAYCONG": 5
}