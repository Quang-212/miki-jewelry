import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function handlerDelete(req, res) {
  await dbConnect();
  const { method } = req;
  if (method == 'POST') {
    console.log(req.query.id);
    const test = await User.findOneAndDelete(req.query.id);

    return res.status(200).json({
      message: 'Bạn đã xóa thành công',
      code: 200,
      test,
    });
  }
}

export default verifyToken(withAuthorization(handlerDelete));
