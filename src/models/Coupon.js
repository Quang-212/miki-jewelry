import { Schema, model, models } from 'mongoose';

const Coupon = new Schema(
  {
    code: { type: String, required: true },
    type: { type: String, enum: ['free-shipping', 'fixed-amount', 'percentage'], required: true },
    search: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'in-active'],
      required: true,
      default: 'active',
    },
    discount: { type: Number, required: true },
    rest: { type: Number, required: true },
    targetUser: { type: Array, required: true }, // {key: 'gender', value: "male", compare: "equal"}
    //{key: 'birthday', value: "date", compare: "lte"}
    discountCategory: {
      type: String,
      enum: ['bracelet', 'earring', 'necklace', 'ring'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export default models.Coupon || model('Coupon', Coupon);
