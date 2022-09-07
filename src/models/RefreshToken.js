import { Schema, models, model } from 'mongoose';

const RefreshToken = new Schema(
  {
    refreshToken: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export default models.RefreshToken || model('RefreshToken', RefreshToken);
