// rbac.middleware.js
export const checkPermission = (allowedRoles) => {
  return (req, res, next) => {
    // Lấy role từ thông tin user đã đăng nhập (req.user được gán từ auth middleware)
    const userRole = req.user ? req.user.role : null;

    if (!userRole) {
      return res.status(403).json({ message: "Không tìm thấy quyền người dùng (No Role)" });
    }

    // Nếu quyền của user nằm trong danh sách cho phép -> OK
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: "Bạn không có quyền thực hiện chức năng này" });
    }
  };
};