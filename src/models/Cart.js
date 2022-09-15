import { Schema, model, models } from 'mongoose';

const Cart = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    size: { type: String, required: true },
    status: {
      type: String,
      enum: ['added', 'ordered', 'deleted'],
      default: 'added',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default models.Cart || model('Cart', Cart);
