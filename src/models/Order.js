import { Schema, model, models } from 'mongoose';

const Order = new Schema(
  {
    _id: false,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    city: { type: String },
    district: { type: String },
    wards: { type: String },
    streets: { type: String },
    phone: { type: Number },
    payment: {
      method: { type: String, enum: ['cash', 'card'] },
      number: { type: Number },
      provider: { type: String },
      expireTime: { type: Date },
      cvv: { type: Number },
    },
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
export default models.Order || model('Order', Order);
