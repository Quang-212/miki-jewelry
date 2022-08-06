import { Schema, models, model } from 'mongoose';

const Product = new Schema({
  name: { type: String, required: true, unique: true },
  priceOld: Number,
  priceNew: Number,
  coupon: Number,
  visibilityStatus: String,
  size: Array,
  category: {
    type: String,
    enum: ['bracelet', 'earring', 'necklace', 'ring'],
    required: true,
  },
  tag: String,
  publishDate: String,
  publishTime: String,
  sku: String,
  stockQuantity: String,
  url: Array,
  description: String,
  pageTitle: String,
  metaDescription: String,
});

export default models.Product || model('Product', Product);
