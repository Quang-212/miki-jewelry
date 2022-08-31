import { Schema, model, models } from 'mongoose';

const Cart = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  },
);
export default models.Cart || model('Cart', Cart);
