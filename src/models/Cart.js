import { Schema, model, models } from 'mongoose';

const Cart = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        size: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);
export default models.Cart || model('Cart', Cart);
