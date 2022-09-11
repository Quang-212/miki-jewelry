import { Schema, model, models } from 'mongoose';

const Order = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['confirm', 'delivery', 'completed'],
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
  },
);
export default models.Order || model('Order', Order);
