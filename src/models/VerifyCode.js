import { Schema, model, models } from 'mongoose';

const VerifyCode = new Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, expires: 30, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default models.VerifyCode || model('VerifyCode', VerifyCode);
