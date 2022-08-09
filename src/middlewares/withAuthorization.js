export default function withAuthorization(handler) {
  return (req, res) => {
    if (req.user.admin == false)
      return res.status(405).json({
        message: 'Bạn không có quyền hành động ! Vui lòng liên hệ admin!',
        code: 405,
      });
    return handler(req, res);
  };
}
