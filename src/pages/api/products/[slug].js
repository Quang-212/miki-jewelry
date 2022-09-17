import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';
import FavoriteProduct from 'src/models/FavoriteProduct';

const getOneProductHandler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { slug, userId = null } = req.query;
  try {
    switch (method) {
      case 'GET':
        const [product, likedCount] = await Promise.all([
          Product.findOne({ slug }).lean(),
          FavoriteProduct.find({ productId, status: 1 }).countDocuments(),
        ]);
        const favorite = userId
          ? (await FavoriteProduct.findOne({ productId: product._id, userId }))?.status || 0
          : 0;
        return res.status(200).json({
          message: 'Tìm kiếm thành công sản phẩm',
          code: 200,
          product: {
            ...product,
            favorite,
            likedCount,
          },
        });
      default:
        return res.status(404).json({
          message: 'Không tìm thấy yêu cầu hợp lệ',
          code: 404,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

export default getOneProductHandler;
