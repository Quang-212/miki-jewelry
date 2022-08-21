import { Schema, models, model } from 'mongoose';

const RefreshToken = new Schema(
  {
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

export default models.RefreshToken || model('RefreshToken', RefreshToken);
