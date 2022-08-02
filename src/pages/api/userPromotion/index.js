import UserPromotion from 'src/models/UserPromotion';
import dbConnect from 'src/utils/dbConnect';

export default async function userPromotion() {
  await dbConnect();
  const { email } = req.body;
  if (req.method == 'POST') {
    const userPromotionExist = await UserPromotion.findOne({ email });
    if (!userPromotionExist) {
      const newUser = new UserPromotion({ email });
      await newUser.save();
      return res.status(201).json({
        message: 'Tạo mới email thành công!',
        code: 201,
      });
    }
  }
}
