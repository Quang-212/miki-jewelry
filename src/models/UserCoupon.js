import { Schema, model, models } from 'mongoose';

const UserCoupon = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true },
    status: {
      type: String,
      enum: ['active', 'in-active', 'future-plan'],
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export default models.UserCoupon || model('UserCoupon', UserCoupon);
