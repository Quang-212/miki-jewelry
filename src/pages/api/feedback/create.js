import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';

const ratingProduct = async (req, res) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'POST':
      await Feedback.create(req.body);
      return res.status(201).json({
        message: 'Đánh giá sản phẩm thành công',
        code: 201,
      });

    default:
      return res.status(400).json({
        message: 'Không thành công',
        code: 400,
      });
  }
};

export default ratingProduct;
