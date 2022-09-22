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
  const { order, cartIds } = req.body;

  try {
    switch (method) {
      case 'POST':
        const products = await Promise.all(
          order.products.map((item) => Product.findById(item.product).lean()),
        );
        const getProperty = (index, property) => {
          return order.products[index][property];
        };
        const getPropertyMongoProduct = (index, searchKey, compareValue, property) => {
          return products[index].stocks.find((stock) => stock[searchKey] === compareValue)[
            property
          ];
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

        if (order.paymentMethod === 'newCard') {
          const existedCard = await PaymentCard.findOne({
            number: order.newCard.number,
            userId: order.user,
          }).lean();

          if (existedCard) {
            await Promise.all(
              cartIds
                .map((item) => Cart.findByIdAndUpdate(item, { status: 'ordered' }))
                .concat([
                  Order.create({
                    ...order,
                    cardInfo: existedCard._id,
                  }),
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
                  userId: order.user,
                  ...order.newCard,
                }),
                Order.create({
                  ...order,
                  cardInfo: newCardId,
                }),
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
            .concat([Order.create(order)]),
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
