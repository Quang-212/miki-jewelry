import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';

const ratingProduct = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { user_id, product_id, count, comment } = req.body;

  switch (method) {
    case 'POST':
      const feedbacks = await Feedback.find({ product_id, user_id });

      // kiểm tra xem người dùng đã đánh giá chưa?
      if (!feedbacks) {
        await Feedback.create({
          user_id: user_id,
          product_id: product_id,
          count: count,
          comment: comment,
        });

        return res.status(201).json({
          message: 'Tạo thành công đánh giá ',
          code: 201,
        });
      }
      return res.status(200).json({
        message: 'Bạn đã đánh giá cho sản phẩm',
        code: 200,
      });
    default:
      return res.status(400).json({
        message: 'Không thành công',
        code: 400,
      });
  }
};

export default ratingProduct;
