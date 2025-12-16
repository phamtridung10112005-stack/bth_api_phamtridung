BƯỚC 2: CHẠY THỬ CÁC ROUTE
Dưới đây là cách setup Postman cho 5 route bạn gửi:

1. Route: Lấy danh sách (Ai cũng được xem)
Code: router.get("/sinhvien", checkPermission(["Admin", "User"]), ...)

Mục đích: Test xem Admin và User có lấy được danh sách không.

Method: GET

URL: http://localhost:3000/api/sinhvien

Auth: Chọn Bearer Token.

Thử với Token_User: Bấm Send -> Kết quả 200 OK (Ra danh sách).

Thử với Token_Admin: Bấm Send -> Kết quả 200 OK (Ra danh sách).

Thử không có Token: Bấm Send -> Lỗi 401.

2. Route: Xem chi tiết (Ai cũng được xem)
Code: router.get("/sinhvien/:masv", checkPermission(["Admin", "User"]), ...)

Method: GET

URL: http://localhost:3000/api/sinhvien/SV001 (Thay SV001 bằng mã có thật trong DB).

Auth: Bearer Token (User hoặc Admin đều được).

Kết quả: Trả về thông tin của 1 sinh viên đó.

3. Route: Thêm mới (Ai cũng được thêm)
Code: router.post("/sinhvien", checkPermission(["Admin", "User"]), ...)

Method: POST

URL: http://localhost:3000/api/sinhvien

Auth: Bearer Token (User hoặc Admin đều được).

Body (JSON):

JSON

{
    "masv": "SV_MOI_01",
    "hoten": "Nguyen Van Test"
}
Kết quả: 201 Created (Thêm thành công).

4. Route: Sửa (QUAN TRỌNG - CHỈ ADMIN)
Code: router.put("/sinhvien/:masv", checkPermission(["Admin"]), ...)

Đây là chỗ để test xem code phân quyền của bạn có chặn được User không.

Method: PUT

URL: http://localhost:3000/api/sinhvien/SV_MOI_01

Body (JSON):

JSON

{ "hoten": "Ten Da Duoc Sua" }
TEST 1: Dùng Token_User (Mong đợi thất bại)

Dán Token của User vào Auth.

Bấm Send.

Kết quả: 403 Forbidden (Message: "Bạn không có quyền...").

=> ĐÚNG LOGIC.

TEST 2: Dùng Token_Admin (Mong đợi thành công)

Dán Token của Admin vào Auth.

Bấm Send.

Kết quả: 200 OK (Message: "Sửa thành công").

5. Route: Xóa (CHỈ ADMIN)
Code: router.delete("/sinhvien/:masv", checkPermission(["Admin"]), ...)

Method: DELETE

URL: http://localhost:3000/api/sinhvien/SV_MOI_01

TEST 1: Dùng Token_User -> 403 Forbidden (Bị chặn).

TEST 2: Dùng Token_Admin -> 200 OK (Xóa thành công).