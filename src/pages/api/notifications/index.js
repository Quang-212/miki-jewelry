import Notification from 'src/models/Notification';
import dbConnect from 'src/utils/dbConnect';
import qs from 'qs';

async function getProductList(req, res) {
  await dbConnect();
  const { method } = req;
  const { limit = 4, page = 0, userId } = qs.parse(req.query);
  try {
    switch (method) {
      case 'GET':
        const [notificationList, total, unRead] = await Promise.all([
          Notification.find({ owner: userId, deleted: false })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(+page * limit)
            .exec(),
          Notification.find({ owner: userId, deleted: false }).countDocuments(),
          Notification.find({ owner: userId, deleted: false, read: false }).countDocuments(),
        ]);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
            notifications: notificationList,
            total,
            unRead,
            page: +page,
            pageSize: +limit,
            pageCount: Math.ceil(total / limit),
          },
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
export default getProductList;
