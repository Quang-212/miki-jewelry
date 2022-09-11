import { Schema, models, model } from 'mongoose';

const RefreshToken = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default models.RefreshToken || model('RefreshToken', RefreshToken);
