import { Schema, model, models } from 'mongoose';

const Order = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1, required: true },
    size: { type: String, required: true },
    status: {
      type: String,
      enum: ['confirm', 'delivery', 'completed', 'canceled'],
      required: true,
      default: 'confirm',
    },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card'], required: true },
    paymentCard: { type: Schema.Types.ObjectId, ref: 'PaymentCard' },
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export default models.Order || model('Order', Order);
