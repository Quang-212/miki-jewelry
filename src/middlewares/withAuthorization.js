export default async function withAuthorization(handler) {
  return (req, res) => {
    if (req.user.admin == false)
      return res.status(405).json({
        message: 'You are not authorized to perform this action',
        code: 405,
      });
    return handler(req, res);
  };
}
