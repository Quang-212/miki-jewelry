import { Schema, model, models } from 'mongoose';

const UserPromotion = new Schema(
  {
    email: { type: String },
  },
  {
    timestamps: true,
  },
);

export default models.UserPromotion || model('UserPromotion', UserPromotion);
