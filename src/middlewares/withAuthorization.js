export default async function withAuthorization(handler, ...roles) {
  return (req, res) => {
    //kiểm tra quyền admin
    if (!roles.includes(req.body.role))
      return res.status(403).json({
        message: 'Bạn không có quyền hành động ',
        code: 403,
      });
    return handler(req, res);
  };
}
