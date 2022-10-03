import { Schema, models, model } from 'mongoose';

const RefreshToken = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    list: { type: Array, required: true },
    isExpired: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

export default models.RefreshToken || model('RefreshToken', RefreshToken);
