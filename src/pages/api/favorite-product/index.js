import FavoriteProduct from 'src/models/FavoriteProduct';
import dbConnect from 'src/utils/dbConnect';

async function favoriteProductHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId, productId } = req.body;

  try {
    switch (method) {
      case 'POST':
        const existFav = await FavoriteProduct.findOne({ userId, productId }).lean();
        if (existFav) {
          const newData = await FavoriteProduct.findByIdAndUpdate(
            existFav,
            {
              status: existFav.status === 0 ? 1 : 0,
            },
            { new: true },
          ).lean();
          return res.status(200).json({
            message: ` Cập nhật sản phẩm yêu thích(status-${newData.status} )`,
            code: 200,
          });
        }
        await FavoriteProduct.create({
          userId,
          productId,
        });
        return res.status(200).json({
          message: 'Đã thêm sản phẩm yêu thích(status-1)',
          code: 200,
        });
      default:
        return res.status(404).json({
          message: 'Yêu cầu không hợp lệ',
          code: 404,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default favoriteProductHandler;
