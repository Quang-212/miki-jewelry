import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import usePusherServer from 'src/hooks/usePusherServer';
import Cart from 'src/models/Cart';
import Notification from 'src/models/Notification';
import Order from 'src/models/Order';
import PaymentCard from 'src/models/PaymentCard';
import Product from 'src/models/Product';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function handleCreateOrder(req, res) {
  await dbConnect();
  const { method } = req;
  const { order, cartIds } = req.body;

  try {
    switch (method) {
      case 'POST':
        const [adminList, ...products] = await Promise.all([
          User.find({ role: 'admin' }).lean(),
          ...order.products.map((item) => Product.findById(item.product).lean()),
        ]);

        const getProperty = (index, property) => {
          return order.products[index][property];
        };

        const outOfStockProducts = products.filter(({ stocks }, index) => {
          return (
            stocks.find((stock) => stock.size == getProperty(index, 'size')).quantity <
            getProperty(index, 'quantity')
          );
        });

        if (!isEmpty(outOfStockProducts)) {
          return res.status(405).json({
            message: `Sản phẩm ${outOfStockProducts
              .map((product) => product.name)
              .join('-')} không đủ số lượng`,
            code: 405,
          });
        }
        const pusherServer = usePusherServer();

        const commonMutation = () => {
          return [
            Notification.insertMany(
              adminList.map((admin) => ({
                sender: order.user,
                to: admin._id,
                type: 'order',
                content: 'Khách hàng mới đặt đơn',
              })),
            ),
            ...cartIds.map((item) => Cart.findByIdAndUpdate(item, { status: 'ordered' })),
          ];
        };

        const sendNotice = (events) => pusherServer.triggerBatch(events);
        'admin', 'order', { message: 'Khách hàng mới đặt đơn' };
        if (order.paymentMethod === 'newCard') {
          const existedCard = await PaymentCard.findOne({
            number: order.newCard.number,
            userId: order.user,
          }).lean();

          if (existedCard) {
            const [notifications] = await Promise.all([
              ...commonMutation(),
              Order.create({
                ...order,
                cardInfo: existedCard._id,
              }),
            ]);

            await sendNotice(
              notifications.map((item) => ({
                channel: 'admin',
                name: 'order',
                data: item._doc,
              })),
            );
            return res.status(200).json({
              message: 'Order thành công',
              code: 200,
            });
          }

          const newCardId = mongoose.Types.ObjectId();

          const [notifications] = await Promise.all([
            ...commonMutation(),
            PaymentCard.create({
              _id: newCardId,
              userId: order.user,
              ...order.newCard,
            }),
            Order.create({
              ...order,
              cardInfo: newCardId,
            }),
          ]);

          await sendNotice(
            notifications.map((item) => ({
              channel: 'admin',
              name: 'order',
              data: item._doc,
            })),
          );
          return res.status(200).json({
            message: 'order thành công',
            code: 200,
          });
        }
        const [notifications] = await Promise.all([...commonMutation(), Order.create(order)]);

        await sendNotice(
          notifications.map((item) => ({
            channel: 'admin',
            name: 'order',
            data: item._doc,
          })),
        );
        return res.status(200).json({
          message: 'order thành công',
          code: 200,
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
}

export default handleCreateOrder;
