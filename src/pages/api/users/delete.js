import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function handlerDelete(req, res) {
  await dbConnect();
  try {
    const { method } = req;
    switch (method) {
      case 'POST':
        await User.findOneAndDelete(req.query.id);
        return res.status(200).json({
          message: 'Bạn đã xóa thành công',
          code: 200,
        });
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default verifyToken(withAuthorization(handlerDelete));
