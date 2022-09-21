import { Schema, model, models } from 'mongoose';

const Order = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    total: { type: Number, required: true },
    search: { type: String, required: true },
    status: {
      type: String,
      enum: ['confirm', 'delivery', 'completed', 'canceled'],
      required: true,
      default: 'confirm',
    },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    detailAddress: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ['cash', 'savedCard', 'newCard'], required: true },
    cardInfo: { type: Schema.Types.ObjectId, ref: 'PaymentCard' },
    isPaid: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export default models.Order || model('Order', Order);
