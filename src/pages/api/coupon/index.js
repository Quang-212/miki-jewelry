import Coupon from 'src/models/Coupon';
import dbConnect from 'src/utils/dbConnect';

async function handleGetUserCart(req, res) {
  await dbConnect();
  const { method } = req;

  let {
    limit = 10,
    page = 0,
    sortBy = 'createdAt',
    order = -1,
    search = '',
    discountCategory,
    type,
    status,
  } = qs.parse(req.query);

  const generateSort = (sortBy, order) => {
    return { [sortBy]: order };
  };

  try {
    switch (method) {
      case 'GET':
        const coupons = await Coupon.find({
          ...(discountCategory && { discountCategory }),
          ...(type && { type }),
          ...(status && { status }),
          ...(search && { search: new RegExp(search) }),
        })
          .sort(generateSort(sortBy, order))
          .limit(+limit)
          .skip(page * +limit)
          .exec();
        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: coupons,
        });
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handleGetUserCart;
