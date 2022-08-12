import Rating from 'src/models/Rating';
import dbConnect from 'src/utils/dbConnect';

const ratingProduct = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { user_id, product_id, count, comment } = req.body;
  switch (method) {
    case 'POST':
      const newRating = new Rating({
        user_id: user_id,
        product_id: product_id,
        count: count,
        comment: comment,
      });
      await newRating.save();
      return res.status(201).json({
        message: 'Tạo thành công rating',
        code: 201,
      });
  }
};

export default ratingProduct;
