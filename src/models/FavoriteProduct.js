import { Schema, model, models } from 'mongoose';

const FavoriteProduct = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    status: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  },
);
export default models.FavoriteProduct || model('FavoriteProduct', FavoriteProduct);
