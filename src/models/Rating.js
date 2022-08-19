import { model, models, Schema } from 'mongoose';

const RatingProduct = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: { type: Number, default: 5 },
    comment: { type: String },
  },
  {
    timestamps: true,
  },
);

export default models.Rating || model('Rating', RatingProduct);
