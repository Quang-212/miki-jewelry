import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handlerSearch(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const search = await Product.aggregate([
          { $match: { $text: { $search: 'A Dây chuyền Vàng trắng con cua' } } },
          { $project: { name: 1, 'stocks.price': 1, 'images.src': 1, slug: 1 } },
          { $sort: { score: { $meta: 'textScore' } } },
        ]);
        return res.status(200).json({
          message: 'Thành công ',
          code: 200,
          search,
        });
      default:
        return res.status(404).json({
          message: 'Không tìm thấy yêu cầu hợp lệ',
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

export default handlerSearch;
