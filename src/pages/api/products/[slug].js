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
        const product = await Product.findOne({ slug }).lean();
        const favorite = userId
          ? (await FavoriteProduct.findOne({ productId: product._id, userId }))?.status || 0
          : 0;
        return res.status(200).json({
          message: 'Tìm kiếm thành công sản phẩm',
          code: 200,
          data: {
            ...product,
            favorite,
            likedCount: await FavoriteProduct.find({
              productId: product._id,
              status: 1,
            }).countDocuments(),
          },
        });

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
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
