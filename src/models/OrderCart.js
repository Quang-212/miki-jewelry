import { Schema, model, models } from 'mongoose';

const OrderCart = new Schema(
  {
    _id: { type: Schema.Types.ObjectId() },
    product: { type: Schema.Types.ObjectId(), ref: 'Product', required: true },
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
