import { Schema, model, models } from 'mongoose';

const PaymentCard = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    provider: { type: String, required: true },
    number: { type: Number, required: true },
    expireTime: { type: Date, required: true },
    cvv: { type: Number },
  },
  {
    timestamps: true,
  },
);
export default models.PaymentCard || model('PaymentCard', PaymentCard);
