import usePusherServer from 'src/hooks/usePusherServer';
import Feedback from 'src/models/Feedback';
import Notification from 'src/models/Notification';
import Product from 'src/models/Product';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

const ratingProduct = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { user, orderId, productId } = req.body;
  console.log(orderId, productId);
  switch (method) {
    case 'POST':
      const existedFeedback = await Feedback.findOne({ orderId, productId });
      console.log(existedFeedback);

      if (existedFeedback) {
        return res.status(405).json({
          message: 'Bạn đã đánh giá sản phẩm này rồi',
          code: 405,
        });
      }

      const [adminList, currentUser, currentProduct] = await Promise.all([
        User.find({ role: 'admin' }).lean(),
        User.findOne({}).lean(),
        Product.findById(productId).lean(),
      ]);

      const notifications = await Notification.insertMany(
        adminList.map((admin) => ({
          sender: user,
          owner: admin._id,
          type: 'feedback',
          content: `Khách hàng ${currentUser.userName} vừa mới đánh giá sản phẩm ${currentProduct.name}`,
        })),
      );

      const pusherServer = usePusherServer();
      const sendNotice = (events) => pusherServer.triggerBatch(events);

      await Promise.all([
        Feedback.create(req.body),
        sendNotice(
          notifications.map((item) => ({
            channel: 'admin',
            name: 'feedback',
            data: item._doc,
          })),
        ),
      ]);

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
