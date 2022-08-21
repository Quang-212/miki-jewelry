import UserPromotion from 'src/models/UserPromotion';
import dbConnect from 'src/utils/dbConnect';

async function userPromotion(req, res) {
  await dbConnect();
  try {
    const { method } = req;
    const { email } = req.body;
    switch (method) {
      case 'POST':
        const userEmailExist = await UserPromotion.findOne({ email });
        if (!userEmailExist) {
          await UserPromotion.create({ email });
          return res.status(201).json({
            message: 'Tạo mới email thành công!',
            code: 201,
          });
        }
      default:
        throw new Error('Phương thức không hợp lệ');
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default userPromotion;
