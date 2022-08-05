import { Schema, models, model } from 'mongoose';

const Product = new Schema({
  name: { type: String, require: true, unique: true },
  priceNew: { type: Number, require: true },
  coupon: { type: Number, require: true },
  size: {
    type: Array,
    enum: {
      values: ['S', 'XS', 'M', 'L', 'XL'],
      message: 'Size không hợp lệ',
    },
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: Array,
    require: true,
  },
  description: { type: String },
  sku: { type: String },
  stockQuantity: {
    type: Number,
  },
});

export default models.Product || model('Product', Product);
