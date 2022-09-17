import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import Cart from 'src/models/Cart';
import Order from 'src/models/Order';
import PaymentCard from 'src/models/PaymentCard';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleCreateOrder(req, res) {
  await dbConnect();
  const { method } = req;
  const { orders, cartIds } = req.body;

  try {
    switch (method) {
      case 'POST':
        const products = await Promise.all(
          orders.map((item) => Product.findById(item.product).lean()),
        );
        const getProperty = (index, property) => {
          return orders[index][property];
        };
        const firstItemProperty = (property) => orders[0][property];

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

        if (firstItemProperty('paymentMethod') === 'newCard') {
          const existedCard = await PaymentCard.findOne({
            number: firstItemProperty('newCard').number,
            userId: firstItemProperty('user'),
          }).lean();

          if (existedCard) {
            await Promise.all(
              cartIds
                .map((item) => Cart.findByIdAndUpdate(item, { status: 'ordered' }))
                .concat([
                  Order.insertMany(
                    orders.map((order) => ({ ...order, cardInfo: existedCard._id })),
                  ),
                ]),
            );
            return res.status(200).json({
              message: 'order thành công',
              code: 200,
            });
          }
          const newCardId = mongoose.Types.ObjectId();
          await Promise.all(
            cartIds
              .map((item) => Cart.findByIdAndUpdate(item, { status: 'ordered' }))
              .concat([
                PaymentCard.create({
                  _id: newCardId,
                  userId: firstItemProperty('user'),
                  ...firstItemProperty('newCard'),
                }),
                Order.insertMany(orders.map((order) => ({ ...order, cardInfo: newCardId }))),
              ]),
          );
          return res.status(200).json({
            message: 'order thành công',
            code: 200,
          });
        }
        await Promise.all(
          cartIds
            .map((item) => Cart.findByIdAndUpdate(item, { status: 'ordered' }))
            .concat([Order.insertMany(orders)]),
        );
        return res.status(200).json({
          message: 'order thành công',
          code: 200,
        });

      default:
        return res.status(404).json({
          message: 'Yêu cầu không hợp lệ',
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
}

export default handleCreateOrder;
