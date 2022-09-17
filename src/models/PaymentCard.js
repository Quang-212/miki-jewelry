import { Schema, model, models } from 'mongoose';

const PaymentCard = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    provider: { type: String, required: true, default: 'visa' },
    number: { type: String, required: true },
    expireTime: { type: Date, required: true },
    cvv: { type: String },
  },
  {
    timestamps: true,
  },
);
export default models.PaymentCard || model('PaymentCard', PaymentCard);
