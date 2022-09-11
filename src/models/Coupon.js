import { Schema, model, models } from 'mongoose';

const Coupon = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  },
);
export default models.Coupon || model('Coupon', Coupon);
